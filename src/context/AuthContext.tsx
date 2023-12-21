import { createContext, useCallback, useMemo, useState } from "react";
import {
  AuthenticationContext,
  AuthenticationContextType,
  IAuthProvider,
} from "../interfaces/contextInterfaces";
import { removeUserCookies, setUserCookies } from "../utils/authCookieSetter";
import Cookies from "universal-cookie";

export const AuthContext = createContext<AuthenticationContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const cookies = useMemo(() => new Cookies(), []);
  // const [isRefreshing, setIsRefreshing] = useState(false);

  const isUserAuthenticated = useCallback(
    () => !!cookies.get("JWToken"),
    [cookies]
  );

  const [isAuthenticated, setIsAuthenticated] = useState(isUserAuthenticated());

  const [userName, setUserName] = useState<string | null>(
    cookies.get("userName")
  );
  const [applicationUserId, setApplicationUserId] = useState<string | null>(
    cookies.get("userId")
  );

  const login = ({
    userId,
    userName,
    email,
    jwToken,
    jwtExpires,
    sessionDuration,
  }: AuthenticationContext) => {
    setUserCookies({
      cookies,
      jwtExpires,
      userId,
      userName,
      email,
      jwToken,
      sessionDuration,
    });
    setIsAuthenticated(true);
    setUserName(userName || null);
    setApplicationUserId(userId || null);
  };

  const logout = useCallback(() => {
    removeUserCookies(cookies);
    setIsAuthenticated(false);
    setUserName(null);
    setApplicationUserId(null);
  }, [cookies]);


  const contextValue = {
    isAuthenticated,
    login,
    logout,
    userName,
    applicationUserId,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
