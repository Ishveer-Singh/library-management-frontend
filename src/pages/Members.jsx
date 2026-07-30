import { useEffect, useState } from "react";
import { getMembers,addMember,deleteMember } from "../services/memberService";
import Button from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Members() {

  const { user } = useContext(AuthContext);

  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchMembers = async () => {
      const response = await getMembers();
      setMembers(response.data.data);
    };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
  
      await addMember(formData);
  
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


  return (
    <div>
      <h1>Members</h1>

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

          <Button type="submit">Add Member</Button>
      </form>)}

      {members.map((member) => (
        <p key={member.id}>{member.name}
        {user.role === "admin" && (
        <button className="bg-red-500 m-3 p-1" 
          onClick={() => handleDelete(member.id)}>
            Delete
          </button>)}</p>
      ))}

    </div>
  );
}

export default Members;