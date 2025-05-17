"use client";

import { useContext } from "react";
import { UserActionContext, UserStateContext } from "./context";

export const useUserAction = () => {
  return useContext(UserActionContext);
};

export const useUserState = () => {
  return useContext(UserStateContext);
};
