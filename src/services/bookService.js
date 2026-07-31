import api from "./api";

export const getBooks = (search = "") => {
  return api.get(`/books?title=${search}`);
};

export const createBook = async (bookData) => {
  const response = await api.post("/books", bookData);
  return response.data;
};

export const editBook = async (id,bookData) => {
  const response = await api.put(`/books/${id}`,bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};
