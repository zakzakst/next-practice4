"use client";

import { PostForm } from "@/components/organisms/postForm";
import { useUserState } from "@/providers/user/hook";

export const MyPostCreate = () => {
  const user = useUserState();

  return <>{user && <PostForm />}</>;
};
