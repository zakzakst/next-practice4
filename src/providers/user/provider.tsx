"use client";

import { useEffect } from "react";
import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getRouterPushPath } from "@/lib/utils2";
import { UserActionContext, UserState, UserStateContext } from "./context";

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    if (pathname === "/login/") {
      // ログインページの場合
      if (state) {
        // ユーザー情報が設定されていれば、トップページへ遷移
        router.push(getRouterPushPath("/"));
      }
    } else {
      // ログイン以外のページの場合
      if (!state) {
        // ユーザー情報が設定されていなければ、ログインページへ遷移
        router.push(getRouterPushPath("/login/"));
      }
    }
  }, [state, router, pathname]);

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
