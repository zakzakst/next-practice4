import { NextRequest, NextResponse } from "next/server";
import {
  GetUserErrorBody401Mock,
  GetUserErrorBody401Mock2,
  GetUserErrorBody404Mock,
  GetUserResponseMock,
} from "@/mocks/user";
import { ApiErrorBody, UnknownErrorBody } from "..";
import { GetUserResponse } from "./type";

export const dynamic = "force-static";

export const GET = async (
  request: NextRequest,
): Promise<NextResponse<GetUserResponse | ApiErrorBody<string>>> => {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (token === "token401") {
    return NextResponse.json(GetUserErrorBody401Mock, { status: 401 });
  }

  if (token === "token401-2") {
    return NextResponse.json(GetUserErrorBody401Mock2, { status: 401 });
  }

  if (token === "token404") {
    return NextResponse.json(GetUserErrorBody404Mock, { status: 404 });
  }

  if (token === "unknown00") {
    return NextResponse.json(UnknownErrorBody, { status: 500 });
  }

  return NextResponse.json(GetUserResponseMock);
};

export const POST = () => {};
