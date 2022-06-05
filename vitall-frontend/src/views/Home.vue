<template>
	<v-app>
		<section id="first" class="center-section">
			<div class="container">
				<div class="left"></div>
				<div class="right">
					<div class="content">
						<h1 id="name">VITALL</h1>
						<p id="text">
							Bridging Soup Kitchens + Food Banks + Charities <br />
							to those who are in need
						</p>
						<div class="buttons">
							<button @click="$router.push('calendar')">
								Looking for help?
							</button>
							<button @click="$router.push('register')">
								Sign up as organisation
							</button>
							<button @click="$router.push('login')">
								Log In (for organisation)
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</v-app>
</template>
<script>
export default {
	name: "home",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&family=Zen+Tokyo+Zoo&display=swap");
#first {
	background: linear-gradient(rgba(8, 6, 32, 0.4), rgba(8, 6, 32, 0.4)),
		url("https://source.unsplash.com/nV7GJmSq3zc/1920x1280") center/cover
			no-repeat fixed;
}
.left {
	background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
		url("https://source.unsplash.com/lyiKExA4zQA/1200x1500") center/cover
			no-repeat;
}

.center-section {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	/* background: linear-gradient(rgba(8, 6, 32, 0), rgba(8, 6, 32, 0)),
		url(../images/silk-background.jpg) center/cover no-repeat fixed; */
}

.container {
	width: 80%;
	max-width: 1000px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
}

.left {
	width: 50%;
	height: 700px;
	/* background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
		url(../images/hand.jpg) center/cover no-repeat; */
}

.right {
	width: 85%;
	min-height: 500px;
	background-color: #0e2646;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 30px;
	border-radius: 10px;
	color: white;
	margin-left: -80px;
}

.right h1 {
	font-size: 60px;
	font-weight: bolder;
	font-family: "Zen Tokyo Zoo", cursive;
}

.right p {
	margin: 20px 0;
	font-weight: 500;
	line-height: 25px;
	font-size: larger;
	font-family: "Poppins", sans-serif;
}

button {
	background: transparent;
	border: 1px solid white;
	padding: 12px 15px;
	font-family: "Poppins", sans-serif;
	width: 300px;
	margin: 10px auto;
}

button:hover {
	border: 1px solid #36d8a2;
	background: #36d8a2;
	transition: 0.5s;
}
.buttons {
	display: flex;
	flex-direction: column;
}
</style>
