import axios, { AxiosError } from "axios";
import { HttpError } from "./httpError";

interface ErrorDetail {
  detail: string;
  status: number;
  title: string;
  type: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Allow all origins
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  },
});

const errInterceptor = (error: AxiosError) => {
  if(error.response){
    const errorDetail = error.response.data as ErrorDetail;
    return Promise.reject(new HttpError(errorDetail.detail || "Erro na requisição", error.response.status));
  }
  console.error("Erro de rede:", error);

  return Promise.reject(new HttpError("Erro de rede", error.code ? parseInt(error.code) : 500));
};

api.interceptors.response.use(
  response => response,
  errInterceptor
);

const setApiToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export {api, setApiToken};