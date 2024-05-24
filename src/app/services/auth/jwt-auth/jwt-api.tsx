import axios from "axios";

const jwtAxios = axios.create({
  baseURL: "http://65.21.248.35:9080/api/", //YOUR_API_URL HERE
  headers: {
    "Content-Type": "application/json",
  },
});


export const setAuthToken = (token: string | null) => {
  if (token) {
    jwtAxios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    localStorage.setItem("token", token);
  } else {
    delete jwtAxios.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
    localStorage.removeItem("accessRules");
  }
};

export default jwtAxios;
