import axios from "axios";

const BASE_URL = "https://lms-project-tcdt.onrender.com/api/v1"
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.timeout = 100000;

export default axiosInstance;