import apiClient from "./apiClient";
const token = localStorage.getItem("authToken");

export const login = async (user: { email: string; password: string }) => {
  try {
    const response = await apiClient.post("/auth/login", user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get("/auth/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
