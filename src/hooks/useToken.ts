"use client";

import Cookies from "js-cookie";
import { useGetUser } from "@/app/api/user/swr";
import { TOKEN_COOKIE_KEY } from "@/app/constants/cookies";
import { useUserAction } from "@/providers/user/hook";
import { Token } from "@/types/Token";
import { User } from "@/types/User";

const COOKIE_EXPIRE_DAYS = 7;

export const useToken = () => {
  const { setUserState } = useUserAction();
  const { trigger } = useGetUser();

  // tokenをcookieに設定する
  const setTokenCookie = (token: Token) => {
    Cookies.set(TOKEN_COOKIE_KEY, token, { expires: COOKIE_EXPIRE_DAYS });
  };

  // tokenからユーザー情報を取得して、設定する
  const setUserByTokenCookie = async (): Promise<User | null> => {
    const token = Cookies.get(TOKEN_COOKIE_KEY);
    if (!token) return null;
    try {
      const res = await trigger({ token });
      setUserState(res.user);
      return res.user;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  // cookieをクリアする
  const clearTokenCookie = () => {
    Cookies.remove(TOKEN_COOKIE_KEY);
  };

  return {
    setTokenCookie,
    setUserByTokenCookie,
    clearTokenCookie,
  };
};
