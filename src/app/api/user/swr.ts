import useSWRMutation from "swr/mutation";
import { GetUserResponseMock } from "@/mocks/user";
import { ApiError, UnknownApiError, defaultHeaders, host } from "..";
import {
  GetUserErrorCode,
  GetUserErrorCodes,
  GetUserParams,
  GetUserResponse,
} from "./type";

const getUserFetcher = async (
  url: string,
  { arg }: { arg: GetUserParams },
): Promise<GetUserResponse> => {
  // 開発中のみ利用：Nextjsのapiが使えない場合、固定の値を返す
  if (process.env.NEXT_PUBLIC_FEATURE_ABLE_MOCK === "false")
    return GetUserResponseMock;

  const query = new URLSearchParams(
    Object.entries(arg).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  const res = await fetch(`${url}?${query.toString()}`, {
    headers: defaultHeaders,
  });
  if (!res.ok) {
    const error = await res.json();
    if (GetUserErrorCodes.includes(error.code)) {
      throw new ApiError<GetUserErrorCode>(error);
    }
    throw new UnknownApiError();
  }
  const data = await res.json();
  return data;
};

export const useGetUser = () => {
  const { trigger, error, isMutating } = useSWRMutation(
    host("/user/"),
    getUserFetcher,
  );
  return {
    trigger,
    error,
    isMutating,
  };
};
