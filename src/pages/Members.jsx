import { useEffect, useState } from "react";
import { getMembers, addMember, deleteMember, editMember } from "../services/memberService";
import Button from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Members() {

  const { user } = useContext(AuthContext);

  const [members, setMembers] = useState([]);

  const [editingMember, setEditingMember] = useState(null);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchMembers = async () => {
    const response = await getMembers(search);
    setMembers(response.data.data);
  };

  useEffect(() => {
    fetchMembers();
  }, [search]);

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingMember) {
      await editMember(editingMember.id, formData);
    } else {
      await addMember(formData);
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
      <h1>Members</h1>

      <input
        type="text"
        placeholder="Search member..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {user.role === "admin" && (
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
          />

          <Button type="submit">
            {editingMember ? "Update Member" : "Add Member"}
          </Button>

        </form>)}

      <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>

              <th className="px-6 py-3 text-left">
                Name
              </th>

              <th className="px-6 py-3 text-left">
                Email
              </th>

              <th className="px-6 py-3 text-left">
                Phone
              </th>

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
                className="border-b hover:bg-gray-50"
              >

                <td className="px-6 py-4">
                  {member.name}
                </td>

                <td className="px-6 py-4">
                  {member.email}
                </td>

                <td className="px-6 py-4">
                  {member.phone}
                </td>

                {user.role === "admin" && (

                  <td className="px-6 py-4">

                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEdit(member)}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(member.id)}
                    >
                      Delete
                    </button>

                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Members;

