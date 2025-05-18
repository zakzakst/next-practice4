"use client";

import { toast } from "sonner";
import { ApiError } from "@/app/api";
import { usePostLogin } from "@/app/api/login/swr";
import { LoginForm, LoginFormValues } from "@/components/organisms/loginForm";
import { useToken } from "@/hooks/useToken";
import { useUserAction, useUserState } from "@/providers/user/hook";

export const Login = () => {
  const user = useUserState();
  const { setUserState } = useUserAction();
  const { trigger, isMutating } = usePostLogin();
  const { setTokenCookie } = useToken();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await trigger(data);
      setTokenCookie(res.token);
      setUserState(res.user);
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message);
      }
    }
  };

  // ユーザー情報が設定されている場合、フォームを表示しない（user providerのリダイレクト処理が完了するまでのチラつき対策）
  if (user) return null;

  return <LoginForm onSubmit={onSubmit} isBusy={isMutating} />;
};
