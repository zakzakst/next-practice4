import { Token } from "@/types/Token";
import { User } from "@/types/User";

export type PostLoginRequest = {
  email: string;
  password: string;
};

export type PostLoginResponse = {
  user: User;
  redirectUrl: string;
  token: Token;
};

export const PostLoginErrorCodes = [
  "POST_LOGIN_UNAUTHORIZED",
  "POST_LOGIN_NOT_FOUND",
] as const;

export type PostLoginErrorCode = (typeof PostLoginErrorCodes)[number];
