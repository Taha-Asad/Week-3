import axios from "axios";
// Will be used in authSlice.js inside Thunk fnction

const loginUser = async (userData) => {
  const axiosRes = axios
    .post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData, {
      withCredentials: true, // Send cookies to the cookies tab in console when true
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      window.localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return axiosRes;
};

const authService = { loginUser };
export default authService;
