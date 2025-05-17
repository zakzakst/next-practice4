"use client";

import { toast } from "sonner";
import { ApiError } from "@/app/api";
import { usePostLogin } from "@/app/api/login/swr";
import { LoginForm, LoginFormValues } from "@/components/organisms/loginForm";
import { useUserAction } from "@/providers/user/hook";

export const Login = () => {
  const { setUserState } = useUserAction();
  const { trigger, isMutating } = usePostLogin();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await trigger(data);
      setUserState(res.user);
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message);
      }
    }
  };

  return <LoginForm onSubmit={onSubmit} isBusy={isMutating} />;
};
