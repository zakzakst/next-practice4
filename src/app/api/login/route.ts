import { NextRequest, NextResponse } from "next/server";
import {
  PostLoginErrorBody401Mock,
  PostLoginErrorBody404Mock,
  PostLoginResponseMock,
} from "@/mocks/login";
import { ApiErrorBody, UnknownErrorBody } from "..";
import { PostLoginRequest, PostLoginResponse } from "./type";

export const POST = async (
  request: NextRequest,
): Promise<NextResponse<PostLoginResponse | ApiErrorBody<string>>> => {
  const { password }: PostLoginRequest = await request.json();

  if (password === "password401") {
    return NextResponse.json(PostLoginErrorBody401Mock, { status: 401 });
  }

  if (password === "password404") {
    return NextResponse.json(PostLoginErrorBody404Mock, { status: 404 });
  }

  if (password === "unknown00") {
    return NextResponse.json(UnknownErrorBody, { status: 500 });
  }

  return NextResponse.json(PostLoginResponseMock);
};
