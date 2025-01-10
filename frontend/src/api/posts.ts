import apiClient from "./apiClient";

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

export const createPost = async (postData: {
  title: string;
  content: string;
}) => {
  const response = await apiClient.post("/post", postData);
  return response.data;
};
