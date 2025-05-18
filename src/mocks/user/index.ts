import { ApiErrorBody } from "@/app/api";
import { GetUserErrorCode, GetUserResponse } from "@/app/api/user/type";

export const GetUserResponseMock: GetUserResponse = {
  user: {
    id: "1",
    name: "山田太郎",
    thumbnail: "https://picsum.photos/id/237/200/200",
  },
};

export const GetUserErrorBody401Mock: ApiErrorBody<GetUserErrorCode> = {
  code: "GET_USER_UNAUTHORIZED",
  message: "ユーザー情報の取得権限がありません",
};

export const GetUserErrorBody401Mock2: ApiErrorBody<GetUserErrorCode> = {
  code: "GET_USER_EXPIRED",
  message: "トークンの有効期限が切れています",
};

export const GetUserErrorBody404Mock: ApiErrorBody<GetUserErrorCode> = {
  code: "GET_USER_NOT_FOUND",
  message: "該当するユーザーが見つかりませんでした",
};
