<template>
	<div>
		<v-app>
			<h1>My Events View</h1>
			<div>
				<v-alert
					v-if="createdFormIncorrect"
					color="red"
					dense
					prominent
					permanent
					type="error"
					>Invalid form input!</v-alert
				>
				<v-alert
					v-if="createdFormSuccess"
					color="green"
					permanent
					type="success"
					>Event successfully created!</v-alert
				>
				<v-row class="fill-height">
					<v-col>
						<v-sheet height="64">
							<v-toolbar flat>
								<v-btn
									outlined
									class="mr-4"
									color="grey darken-2"
									@click="setToday"
								>
									Today
								</v-btn>
								<v-btn fab text small color="grey darken-2" @click="prev">
									<v-icon small>
										mdi-chevron-left
									</v-icon>
								</v-btn>
								<v-btn fab text small color="grey darken-2" @click="next">
									<v-icon small>
										mdi-chevron-right
									</v-icon>
								</v-btn>
								<v-toolbar-title v-if="$refs.calendar">
									{{ $refs.calendar.title }}
								</v-toolbar-title>

								<v-spacer></v-spacer>
								<!-- Plus button -->
								<v-menu
									offset-y
									:close-on-content-click="false"
									v-model="showForm"
								>
									<template v-slot:activator="{ on }">
										<v-btn v-on="on" color="blue" class="ma-4">
											<v-icon>
												mdi-plus
											</v-icon>
										</v-btn>
									</template>
									<v-card min-width="600px">
										<v-card-text>
											<v-row>
												<v-col>
													<v-text-field
														label="Types of food"
														required
														:rules="[rules.required]"
														prepend-icon="mdi-food"
														v-model="chosenFood"
														clearable
													></v-text-field>
													<v-text-field
														label="Location"
														required
														:rules="[rules.required]"
														prepend-icon="mdi-map-marker"
														v-model="chosenLocation"
														clearable
													></v-text-field>
												</v-col>
												<v-col>
													<label>Start Time</label>
													<vc-date-picker
														v-model="chosenStartTime"
														mode="dateTime"
														color="green"
														:timezone="timezone"
													/>
												</v-col>
												<v-col>
													<label>End Time</label>
													<vc-date-picker
														v-model="chosenEndTime"
														mode="dateTime"
														color="orange"
														:timezone="timezone"
													/>
												</v-col>
											</v-row>
										</v-card-text>

										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn
												color="grey darken-2"
												@click="showForm = false"
												dark
												class="ma-4"
												>CANCEL</v-btn
											>
											<v-btn color="primary" @click="createEvent"
												>Create Event</v-btn
											>
										</v-card-actions>
									</v-card>
								</v-menu>

								<v-menu bottom right>
									<template v-slot:activator="{ on, attrs }">
										<v-btn
											outlined
											color="grey darken-2"
											v-bind="attrs"
											v-on="on"
										>
											<span>{{ typeToLabel[type] }}</span>
											<v-icon right>
												mdi-menu-down
											</v-icon>
										</v-btn>
									</template>
									<v-list>
										<v-list-item @click="type = 'day'">
											<v-list-item-title>Day</v-list-item-title>
										</v-list-item>
										<v-list-item @click="type = 'week'">
											<v-list-item-title>Week</v-list-item-title>
										</v-list-item>
										<v-list-item @click="type = 'month'">
											<v-list-item-title>Month</v-list-item-title>
										</v-list-item>
										<v-list-item @click="type = '4day'">
											<v-list-item-title>4 days</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
							</v-toolbar>
						</v-sheet>
						<v-sheet height="100vh">
							<v-calendar
								v-if="!isFetching"
								class="myCustom"
								ref="calendar"
								v-model="focus"
								color="primary"
								:events="events"
								:event-color="getEventColor"
								:type="type"
								:event-more="true"
								@click:event="showEvent"
								@click:date="viewDay"
								@click:more="viewDay"
								@change="updateRange"
							></v-calendar>
							<v-menu
								v-model="selectedOpen"
								:close-on-content-click="false"
								:activator="selectedElement"
								offset-x
							>
								<v-card color="grey lighten-4" min-width="700px" flat>
									<v-toolbar dark>
										<v-toolbar-title
											>{{ selectedEvent.organiser }}
										</v-toolbar-title>
										<v-spacer></v-spacer>
									</v-toolbar>

									<v-row>
										<v-col class="ml-3 mt-3">
											<v-text-field
												label="Types of food"
												required
												:rules="[rules.required]"
												prepend-icon="mdi-food"
												v-model="selectedEventForm.details"
											></v-text-field>
											<v-text-field
												label="Location"
												required
												:rules="[rules.required]"
												prepend-icon="mdi-map-marker"
												v-model="selectedEventForm.location"
											></v-text-field>
										</v-col>
										<v-col class="mt-3">
											<label>Start Time</label>
											<vc-date-picker
												v-model="selectedEventForm.start"
												mode="dateTime"
												color="green"
												:timezone="timezone"
											/>
										</v-col>
										<v-col class="mt-3">
											<label>End Time</label>
											<vc-date-picker
												v-model="selectedEventForm.end"
												mode="dateTime"
												color="orange"
												:timezone="timezone"
											/>
										</v-col>
									</v-row>
									<v-card-actions>
										<v-btn text color="secondary" v-on:click="closeEvent()">
											Cancel
										</v-btn>
										<!-- <v-spacer></v-spacer> -->
										<v-btn
											large
											color="primary"
											class="mr-1"
											v-on:click="updateEvent()"
										>
											Update
										</v-btn>
										<v-btn
											large
											color="error"
											class="mr-4"
											v-on:click="deleteEvent()"
										>
											Delete
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-menu>
						</v-sheet>
					</v-col>
				</v-row>
			</div>
		</v-app>
	</div>
