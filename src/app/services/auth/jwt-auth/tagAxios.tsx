import axios from "axios";

const tagAxios = axios.create({
  baseURL: "http://65.21.248.35:9080/api/", //YOUR_API_URL HERE
  headers: {
    "Content-Type": "application/json",
  },
});

tagAxios.interceptors.response.use(
  (res) => res,

  (err) => {
    console.log(err)
    if (err.response && err.response.status === 401) {
      window.location.href = "/signin";
    }
    return Promise.reject(err);
  }
);
export const setAuthTokenTag = (token: string | null) => {
  if (token) {
    tagAxios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    localStorage.setItem("token", token);
  } else {
    delete tagAxios.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
    localStorage.removeItem("accessRules");
  }
};

export default tagAxios;
