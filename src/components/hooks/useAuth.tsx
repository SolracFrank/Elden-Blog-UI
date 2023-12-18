import { useCallback } from "react";
import { registerProps } from "../../interfaces/authInterfaces";
import { registerService } from "../../services/authService";

export const UseRegister = () => {
  const registerUser = useCallback(async (data: registerProps) => {
    const response = await registerService(data);
    return response;
  }, []);
  return { registerUser };
};
