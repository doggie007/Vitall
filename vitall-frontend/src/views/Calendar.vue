<template>
	<div>
		<test-calendar />
	</div>
</template>
<script>
import TestCalendar from "../components/TestCalendar.vue";

export default {
	name: "calendar",
	components: {
		TestCalendar,
	},
	onIdle() {
		// dispatch logoutUser if no activity detected
		this.$store.dispatch("logoutUser").then(() => {
			this.$router.push({ name: "login" });
		});
	},
};
</script>
