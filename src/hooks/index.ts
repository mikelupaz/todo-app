import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
});

export const axiosFetcher = async (url: string) => {
  const response = await axiosInstance.get(url);
  return response;
};

export default axiosInstance;
