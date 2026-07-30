import api from "./api";

export const getMembers = () => {
  return api.get("/members");
};

export const addMember = async (memberData) => {
  const response = await api.post("/members", memberData);
  return response.data;
};

export const deleteMember = async (id) => {
  const response = await api.delete(`/members/${id}`);
  return response.data;
};
