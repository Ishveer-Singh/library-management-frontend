import api from "./api";

export const getBooks = () => {
  return api.get("/books");
};

export const createBook = async (bookData) => {
  const response = await api.post("/books", bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};
