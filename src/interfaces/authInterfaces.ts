import Cookies from "universal-cookie";

export interface registerProps {
    email: string;
    username: string;
    birthday: string;
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

  export interface Login {
    email: string;
    password: string;
  }
  