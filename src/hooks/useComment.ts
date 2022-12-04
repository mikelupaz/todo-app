import { ICommentForm } from "src/@types/comment";

import useSWR from "swr";
import api, { axiosFetcher } from "./index";

export const useComments = (id?: number) => {
  const { data, error, mutate } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/comments?goalId=${id}` : null,
    axiosFetcher
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    error,
    mutate,
  };
};

export const addComment = async (params: ICommentForm) => {
  const response = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/comments`,
    params
  );
  const { data, status } = response;
  return {
    data,
    status,
    isLoading: false,
    isError: status !== 201,
  };
};

export const updateComment = async (params: ICommentForm) => {
  const response = await api.put(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${params?.id}`,
    params
  );
  const { data, status } = response;
  return {
    data,
    status,
    isLoading: false,
    isError: status !== 200,
  };
};

export const deleteComment = async (id: number) => {
  const response = await api.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`
  );
  const { data, status } = response;
  return {
    data,
    status,
    isLoading: false,
    isError: status !== 200,
  };
};
