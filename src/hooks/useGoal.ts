import { IGoalForm } from "src/@types/goal";
import useSWR from "swr";
import api, { axiosFetcher } from "./index";

export const useGoals = (id: number) => {
  const { data, error, mutate } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/goals?userId=${id}` : null,
    axiosFetcher
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    error,
    mutate,
  };
};

export const addGoal = async (params: IGoalForm) => {
  const response = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/goals`,
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

export const updateGoal = async (params: IGoalForm) => {
  const response = await api.put(
    `${process.env.NEXT_PUBLIC_API_URL}/goals/${params?.id}`,
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
export const deleteGoal = async (id: number) => {
  const response = await api.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/goals/${id}`
  );
  const { data, status } = response;
  return {
    data,
    status,
    isLoading: false,
    isError: status !== 200,
  };
};
