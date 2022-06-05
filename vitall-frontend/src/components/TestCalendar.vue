<template>
	<!-- {{ selectedEvent.name }} gives out
											{{ selectedEvent.details }} in
											{{ selectedEvent.location }} -->
	<v-app>
		<h1>Calendar View</h1>
		<div>
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
					<v-sheet height="95vh">
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
							<v-card color="grey lighten-4" min-width="300px" flat>
								<v-toolbar dark>
									<v-toolbar-title
										>Organisation:
										{{ selectedEvent.organiser }}</v-toolbar-title
									>
								</v-toolbar>

								<v-card-text style="font-size:25px">
									<v-text-field
										v-model="selectedEvent.details"
										label="Types of food"
										readonly
										prepend-icon="mdi-food"
									></v-text-field>
									<v-text-field
										v-model="selectedEvent.location"
										label="Location"
										readonly
										prepend-icon="mdi-food"
									></v-text-field>
								</v-card-text>
								<v-card-actions>
									<v-btn
										text
										color="secondary"
										v-on:click="selectedOpen = false"
									>
										Cancel
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-menu>
					</v-sheet>
				</v-col>
			</v-row>
		</div>
	</v-app>
</template>

<script>
import { axiosBase } from "../api/axios-base";
export default {
	data: () => ({
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
	}),
	mounted() {
		this.$refs.calendar.checkChange();
	},
	created() {
		axiosBase
			.get("/api/events/")
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
		convertTime(date) {
			let userTimezoneOffset = date.getTimezoneOffset() * 60000;
			return new Date(date.getTime() - userTimezoneOffset);
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
		showEvent({ nativeEvent, event }) {
			const open = () => {
				this.selectedEvent = event;
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

		updateRange() {
			const events = [];
			console.log(this.APIevents);

			for (let i = 0; i < this.APIevents.length; i++) {
				let APIevent = this.APIevents[i];
				events.push({
					name: `Giving ${APIevent.food} in ${APIevent.location}`,
					organiser: APIevent.organiser_name,
					start: this.convertTime(new Date(APIevent.start)),
					end: this.convertTime(new Date(APIevent.end)),
					location: APIevent.location,
					long: APIevent.long,
					lat: APIevent.lat,
					details: APIevent.food,
					// color: this.colors[this.rnd(0, this.colors.length - 1)],
					color: "indigo",
					timed: true,
				});
			}
			this.events = events;
		},
		// rnd(a, b) {
		// 	return Math.floor((b - a + 1) * Math.random()) + a;
		// },
	},
};
</script>
<style lang="scss" scoped></style>
