import { authHost, host } from "./index";
import jwt_decode from "jwt-decode";

export const registerUser = async (email, password) => {
  const { data } = await host.post("api/user/registration", {
    email,
    password,
    role: "USER",
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const loginUser = async (email, password) => {
  const { data } = await host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const checkUser = async () => {
  const { data } = await authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
