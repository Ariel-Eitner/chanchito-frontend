"use client";
import { atom } from "recoil";

export const userNameState = atom<string>({
  key: "userNameState", // Unique ID for this atom
  default: "Usuario Inicial", // Default value
});
