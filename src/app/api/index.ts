export const host = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH}${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}${path}`;

export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export type ApiErrorBody<ErrorCode> = {
  message: string;
  code: ErrorCode;
  status?: number;
  details?: unknown;
};

export class ApiError<ErrorCode extends string = string> extends Error {
  code: ErrorCode;
  status?: number;
  details?: unknown;

  constructor({ message, code, status, details }: ApiErrorBody<ErrorCode>) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export const UnknownErrorCode = "UNKNOWN";

export const UnknownErrorBody = {
  message: "不明なエラーが発生しました",
  code: UnknownErrorCode,
};

export class UnknownApiError extends ApiError<typeof UnknownErrorCode> {
  constructor() {
    super({
      message: "不明なエラーが発生しました",
      code: UnknownErrorCode,
    });
  }
}
