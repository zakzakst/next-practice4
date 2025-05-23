"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TextboxWithCounter } from "@/components/molecules/textboxWithCounter";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { isObjectEmpty } from "@/lib/utils2";

const postFormValuesSchema = z.object({
  title: z.string(),
  bio: z.string(),
  content: z.string(),
});

export type PostFormValues = z.infer<typeof postFormValuesSchema>;

const defaultValues: PostFormValues = {
  title: "",
  bio: "",
  content: "",
};

type Props = {
  isBusy?: boolean;
  onSubmit: (data: PostFormValues) => void;
};

export const PostForm = ({ isBusy, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postFormValuesSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-3xl p-4">
      <div className="grid grid-cols-[1fr_max-content] gap-4">
        <div className="flex flex-col gap-4">
          <TextboxWithCounter
            name="title"
            label="記事タイトル"
            max={32}
            control={control}
          />
          {/* <div>
            <div className="flex items-center justify-between">
              <Label>記事タイトル</Label>
              <span>0 / 32</span>
            </div>
            <Input className="mt-2" />
          </div> */}
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
            <Button disabled={!isObjectEmpty(errors) || isBusy}>
              下書き保存する
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
