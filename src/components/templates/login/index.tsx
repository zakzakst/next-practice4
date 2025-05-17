"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiError } from "@/app/api";
import { usePostLogin } from "@/app/api/login/swr";
import { LoginForm, LoginFormValues } from "@/components/organisms/loginForm";

export const Login = () => {
  const router = useRouter();
  const { trigger, isMutating } = usePostLogin();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await trigger(data);
      // TODO: user providerにユーザー情報設定
      console.log(res);
      router.push(res.redirectUrl);
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message);
      }
    }
  };

  return <LoginForm onSubmit={onSubmit} isBusy={isMutating} />;
};
