import axios from "axios";

const API = "https://dictionary-nl.big-nose.ru";

export const $api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
