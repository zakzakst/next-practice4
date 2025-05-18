"use client";

import { useEffect } from "react";
import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useToken } from "@/hooks/useToken";
import { getRouterPushPath } from "@/lib/utils2";
import { UserActionContext, UserState, UserStateContext } from "./context";

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<UserState | null>(null);
  const { setUserByTokenCookie } = useToken();

  useEffect(() => {
    (async () => {
      if (state) {
        // ユーザー情報が設定されている場合
        if (pathname === "/login/") {
          // ログインページの場合、トップページへ遷移
          router.push(getRouterPushPath("/"));
        }
      } else {
        if (pathname !== "/login/") {
          const user = await setUserByTokenCookie();
          if (user) {
            setState(user);
          } else {
            router.push(getRouterPushPath("/login/"));
          }
        }
      }
    })();
  }, [state, router, pathname, setUserByTokenCookie]);

  const setUserState = useCallback((state?: UserState) => {
    if (!state) return;
    setState(state);
  }, []);

  const clearUserState = useCallback(() => {
    setState(null);
  }, []);

  return (
    <UserStateContext.Provider value={state}>
      <UserActionContext.Provider value={{ setUserState, clearUserState }}>
        {children}
      </UserActionContext.Provider>
    </UserStateContext.Provider>
  );
};
