<template>
	<v-app>
		<h1>Register Page</h1>
		<v-card min-width="1000px" class="customClass">
			<v-form ref="form" v-model="valid">
				<v-alert v-if="incorrectCreds" dense text color="red" type="error">{{
					incorrectCreds
				}}</v-alert>

				<v-text-field
					v-model="email"
					:rules="emailRules"
					label="Email"
					required
				></v-text-field>

				<v-text-field
					v-model="organiser"
					:rules="organiserRules"
					label="Organisation name"
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
					@click="registerUser"
				>
					Register
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
		emailRules: [
			(v) => !!v || "Email is required",
			(v) => /.+@.+\..+/.test(v) || "Email must be valid",
		],
		organiser: "",
		organiserRules: [(v) => !!v || "Organisation is required"],
		password: "",
		passwordRules: [(v) => !!v || "Password is required"],
		valid: true,
		incorrectCreds: null,
	}),

	methods: {
		validate() {
			if (this.$refs.form.validate()) {
				this.registerUser();
			}
		},
		registerUser() {
			// call loginUser action
			this.$store
				.dispatch("registerUser", {
					email: this.email,
					password: this.password,
					organisation: this.organiser,
				})
				.then(() => {
					this.$router.push({ name: "login" });
				})
				.catch((err) => {
					function capitalize(s) {
						return s.charAt(0).toUpperCase() + s.slice(1);
					}
					let errors = err.response.data;

					console.log(errors);
					if (typeof errors.email !== "undefined") {
						this.incorrectCreds = errors.email;
					} else if (typeof errors.organisation !== "undefined") {
						this.incorrectCreds = errors.organisation;
					} else if (typeof errors.password !== "undefined") {
						this.incorrectCreds = errors.password;
					}
					console.log(this.incorrectCreds);
					this.incorrectCreds = capitalize(this.incorrectCreds[0]);
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
