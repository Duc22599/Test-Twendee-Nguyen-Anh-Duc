import axios from "axios";

export const instance = axios.create({
  baseURL: "https://randomuser.me/api/",
  timeout: 10000,
});
