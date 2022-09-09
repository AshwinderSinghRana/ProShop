import axios from "axios";

export const httpGet = axios.create({
  baseURL: "http://localhost:1221",
});
export const httpPost = axios.create({
  baseURL: "http://localhost:1221",
  headers: {
    "Content-Type": "application/json",
  },
});
