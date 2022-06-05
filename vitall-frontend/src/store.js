import Vue from "vue";
import Vuex from "vuex";
import { axiosBase } from "./api/axios-base";

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		accessToken: localStorage.getItem("access_token") || null, // makes sure the user is logged in even after refreshing the page
		refreshToken: localStorage.getItem("refresh_token") || null,
		email: localStorage.getItem("user_email") || null,
		organisation: localStorage.getItem("user_organisation") || null,
	},
	getters: {
		loggedIn(state) {
			return state.accessToken != null;
		},
		getEmail(state) {
			console.log(state.email);
			return state.email;
		},
		getOrganisation(state) {
			console.log(state.organisation);
			return state.organisation;
		},
	},
	mutations: {
		updateLocalStorage(state, { access, refresh, email, organisation }) {
			localStorage.setItem("access_token", access);
			localStorage.setItem("refresh_token", refresh);
			localStorage.setItem("user_email", email);
			localStorage.setItem("user_organisation", organisation);
			state.accessToken = access;
			state.refreshToken = refresh;
			state.email = email;
			state.organisation = organisation;
		},
		updateAccess(state, access) {
			state.accessToken = access;
		},
		destroyToken(state) {
			state.accessToken = null;
			state.refreshToken = null;
			state.email = null;
			state.organisation = null;
		},
	},
	actions: {
		// run the below action to get a new access token on expiration
		refreshToken(context) {
			return new Promise((resolve, reject) => {
				axiosBase
					.post("/api/token/refresh/", {
						refresh: context.state.refreshToken,
					}) // send the stored refresh token to the backend API
					.then((response) => {
						// if API sends back new access and refresh token update the store
						console.log("New access successfully generated");
						context.commit("updateAccess", response.data.access);
						resolve(response.data.access);
					})
					.catch((err) => {
						console.log("error in refreshToken Task");
						reject(err); // error generating new access and refresh token because refresh token has expired
					});
			});
		},
		registerUser(context, data) {
			return new Promise((resolve, reject) => {
				axiosBase
					.post("/api/register/", {
						email: data.email,
						password: data.password,
						organisation: data.organisation,
					})
					.then((response) => {
						resolve(response);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		logoutUser(context) {
			if (context.getters.loggedIn) {
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				localStorage.removeItem("user_email");
				localStorage.removeItem("user_organisation");
				context.commit("destroyToken");
			}
		},
		loginUser(context, credentials) {
			return new Promise((resolve, reject) => {
				// send the email and password to the backend API:
				axiosBase
					.post("/api/login/", {
						email: credentials.email,
						password: credentials.password,
					})
					// if successful update local storage:
					.then((response) => {
						console.log(response.data.authenticatedUser);
						context.commit("updateLocalStorage", {
							access: response.data.access,
							refresh: response.data.refresh,
							email: response.data.authenticatedUser.email,
							organisation: response.data.authenticatedUser.organisation,
						}); // store the access and refresh token in localstorage and role of user for frontend prevention
						resolve(response);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
	},
});
