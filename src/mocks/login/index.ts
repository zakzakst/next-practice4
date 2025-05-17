import { ApiErrorBody } from "@/app/api";
import { PostLoginErrorCode, PostLoginResponse } from "@/app/api/login/type";
import { getRouterPushPath } from "@/lib/utils2";

export const PostLoginResponseMock: PostLoginResponse = {
  user: {
    id: "1",
    name: "山田太郎",
    thumbnail: "https://picsum.photos/id/237/200/200",
  },
  redirectUrl: getRouterPushPath("/"),
};

export const PostLoginErrorBody401Mock: ApiErrorBody<PostLoginErrorCode> = {
  code: "POST_LOGIN_UNAUTHORIZED",
  message: "ログイン権限がありません",
};

export const PostLoginErrorBody404Mock: ApiErrorBody<PostLoginErrorCode> = {
  code: "POST_LOGIN_NOT_FOUND",
  message: "該当するユーザーが見つかりませんでした",
};
