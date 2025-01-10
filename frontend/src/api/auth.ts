import apiClient from "./apiClient";

export const login = async (user: { email: string; password: string }) => {
  const response = await apiClient.post("/auth/login", user);
  return response.data;
};

