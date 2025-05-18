"use client";

import { useRouter } from "next/navigation";
import { getRouterPushPath } from "@/lib/utils2";
import { useUserAction } from "@/providers/user/hook";
import { useToken } from "./useToken";

export const useLogout = () => {
  const router = useRouter();
  const { clearTokenCookie } = useToken();
  const { clearUserState } = useUserAction();

  const logout = () => {
    clearTokenCookie();
    clearUserState();
    router.push(getRouterPushPath("/login/"));
  };

  return logout;
};
