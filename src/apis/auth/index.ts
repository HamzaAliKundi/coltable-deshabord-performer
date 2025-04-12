import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { LoginCredentials } from "./types";
import { SignUpCredentials } from "../../types/auth";

const login = async (credentials: LoginCredentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};
export function useLoginMutation() {
  return useMutation<any, Error, LoginCredentials>({
    mutationFn: login,
  });
}

const signup = async (credentials: SignUpCredentials) => {
  const response = await axiosInstance.post("/auth/register", credentials);
  return response.data;
};

export function useSignUpMutation() {
  return useMutation<any, Error, SignUpCredentials>({
    mutationFn: signup,
  });
}