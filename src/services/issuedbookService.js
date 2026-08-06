import api from "./api";

export const getIssuedbook = (page,limit) => {
  return api.get(`/issued-books?page=${page}&limit=${limit}`);
};

export const addIssuedbook = async (issuedbookdata) => {
  const response = await api.post("/issued-books", issuedbookdata);
  return response.data;
};

export const returnIssuedbook = async (id) => {
  const response = await api.put(`/issued-books/${id}/return`);
  return response.data;
};