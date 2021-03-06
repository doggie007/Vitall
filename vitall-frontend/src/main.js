import Vue from "vue";
import VCalendar from "v-calendar";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import IdleVue from "idle-vue";
import Vuetify from "vuetify/lib";
import vuetify from "./plugins/vuetify";

const eventsHub = new Vue();

Vue.use(IdleVue, {
	eventEmitter: eventsHub,
	idleTime: 720000,
}); // sets up the idle time,i.e. time left to logout the user on no activity
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
	// if any of the routes in ./router.js has a meta named 'requiresAuth: true'
	// then check if the user is logged in before routing to this path:
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!store.getters.loggedIn) {
			next({ name: "login" });
		} else {
			next();
		}
	} else if (to.matched.some((record) => record.meta.requiresLogged)) {
		// if any of the routes in ./router.js has a meta named 'requiresLogged: true'
		// then check if the user is logged in; if true continue to home page else continue routing to the destination path
		// for when user is logged in and tries to access the login/register page
		if (store.getters.loggedIn) {
			next({ name: "calendar" });
		} else {
			next();
		}
	} else {
		next();
	}
});

Vue.use(Vuetify);
Vue.use(VCalendar, {
	componentPrefix: "vc",
});

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
