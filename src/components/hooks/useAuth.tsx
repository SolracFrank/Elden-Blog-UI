import { useCallback } from "react";
import { IRefreshSession, IValidateSession, loginProps, registerProps } from "../../interfaces/authInterfaces";
import { loginService, refreshSessionService, registerService, valitadeSessionService } from "../../services/authService";

export const UseRegister = () => {
  const registerUser = useCallback(async (data: registerProps) => {
    const response = await registerService(data);
    return response;
  }, []);
  return { registerUser };
};

export const UseLogin = () => {
  const loginUser = useCallback(async (data: loginProps) => {
    const response = await loginService(data);
    return response;
  }, []);

  return { loginUser };
};

export const UseRefreshSession = () =>
{
  const refreshUser = useCallback(async (data:IRefreshSession) =>
  {
    const response = await refreshSessionService(data);
    return response;
  }, [])

  return {refreshUser};
}

export const useValidateSession = () => {
  const validateSession = useCallback(async (data: IValidateSession) => {
    try {
      const response = await valitadeSessionService(data);
      return response.data; 
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  return { validateSession };
};
