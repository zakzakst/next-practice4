"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

export type LoginFormValues = z.infer<typeof loginFormValuesSchema>;

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

type Props = {
  isBusy?: boolean;
  onSubmit: (data: LoginFormValues) => void;
};

export const LoginForm = ({ isBusy, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormValuesSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md p-4">
      <div className="grid items-center">
        <div className="grid gap-4 rounded border p-4">
          <div className="grid gap-2">
            <Label htmlFor="email" id="email-label">
              メールアドレス
            </Label>
            <TextboxWithError
              name="email"
              control={control}
              type="email"
              aria-labelledby="email-label"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" id="password-label">
              パスワード
            </Label>
            <TextboxWithError
              name="password"
              control={control}
              type="password"
              aria-labelledby="password-label"
              data-testid="password"
            />
          </div>
          <div>
            <Button
              className="w-full"
              disabled={!isObjectEmpty(errors) || isBusy}
            >
              ログイン
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
