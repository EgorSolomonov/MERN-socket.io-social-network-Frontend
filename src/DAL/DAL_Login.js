import axios from "axios";

export function loginUser(userValues) {
  return axios.post(
    `https://mern-socket-socialnetwork.herokuapp.com/api/auth/login`,
    userValues
  );
}
