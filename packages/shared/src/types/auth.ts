export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
}

export interface JwtPayload {
  userId: string;
  username: string;
  role: string;
}
