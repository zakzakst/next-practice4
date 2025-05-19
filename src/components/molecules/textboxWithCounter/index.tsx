import { useId } from "react";
import { useController } from "react-hook-form";
import type { Control, RegisterOptions } from "react-hook-form";
import { WatchCounter } from "@/components/atoms/watchCounter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type OwnProps = {
  label: string;
  max: number;
  name: string;
  // eslint-disable-next-line
  control: Control<any>;
  rules?: RegisterOptions;
};

type Props = Omit<React.ComponentProps<"input">, keyof OwnProps> & OwnProps;

export const TextboxWithCounter = ({
  label,
  max,
  name,
  control,
  rules,
  ...rest
}: Props) => {
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
      <div className="flex items-center justify-between">
        <Label htmlFor={name}>{label}</Label>
        <WatchCounter max={max} name={name} control={control} />
      </div>
      <Input
        className="mt-2"
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
