import clsx from "clsx";

type Props = React.ComponentProps<"footer">;

export const Footer = ({ className, ...rest }: Props) => {
  return (
    <footer className={clsx("px-4 py-2 bg-gray-100", className)} {...rest}>
      <p className="text-center">All rights reserved © XXXXX</p>
    </footer>
  );
};
