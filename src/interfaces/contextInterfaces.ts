export interface AuthenticationContext {
    userId?: string;
    userName?: string;
    email?: string;
    jwToken: string;
    jwtExpires: string;
  }
export interface AuthenticationContextType {
    isAuthenticated: boolean;
    login: ({
      userId,
      userName,
      jwToken,
      jwtExpires,
      email,
    }: AuthenticationContext) => void;
    logout: () => void;
    userName: string | null;
  }