import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { WatchCounter } from "./";

const TestComponent = ({ text = "" }: { text?: string }) => {
  const { register, control } = useForm({ defaultValues: { text } });
  const name = "text";
  return (
    <>
      <Input id="input" {...register(name)} />
      <WatchCounter max={10} name={name} control={control} />
    </>
  );
};

const user = userEvent.setup();

describe("WatchCounter", () => {
  test("文字入力に伴い、カウントアップされる", async () => {
    render(<TestComponent />);
    expect(screen.getByText("0 / 10")).toBeInTheDocument();
    await user.type(screen.getByRole("textbox"), "123");
    expect(screen.getByText("3 / 10")).toBeInTheDocument();
  });

  test("制限文字数を超えるとエラースタイルが設定される", async () => {
    render(<TestComponent />);
    await user.type(screen.getByRole("textbox"), "01234567890");
    expect(screen.getByText("11 / 10")).toHaveClass("text-destructive");
  });
});
