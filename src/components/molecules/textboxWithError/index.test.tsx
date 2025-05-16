import { zodResolver } from "@hookform/resolvers/zod";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { validationMessages } from "@/lib/messages";
import { TextboxWithError } from "./";

const user = userEvent.setup();

const TestComponent = () => {
  const { control, handleSubmit } = useForm<{ email: string }>({
    resolver: zodResolver(
      z.object({ email: z.string().email(validationMessages.email) }),
    ),
    defaultValues: { email: "" },
  });
  return (
    <form onSubmit={handleSubmit(() => {})}>
      {/* NOTE: type="email" が付いているとtypeで不正テキストが入力されないのでテストが通らなくなる */}
      {/* <TextboxWithError name="email" control={control} type="email" /> */}
      <TextboxWithError name="email" control={control} />
      <button type="submit">送信</button>
    </form>
  );
};

describe("TextboxWithError", () => {
  test("初期表示時にエラーメッセージが非表示", () => {
    render(<TestComponent />);
    expect(screen.getByRole("textbox")).toBeValid();
    expect(screen.getByRole("textbox")).not.toHaveAccessibleErrorMessage();
  });

  test("バリデーションが正しく挙動する", async () => {
    const InvalidText = "invalid email";
    const ValidText = "sample@mail.com";
    render(<TestComponent />);
    const inputEl = screen.getByRole("textbox");
    await user.type(inputEl, InvalidText);
    await act(() => {
      // 初期入力時は不正なテキストが入力されていてもエラーが出ない
      expect(screen.getByDisplayValue(InvalidText)).toBeInTheDocument();
      expect(inputEl).not.toBeInvalid();
      expect(inputEl).not.toHaveAccessibleErrorMessage(
        validationMessages.email,
      );
    });
    await user.click(screen.getByRole("button", { name: "送信" }));
    await act(() => {
      // Submitしたら不正なテキストが入力されている場合、エラーが出る
      expect(inputEl).toBeInvalid();
      expect(inputEl).toHaveAccessibleErrorMessage(validationMessages.email);
    });
    await user.clear(inputEl);
    await user.type(inputEl, ValidText);
    await act(() => {
      // 正しいテキストを入力しなおしたら、エラーが消える
      expect(inputEl).not.toBeInvalid();
      expect(inputEl).not.toHaveAccessibleErrorMessage(
        validationMessages.email,
      );
    });
  });
});
