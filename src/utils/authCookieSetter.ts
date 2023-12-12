import { UserCookies } from "../interfaces/authInterfaces";
import Cookies from "universal-cookie";

export const setUserCookies = ({
  cookies,
  jwtExpires,
  userId,
  userName,
  email,
  jwToken,
  sessionDuration,
}: UserCookies) => {
  cookies.set("userId", userId, {});
  cookies.set("userName", userName, {});
  cookies.set("email", email, {});
  cookies.set("JWToken", jwToken, {
    expires: new Date(jwtExpires),
  });
  cookies.set("JWTokenExpires", jwtExpires, {
    expires: new Date(jwtExpires),
  });
  cookies.set("sessionDuration", sessionDuration, {
    expires: new Date(sessionDuration),
  });
};

export const removeUserCookies = (cookies: Cookies) => {
  cookies.remove("userId");
  cookies.remove("userName");
  cookies.remove("JWToken");
  cookies.remove("JWTokenExpires");
  cookies.remove("email");
  cookies.remove("sessionDuration");
};

export const getUserCookies = (cookies: Cookies) => {
  const userName = cookies.get("userName");
  const email = cookies.get("email");
  const userId = cookies.get("userId");
  const jwToken = cookies.get("JWToken");

  const jwtExpiresRaw = cookies.get("JWTokenExpires");
  const jwtExpiresDecoded = jwtExpiresRaw
    ? decodeURIComponent(jwtExpiresRaw)
    : "";

  const sessionDuration = cookies.get("sessionDuration");
  const sessionDurationDecoded = sessionDuration
    ? decodeURIComponent(jwtExpiresRaw)
    : "";

  return {
    userName,
    userId,
    email,
    jwToken,
    jwtExpires: jwtExpiresDecoded,
    sessionDuration : sessionDurationDecoded
  };
};
