"use client";

import { PostForm, PostFormValues } from "@/components/organisms/postForm";
import { useUserState } from "@/providers/user/hook";

export const MyPostCreate = () => {
  const user = useUserState();

  const onSubmit = (data: PostFormValues) => {
    console.log(data);
  };

  return <>{user && <PostForm onSubmit={onSubmit} />}</>;
};
