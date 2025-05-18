"use client";

import Cookies from "js-cookie";
import { TOKEN_COOKIE_KEY } from "@/app/constants/cookies";
import { GetUserResponseMock } from "@/mocks/user";
import { useUserAction } from "@/providers/user/hook";
import { Token } from "@/types/Token";
import { User } from "@/types/User";

const COOKIE_EXPIRE_DAYS = 7;

export const useToken = () => {
  const { setUserState } = useUserAction();

  // tokenをcookieに設定する
  const setTokenCookie = (token: Token) => {
    Cookies.set(TOKEN_COOKIE_KEY, token, { expires: COOKIE_EXPIRE_DAYS });
  };

  // tokenからユーザー情報を取得して、設定する
  // const setUserByTokenCookie = async (): Promise<User | null> => {
  const setUserByTokenCookie = (): User | null => {
    const value = Cookies.get(TOKEN_COOKIE_KEY);
    if (!value) return null;
    setUserState(GetUserResponseMock.user);
    return GetUserResponseMock.user;
  };

  return {
    setTokenCookie,
    setUserByTokenCookie,
  };
};
