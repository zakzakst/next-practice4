import useSWRMutation from "swr/mutation";
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
