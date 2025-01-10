import apiClient from "./apiClient";

export const addUser = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await apiClient.post("/user", user);
  return response.data;
};
