import axios from "axios";

export function registrateUser(userValues) {
  return axios.post(
    `https://mern-socket-socialnetwork.herokuapp.com/api/auth/registration`,
    userValues
  );
}
