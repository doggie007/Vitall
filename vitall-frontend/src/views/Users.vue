<template>
	<div class="downloads">
		<!-- <NavBar></NavBar> -->
		<div class="bod">
			<h1>Welcome to Users Hub</h1>
			<h2>Users: ( 1 for user, 2 for food bank )</h2>
			<h2 v-for="user in usersList" :key="user.id">
				{{ user.email }} {{ user.role }}
			</h2>
			<h2></h2>
		</div>
	</div>
</template>

<script>
import { axiosBase } from "../api/axios-base";
export default {
	name: "users",
	data: () => ({
		usersList: null,
	}),
	onIdle() {
		// dispatch logoutUser if no activity detected
		this.$store.dispatch("logoutUser").then(() => {
			this.$router.push({ name: "login" });
		});
	},
	created() {
		axiosBase
			.get("/api/users/", {
				headers: { Authorization: `JWT ${this.$store.state.accessToken}` },
			}) // proof that your access token is still valid
			.then((response) => {
				console.log("GetAPI successfully got the users");
				console.log(response);
				this.usersList = response.data.users;
			})
			.catch((err) => {
				//unauthorised to access or some other error status
				console.log(err);
				this.$router.push({ name: "home" });
			});
	},
};
</script>
