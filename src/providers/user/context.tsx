"use client";

import { createContext } from "react";
import { User } from "@/types/User";

// State関連
export type UserState = User;
export const UserStateContext = createContext<UserState | null>(null);

// Action関連
export type UserAction = {
  setUserState: (state?: UserState) => void;
  clearUserState: () => void;
};
const initialAction: UserAction = {
  setUserState: () => {},
  clearUserState: () => {},
};
export const UserActionContext = createContext<UserAction>(initialAction);
