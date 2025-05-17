export const isObjectEmpty = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
};

export const getRouterPushPath = (path: string) => {
  // NOTE: ssgでbuildした際、router.pushを正しく動かすのにドメインを付ける必要があった
  if (process.env.NODE_ENV === "production") {
    const deployGitHub = true;
    const domain = deployGitHub
      ? "https://zakzakst.github.io"
      : "http://localhost:3000";
    return `${domain}${process.env.NEXT_PUBLIC_BASE_PATH}${path}`;
  }
  return path;
};
