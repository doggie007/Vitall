import axios from "axios";
// import store from "../store";
const APIUrl = "https://vitall-backend.herokuapp.com/";

const axiosBase = axios.create({
	baseURL: APIUrl,
	headers: { contentType: "application/json" },
});

export { axiosBase };
