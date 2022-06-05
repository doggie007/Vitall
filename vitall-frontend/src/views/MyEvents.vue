<template>
	<div>
		<own-calendar />
	</div>
</template>
<script>
import OwnCalendar from "../components/OwnCalendar.vue";

export default {
	name: "myevents",
	components: {
		OwnCalendar,
	},
	onIdle() {
		// dispatch logoutUser if no activity detected
		this.$store.dispatch("logoutUser").then(() => {
			this.$router.push({ name: "login" });
		});
	},
};
</script>
