import { Token } from "@/types/Token";
import { User } from "@/types/User";

export type GetUserParams = {
  token: Token;
};

export type GetUserResponse = {
  user: User;
};

export const GetUserErrorCodes = [
  "GET_USER_UNAUTHORIZED",
  "GET_USER_EXPIRED",
  "GET_USER_NOT_FOUND",
] as const;

export type GetUserErrorCode = (typeof GetUserErrorCodes)[number];
