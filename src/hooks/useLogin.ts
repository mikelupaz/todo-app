import { LoginFormType } from "src/@types/login";

import api from "./index";

export const loginUser = async (params: LoginFormType) => {
  const response = await api.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users?username=${params?.email}&password=${params?.password}`
  );

  const { data, status } = response;
  return {
    data,
    status,
    isLoading: false,
    isError: status !== 200,
  };
};

export const useUser = () => {
  const loggedUser =
    typeof window !== "undefined" ? localStorage.getItem("loggedUser") : null;

  const user = loggedUser ? JSON.parse(loggedUser) : null;
  return {
    data: user,
  };
};
