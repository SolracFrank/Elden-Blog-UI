export interface AuthenticationContext {
  userId?: string;
  userName?: string;
  email?: string;
  jwToken: string;
  jwtExpires: string;
  sessionDuration: string;
}
export interface AuthenticationContextType {
  isAuthenticated: boolean;
  login: ({
    userId,
    userName,
    email,
    jwToken,
    jwtExpires,
    sessionDuration,
  }: AuthenticationContext) => void;
  logout: () => void;
  userName: string | null;
}

export interface IAuthProvider {
  children: React.ReactNode;
}
