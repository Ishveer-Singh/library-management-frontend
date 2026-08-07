import { useEffect, useState } from "react";
import { getMembers, addMember, deleteMember, editMember } from "../services/memberService";
import Button from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/Input";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { toast } from "react-toastify";

function Members() {

  const { user } = useContext(AuthContext);

  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchMembers = async () => {
    const response = await getMembers(page, limit, search);
    setMembers(response.data.data);
    setTotalPages(response.data.totalPages);
  };

  useEffect(() => {
    fetchMembers();
  }, [search, page]);

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingMember) {
      await editMember(editingMember.id, formData);
      toast.success("Member updated successfully!");
    } else {
      await addMember(formData);
      toast.success("Book added successfully!");
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
    });
    fetchMembers();
  }

  const handleDelete = async (id) => {
    await deleteMember(id);
    toast.success("Member deleted successfully!");
    fetchMembers();
  };

  const handleEdit = (member) => {
    setEditingMember(member);

    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
    });
  };


  return (
    <div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Members
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your library members
          </p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />

        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books..."
          className="pl-12"
        />
      </div>

      {user.role === "admin" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <form onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

            <Input
              label="Name"
              name="name"
              placeholder="Enter Member name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              name="email"
              placeholder="Enter Member email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone"
              name="phone"
              placeholder="Enter Member number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <Button type="submit" className="w-fit self-end px-4">
              {editingMember ? "Update Member" : "Add Member"}
            </Button>

          </form>
        </div>
      )}

      <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow">

        <table className="min-w-full w-full">

          <thead className="bg-slate-100">
            <tr>

              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="hidden md:table-cell px-6 py-3 text-left">Phone</th>

              {user.role === "admin" && (
                <th className="px-6 py-3 text-left">
                  Actions
                </th>
              )}

            </tr>
          </thead>

          <tbody>

            {members.map((member) => (

              <tr
                key={member.id}
                className="border-b border-slate-200 hover:bg-slate-100 transition-colors"
              >

                <td className="px-4 md:px-6 py-4 font-medium text-slate-800">
                  {member.name}
                </td>

                <td className="px-6 py-4 max-w-xs truncate">
                  {member.email}
                </td>

                <td className="hidden md:table-cell px-6 py-4">
                  {member.phone}
                </td>

                {user.role === "admin" && (

                  <td className="px-6 py-4">
                    <div className="flex gap-2 ">

                      <button
                        className="inline-flex items-center gap-1.5 px-2.5 py-2.5 mx-3 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                        onClick={() => handleEdit(member)}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className="inline-flex items-center gap-1.5 px-2.5 py-2.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                        onClick={() => handleDelete(member.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ← Previous
          </button>

          <span className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium">
            {page}
          </span>

          <button
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>
        </div>

      </div>
    </div>
  );
}

export default Members;
