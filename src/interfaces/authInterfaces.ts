import Cookies from "universal-cookie";

export interface registerProps {
    email: string;
    username: string;
    birthday: Date;
    password: string;
    repeatpassword: string;
  }

  export interface UserCookies {
    cookies: Cookies;
    userId?: string;
    userName?: string;
    email?: string;
    jwToken: string;
    jwtExpires: string;
    sessionDuration: string;
  }