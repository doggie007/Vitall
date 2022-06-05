<template>
	<v-btn class="button" @click="logout()" color="error" dark large>
		Logout
	</v-btn>
</template>

<script>
export default {
	methods: {
		logout() {
			this.$store.dispatch("logoutUser").then(() => {
				this.$router.push({ name: "home" });
				this.$router.go();
			});
		},
	},
};
</script>

<style scoped>
.button {
	margin-left: 40%;
	margin-right: 40%;
	margin-top: 25%;
}
</style>
