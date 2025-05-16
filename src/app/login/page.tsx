import type { Metadata } from "next";
import { Login } from "@/components/templates/login";

export const metadata: Metadata = {
  title: "ログイン",
  description: "ログインページの概要",
};

const Page = () => {
  return <Login />;
};

export default Page;
