import apiClient from "./apiClient";
const token = localStorage.getItem("authToken");

export const fetchPosts = async () => {
  const response = await apiClient.get("/post");
  if (!response) throw new Error("Failed to fetch posts");
  return response.data.data;
};

export const fetchPostById = async (id: number) => {
  const response = await apiClient.get(`/post/${id}`);
  if (!response) throw new Error("Failed to fetch post details");
  return response.data.data;
};

export const createPost = async (postData: any) => {
  const response = await apiClient.post("/post", postData);
  return response.data;
};

export const getPostsByCurrentUser = async () => {
  try {
    const response = await apiClient.get("/post/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPostsByUser = async (id: number) => {
  try {
    const response = await apiClient.get(`/post/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
