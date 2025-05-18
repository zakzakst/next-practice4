import { useId } from "react";
import { useController } from "react-hook-form";
import type { Control, RegisterOptions } from "react-hook-form";

type Props = {
  label: string;
  max: number;
  name: string;
  // eslint-disable-next-line
  control: Control<any>;
  rules?: RegisterOptions;
};

export const TextboxWithCounter = () => {};
