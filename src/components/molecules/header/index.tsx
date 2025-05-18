"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useLogout } from "@/hooks/useLogout";
import { useUserState } from "@/providers/user/hook";

type Props = React.ComponentProps<"header">;

export const Header = ({ className, ...rest }: Props) => {
  const user = useUserState();
  const pathname = usePathname();
  const logout = useLogout();

  return (
    <header
      className={clsx(
        "flex h-12 items-center gap-4 bg-gray-100 px-4 py-2",
        className,
      )}
      {...rest}
    >
      <Link href="/" className="font-bold">
        XXXXX
      </Link>
      {user && (
        <>
          <ul className="ml-auto flex items-center gap-4">
            <li>
              <Link href="/my/posts/" className="underline">
                My Posts
              </Link>
            </li>
            <li>
              <Link href="/my/posts/create/" className="underline">
                Create Post
              </Link>
            </li>
          </ul>
          <Separator orientation="vertical" className="bg-gray-400" />
          <div className="flex items-center gap-2">
            <span>{user.name}</span>
            <Popover>
              <PopoverTrigger>
                <span className="inline-block h-8 w-8 overflow-hidden rounded-full">
                  {/* eslint-disable-next-line */}
                  <img
                    src={user.thumbnail}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </span>
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <Button variant="link" onClick={() => logout()}>
                  ログアウト
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}
      {!user && pathname !== "/login/" && (
        <ul className="ml-auto flex items-center gap-4">
          <li>
            <Link href="/login/" className="underline">
              ログイン
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};
