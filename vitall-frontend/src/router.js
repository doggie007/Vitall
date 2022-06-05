import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import login from "./views/Login";
import register from "./views/Register";
// import users from "./views/Users";
import logout from "./views/Logout";
import calendar from "./views/Calendar";
import myevents from "./views/MyEvents";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
			meta: {
				requiresLogged: true,
			},
		},
		{
			path: "/login",
			name: "login",
			component: login,
			meta: {
				requiresLogged: true,
			},
		},
		{
			path: "/register",
			name: "register",
			component: register,
			meta: {
				requiresLogged: true,
			},
		},
		// {
		// 	path: "/users",
		// 	name: "users",
		// 	component: users,
		// 	meta: {
		// 		requiresAuth: true,
		// 	},
		// },
		{
			path: "/logout",
			name: "logout",
			component: logout,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/calendar",
			name: "calendar",
			component: calendar,
			meta: {
				requiresAuth: false,
			},
		},
		{
			path: "/my-events",
			name: "myevents",
			component: myevents,
			meta: {
				requiresAuth: true,
			},
		},
	],
});
