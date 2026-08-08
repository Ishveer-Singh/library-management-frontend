import api from "./api";

export const getIssuedbook = async (page = 1, limit = 10) => {
    const response = await api.get(`/issued-books?page=${page}&limit=${limit}`);
    return response.data;
};

export const addIssuedbook = async (issuedbookdata) => {
  const response = await api.post("/issued-books", issuedbookdata);
  return response.data;
};

export const returnIssuedbook = async (id) => {
  const response = await api.put(`/issued-books/${id}/return`);
  return response.data;
};