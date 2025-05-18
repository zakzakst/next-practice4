"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useUserState } from "@/providers/user/hook";

export const MyPostCreate = () => {
  const user = useUserState();

  return (
    <>
      {user && (
        <div className="mx-auto max-w-3xl p-4">
          <div className="grid grid-cols-[1fr_max-content] gap-4">
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between">
                  <Label>記事タイトル</Label>
                  <span>0 / 32</span>
                </div>
                <Input className="mt-2" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label>自己紹介文</Label>
                  <span>0 / 128</span>
                </div>
                <Textarea className="mt-2" rows={3} />
              </div>
            </div>
            <div className="grid w-48 place-content-center">
              <Button>イメージを選択する</Button>
              {/* <div className="aspect-3/2 overflow-hidden">
                <img
                  src="https://picsum.photos/id/237/200/200"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div> */}
            </div>
          </div>
          <div className="mt-4">
            <Label>本文</Label>
            {/* TODO: プレビュー切替実装 */}
            <Textarea className="mt-2 h-80" />
          </div>
          <Separator className="my-6" />
          <div className="flex items-center justify-between">
            <div>{/* <Button>記事を削除する</Button> */}</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span>公開ステータス</span>
                <Switch />
              </div>
              <div>
                <Button>下書き保存する</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
