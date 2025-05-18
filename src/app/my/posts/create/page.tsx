import type { Metadata } from "next";
import { MyPostCreate } from "@/components/templates/myPostCreate";

export const metadata: Metadata = {
  title: "新規記事作成",
  description: "新規記事作成ページの概要",
};

const Page = () => {
  return <MyPostCreate />;
};

export default Page;
