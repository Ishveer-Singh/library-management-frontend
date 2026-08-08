import api from "./api";

export const getMembers = async (page = 1, limit = 10, search = "") => {
    const response = await api.get(`/members?page=${page}&limit=${limit}&name=${search}`);
    return response.data;
};

export const addMember = async (memberData) => {
  const response = await api.post("/members", memberData);
  return response.data;
};

export const editMember = async (id, memberData) => {
  const response = await api.put(`/members/${id}`, memberData);
  return response.data;
};

export const deleteMember = async (id) => {
  const response = await api.delete(`/members/${id}`);
  return response.data;
};
