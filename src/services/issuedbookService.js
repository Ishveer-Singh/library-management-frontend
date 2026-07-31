import api from "./api";

export const getIssuedbook = () => {
  return api.get("/issued-books");
};

export const addIssuedbook = async (issuedbookdata) => {
  const response = await api.post("/issued-books", issuedbookdata);
  return response.data;
};

export const returnIssuedbook = async (id) => {
  const response = await api.put(`/issued-books/${id}/return`);
  return response.data;
};