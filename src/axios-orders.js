import axios from "axios";

const instance = axios.create({
    baseURL: "https://burgerreact-bf432.firebaseio.com"
});

export default instance;