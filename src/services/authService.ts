import { loginProps, registerProps } from "../interfaces/authInterfaces.ts";
import api from "./axiosService.ts";

export const loginService = async (loginData: loginProps) => {
  const response = await api.post("/v1/Auth/signin", loginData);
  return response;
};

export const registerService = async (registerData: registerProps) =>
{
  registerData.ipAddress = '';
  const response = await api.post("/v1/Auth/register",registerData);
  console.log(response);
  
  return response;
}