</template>

<script>
import { axiosBase } from "../api/axios-base";
export default {
	data: () => ({
		rules: {
			required: (value) => !!value || "This field is required.",
		},
		focus: "",
		type: "month",
		typeToLabel: {
			month: "Month",
			week: "Week",
			day: "Day",
			"4day": "4 Days",
		},
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false,
		events: [],
		APIevents: [],
		// isFetching means api is still getting the data
		isFetching: true,
		timezone: "",
		showForm: false,
		chosenFood: null,
		chosenLocation: null,
		chosenStartTime: new Date(),
		chosenEndTime: new Date(),
		createdFormIncorrect: false,
		createdFormSuccess: false,
		selectedEventForm: {},
	}),
	mounted() {
		this.$refs.calendar.checkChange();
	},
	created() {
		axiosBase
			.get("/api/my-events/", {
				headers: {
					Authorization: `JWT ${this.$store.state.accessToken}`,
				},
			}) // proof that your access token is still valid; if not the
			// axios getAPI response interceptor will attempt to get a new  access token from the server. check out ../api/axios-base.js getAPI instance response interceptor
			.then((response) => {
				console.log("GetAPI successfully got the events");

				console.log(response.data.events);

				this.APIevents = response.data.events;
				this.isFetching = false;
			})
			.catch((err) => {
				//unauthorised to access or some other error status
				console.log(err);
				this.$store.dispatch("logoutUser").then(() => {
					this.$router.push({ name: "login" });
				});
			});
	},
	methods: {
		scrollToTop() {
			window.scrollTo(0, 0);
		},
		viewDay({ date }) {
			this.focus = date;
			this.type = "day";
		},
		getEventColor(event) {
			return event.color;
		},
		setToday() {
			this.focus = "";
		},
		prev() {
			this.$refs.calendar.prev();
		},
		next() {
			this.$refs.calendar.next();
		},
		closeEvent() {
			this.selectedOpen = false;
			this.selectedEventForm = this.selectedEvent;
			// this.$router.go();
		},
		convertTime(date) {
			let userTimezoneOffset = date.getTimezoneOffset() * 60000;
			return new Date(date.getTime() - userTimezoneOffset);
		},
		showEvent({ nativeEvent, event }) {
			const open = () => {
				this.selectedEvent = event;
				// make a copy of selected event so form does not change it
				this.selectedEventForm = JSON.parse(JSON.stringify(this.selectedEvent));
				this.selectedElement = nativeEvent.target;
				requestAnimationFrame(() =>
					requestAnimationFrame(() => (this.selectedOpen = true))
				);
			};

			if (this.selectedOpen) {
				this.selectedOpen = false;
				requestAnimationFrame(() => requestAnimationFrame(() => open()));
			} else {
				open();
			}

			nativeEvent.stopPropagation();
		},
		createEvent() {
			// console.log(this.chosenStartTime);
			// console.log(this.chosenEndTime);

			axiosBase
				.post(
					"/api/create-event/",
					{
						food: this.chosenFood,
						location: this.chosenLocation,
						start: this.chosenStartTime,
						end: this.chosenEndTime,
						long: 10,
						lat: 10,
					},
					{
						headers: {
							Authorization: `JWT ${this.$store.state.accessToken}`,
						},
					}
				)
				.then(() => {
					console.log("Post request successfully added the event!");
					this.chosenFood = null;
					this.chosenLocation = null;
					this.chosenStartTime = new Date();
					this.chosenEndTime = new Date();
					this.showForm = false;
					this.createdFormSuccess = true;

					setTimeout(() => {
						this.createdFormSuccess = false;
						this.$router.go();
					}, 3000);
				})
				.catch((err) => {
					//unauthorised to access or some other error status
					console.log(err.response);
					this.createdFormIncorrect = true;
					setTimeout(() => {
						this.createdFormIncorrect = false;
					}, 3000);
				});
		},
		updateEvent() {
			this.selectedOpen = false;
			axiosBase
				.put(
					`/api/update-event/${this.selectedEventForm.id}`,
					{
						food: this.selectedEventForm.details,
						location: this.selectedEventForm.location,
						start: this.selectedEventForm.start,
						end: this.selectedEventForm.end,
						long: 10,
						lat: 10,
					},
					{
						headers: {
							Authorization: `JWT ${this.$store.state.accessToken}`,
						},
					}
				)
				.then(() => {
					console.log("Put request successfully added the event!");
					this.scrollToTop();
					this.createdFormSuccess = true;
					setTimeout(() => {
						this.createdFormSuccess = false;
						this.$router.go();
					}, 3000);
				})
				.catch((err) => {
					//unauthorised to access or some other error status
					console.log(err.response);
					this.scrollToTop();
					this.createdFormIncorrect = true;
					setTimeout(() => {
						this.createdFormIncorrect = false;
					}, 3000);
				});
		},
		deleteEvent() {
			this.selectedOpen = false;
			axiosBase
				.delete(`/api/update-event/${this.selectedEventForm.id}`, {
					headers: {
						Authorization: `JWT ${this.$store.state.accessToken}`,
					},
				})
				.then(() => {
					console.log("Put request successfully added the event!");
					this.$router.go();
				})
				.catch((err) => {
					//unauthorised to access or some other error status
					console.log(err.response);
				});
		},
		updateRange() {
			const events = [];
			console.log(this.APIevents);

			for (let i = 0; i < this.APIevents.length; i++) {
				let APIevent = this.APIevents[i];
				events.push({
					id: APIevent.id,
					name: `${APIevent.organiser_name} giving ${APIevent.food}`,
					organiser: APIevent.organiser_name,
					location: APIevent.location,
					long: APIevent.long,
					lat: APIevent.lat,
					start: this.convertTime(new Date(APIevent.start)),
					end: this.convertTime(new Date(APIevent.end)),
					details: APIevent.food,
					// color: this.colors[this.rnd(0, this.colors.length - 1)],
					color: "indigo",
					timed: true,
				});
			}
			// let s = "2021-07-28T07:47:58";
			// let e = "2021-07-28T08:22:27";
			// events.push({
			// 	name: "yeet",
			// 	start: new Date(s),
			// 	end: new Date(e),
			// 	details: "looking at details",
			// 	// color: this.colors[this.rnd(0, this.colors.length - 1)],
			// 	color: "indigo",
			// 	timed: true,
			// });
			this.events = events;
		},
		// rnd(a, b) {
		// 	return Math.floor((b - a + 1) * Math.random()) + a;
		// },
	},
};
</script>
<style lang="scss" scoped></style>
