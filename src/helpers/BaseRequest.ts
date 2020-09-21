import React from "react";
import axios from "axios";

export default function BaseRequest(url: string, param?: FormData) {
  const baseURL = "http://51.91.110.239/api/";
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return axios
    .post(`${baseURL}${url}`, param, config)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
