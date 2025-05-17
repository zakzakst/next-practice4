import useSWRMutation from "swr/mutation";
import { PostLoginResponseMock } from "@/mocks/login";
import { ApiError, UnknownApiError, defaultHeaders, host } from "..";
import {
  PostLoginErrorCode,
  PostLoginErrorCodes,
  PostLoginRequest,
  PostLoginResponse,
} from "./type";

const postLoginFetcher = async (
  url: string,
  { arg }: { arg: PostLoginRequest },
): Promise<PostLoginResponse> => {
  // 開発中のみ利用：Nextjsのapiが使えない場合、固定の値を返す
  if (process.env.NEXT_PUBLIC_FEATURE_ABLE_MOCK === "false")
    return PostLoginResponseMock;

  const res = await fetch(url, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    const error = await res.json();
    if (PostLoginErrorCodes.includes(error.code)) {
      throw new ApiError<PostLoginErrorCode>(error);
    }
    throw new UnknownApiError();
  }
  const data = await res.json();
  return data;
};

export const usePostLogin = () => {
  const { trigger, error, isMutating } = useSWRMutation(
    host("/login"),
    postLoginFetcher,
  );
  return {
    trigger,
    error,
    isMutating,
  };
};
