export const validationMessages = {
  required: (name: string) => `${name}は入力必須項目です`,
  maxLength: (limit: number) => `${limit}文字以内で入力してください`,
  minLength: (limit: number) => `${limit}文字以上で入力してください`,
  email: "正しいメールアドレスを入力してください",
};
