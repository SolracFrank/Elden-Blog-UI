import { IRefreshSession, IValidateSession, loginProps, registerProps } from "../interfaces/authInterfaces.ts";
import api from "./axiosService.ts";

export const loginService = async (loginData: loginProps) => {
  const response = await api.post("/v1/Auth/signin", loginData);
  return response;
};

export const registerService = async (registerData: registerProps) =>
{
  registerData.ipAddress = '';
  const response = await api.post("/v1/Auth/register",registerData);
  
  return response;
}

export const refreshSessionService = async (refreshSessionData : IRefreshSession) =>
{
  console.log('sending refresh token'); //101 LOG FOR DEVELOP, DELETE THIS

  const response = await api.post("/v1/Auth/refresh-token",refreshSessionData);
  
  console.log('response from refreshing token ', response ); //101 LOG FOR DEVELOP, DELETE THIS

  return response;
};


export const valitadeSessionService = async (validateSessionData : IValidateSession) =>
{
  const response = await api.post("/v1/Auth/validate-session",validateSessionData);
  
  return response;
};