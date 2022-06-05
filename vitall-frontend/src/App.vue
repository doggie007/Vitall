<template>
	<v-app>
		<v-navigation-drawer
			v-if="isLoggedIn()"
			v-model="drawer"
			:mini-variant.sync="mini"
			permanent
			app
		>
			<v-list-item class="px-3">
				<v-list-item-avatar>
					<v-img src="https://randomuser.me/api/portraits/men/1.jpg"></v-img>
				</v-list-item-avatar>

				<v-list-item-title>{{ user_organisation }}</v-list-item-title>

				<v-btn icon @click.stop="mini = !mini">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense>
				<v-list-item
					v-for="item in items"
					:key="item.title"
					link
					router-link
					:to="{ name: item.path }"
				>
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<div id="app" v-bind:style="isLoggedIn() ? 'margin-left: 60px;' : ''">
			<router-view></router-view>
		</div>
	</v-app>
</template>

<script scoped>
import store from "./store";
export default {
	data: () => ({
		user_email: store.getters.getEmail,
		user_organisation: store.getters.getOrganisation,
		drawer: true,
		items: [
			{ title: "Calendar", icon: "mdi-calendar", path: "calendar" },
			{ title: "My Events", icon: "mdi-calendar-edit", path: "myevents" },
			// { title: "Users", icon: "mdi-account-group-outline", path: "users" },
			{ title: "Logout", icon: "mdi-logout", path: "logout" },
		],
		mini: true,
	}),
	methods: {
		isLoggedIn() {
			return this.$store.getters.loggedIn == true;
		},
	},
};
</script>
<style>
#app {
	text-align: center;
	/* margin-left: 18px; */
}
</style>
