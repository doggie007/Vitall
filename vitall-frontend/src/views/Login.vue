<template>
	<v-app>
		<h1>Login Page</h1>
		<v-card min-width="1000px" class="customClass">
			<v-form ref="form" v-model="valid">
				<v-alert v-if="incorrectCreds" dense text color="red" type="error"
					>Invalid email or password</v-alert
				>

				<v-text-field
					v-model="email"
					:rules="emailRules"
					label="Email"
					required
				></v-text-field>

				<v-text-field
					v-model="password"
					:rules="passwordRules"
					label="Password"
					type="password"
					required
				></v-text-field>

				<v-btn
					:disabled="!valid"
					color="success"
					class="mr-4"
					@click="loginUser"
				>
					Login
				</v-btn>
			</v-form>
		</v-card>
	</v-app>
</template>

<script>
export default {
	name: "login",
	data: () => ({
		email: "",
		errors: "hello",
		emailRules: [
			(v) => !!v || "Email is required",
			(v) => /.+@.+\..+/.test(v) || "Email must be valid",
		],
		password: "",
		passwordRules: [(v) => !!v || "Password is required"],
		valid: true,
		incorrectCreds: false,
	}),

	methods: {
		validate() {
			if (this.$refs.form.validate()) {
				this.loginUser();
			}
		},
		loginUser() {
			// call loginUser action
			this.$store
				.dispatch("loginUser", {
					email: this.email,
					password: this.password,
				})
				.then(() => {
					this.incorrectCreds = false;
					this.$router.push({ name: "calendar" });
					this.$router.go();
				})
				.catch((err) => {
					this.incorrectCreds = true;
					console.log(err);
				});
		},
	},
};
</script>

<style scoped>
.customClass {
	margin: auto;
	margin-top: 50px;
	font-size: 4rem;
}
</style>
