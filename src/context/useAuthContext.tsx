import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    toast.error(
      "Unknown Error, plesae contact support."
    );
    throw new Error("useAuth should be used in a provider");
  }
  return context;
};
