import { useCallback } from "react";
import { loginProps, registerProps } from "../../interfaces/authInterfaces";
import { loginService, registerService } from "../../services/authService";

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
