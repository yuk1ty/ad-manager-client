import axios from "axios";

export const useAxios = (session: string | null = null) => {
  let headers;
  if (session !== null) {
    headers = {
      "Content-Type": "application/json",
      "X-Adm-Session": session,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }

  return axios.create({
    baseURL: "http://localhost:8080",
    headers: headers,
  });
};
