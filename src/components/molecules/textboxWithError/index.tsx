"use client";

import { useId } from "react";
import { useController } from "react-hook-form";
import type { Control, RegisterOptions } from "react-hook-form";
import { Input } from "@/components/ui/input";

type OwnProps = {
  name: string;
  // eslint-disable-next-line
  control: Control<any>;
  rules?: RegisterOptions;
};

type Props = Omit<React.ComponentProps<"input">, keyof OwnProps> & OwnProps;

export const TextboxWithError = ({ name, control, rules, ...rest }: Props) => {
  const errorMessageId = useId();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div>
      <Input
        id={name}
        {...field}
        aria-invalid={!!error}
        aria-errormessage={errorMessageId}
        {...rest}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500" id={errorMessageId}>
          {error.message}
        </p>
      )}
    </div>
  );
};
