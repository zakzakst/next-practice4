// TODO: 上手くできないので後回し
import { render, screen } from "@testing-library/react";
import { UserState, UserStateContext } from "@/providers/user/context";
import { Header } from "./";

const TestComponent = ({ state }: { state: UserState | null }) => {
  return (
    <UserStateContext.Provider value={state}>
      <Header />
    </UserStateContext.Provider>
  );
};

describe("Header", () => {
  test("未ログイン状態の表示が正しい", () => {
    render(<TestComponent state={null} />);
    expect(screen.getByRole("link", { name: "ログイン" }));
  });
});
