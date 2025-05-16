"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { TextboxWithError } from "@/components/molecules/textboxWithError";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { validationMessages } from "@/lib/messages";
import { isObjectEmpty } from "@/lib/utils2";

const loginFormValuesSchema = z.object({
  email: z.string().email(validationMessages.email),
  password: z.string().min(8, validationMessages.minLength(8)),
});

type LoginFormValues = z.infer<typeof loginFormValuesSchema>;

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormValuesSchema),
    defaultValues,
  });

  const onSubmit = (data: LoginFormValues) => {
    toast.error(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md p-4">
      <div className="grid items-center">
        <div className="grid gap-4 rounded border p-4">
          <div className="grid gap-2">
            <Label htmlFor="email">メールアドレス</Label>
            <TextboxWithError name="email" control={control} type="email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">パスワード</Label>
            <TextboxWithError
              name="password"
              control={control}
              type="password"
            />
          </div>
          <div>
            <Button className="w-full" disabled={!isObjectEmpty(errors)}>
              ログイン
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
