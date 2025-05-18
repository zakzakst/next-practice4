"use client";

import { useMemo } from "react";
import clsx from "clsx";
import { Control, useWatch } from "react-hook-form";

type Props = {
  max: number;
  name: string;
  // eslint-disable-next-line
  control: Control<any>;
  className?: string;
};

export const WatchCounter = ({ max, name, control, className }: Props) => {
  const value = useWatch({ name, control });
  const length = useMemo(() => value?.length || 0, [value]);
  const isInvalid = useMemo(() => length > max, [length, max]);
  return (
    <span className={clsx({ "text-destructive": isInvalid }, className)}>
      {length} / {max}
    </span>
  );
};
