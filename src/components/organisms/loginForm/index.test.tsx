import { act, logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from ".";

const setup = () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();
  render(<LoginForm onSubmit={onSubmit} />);
  const emailInputEl = screen.getByRole("textbox", { name: "メールアドレス" });
  // jestだとinput type="password"にroleがないため、test idで対応
  const passwordInputEl = screen.getByTestId("password");
  const submitButtonEl = screen.getByRole("button", { name: "ログイン" });

  return {
    user,
    onSubmit,
    emailInputEl,
    passwordInputEl,
    submitButtonEl,
  };
};

describe("LoginForm", () => {
  test("Role確認用（input type=password がリストアップされない）", () => {
    const onSubmit = jest.fn();
    const { container } = render(<LoginForm onSubmit={onSubmit} />);
    logRoles(container);
  });

  test("フォームに入力した内容が送信データに反映される", async () => {
    const ValidEmail = "sample@mail.com";
    const ValidPassword = "password";
    const { user, onSubmit, emailInputEl, passwordInputEl, submitButtonEl } =
      setup();
    await user.type(emailInputEl, ValidEmail);
    await user.type(passwordInputEl, ValidPassword);
    await user.click(submitButtonEl);
    // TODO: react hook formを利用しているとそのまま引数の検証できない
    expect(onSubmit).toHaveBeenCalledWith({
      email: ValidEmail,
      password: ValidPassword,
    });
  });

  test("正しい内容が入力されていない状態で送信を実行すると、送信は実行されず、バリデーションエラーが出る", async () => {
    const { user, onSubmit, emailInputEl, passwordInputEl, submitButtonEl } =
      setup();
    await user.click(submitButtonEl);
    await act(() => {
      expect(emailInputEl).toHaveAccessibleErrorMessage();
      expect(passwordInputEl).toHaveAccessibleErrorMessage();
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
