import { ApiErrorBody } from "@/app/api";
import { PostLoginErrorCode, PostLoginResponse } from "@/app/api/login/type";

const getRedirectUrl = (deployGitHub: boolean) => {
  // ssgでbuildした時にrouter.pushの挙動が上手くいかなかったため設定
  if (process.env.NODE_ENV === "production") {
    const domain = deployGitHub
      ? "https://zakzakst.github.io"
      : "http://localhost:3000";
    return `${domain}${process.env.NEXT_PUBLIC_BASE_PATH}`;
  }
  return "/";
};

export const PostLoginResponseMock: PostLoginResponse = {
  user: {
    id: "1",
    name: "山田太郎",
    thumbnail: "https://picsum.photos/id/237/200/200",
  },
  redirectUrl: getRedirectUrl(true),
};

export const PostLoginErrorBody401Mock: ApiErrorBody<PostLoginErrorCode> = {
  code: "POST_LOGIN_UNAUTHORIZED",
  message: "ログイン権限がありません",
};

export const PostLoginErrorBody404Mock: ApiErrorBody<PostLoginErrorCode> = {
  code: "POST_LOGIN_NOT_FOUND",
  message: "該当するユーザーが見つかりませんでした",
};
