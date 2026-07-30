import { useEffect, useState } from "react";
import { getIssuedbook, addIssuedbook, deletIssuedbook } from "../services/issuedbookService";
import Button from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Issuedbook() {

  const { user } = useContext(AuthContext);

  const [issuedbooks, setIssuedbooks] = useState([]);

  const [formData, setFormData] = useState({
    book_id: "",
    member_id: "",
    issue_date: "",
    return_date: "",
  });

  const fetchIssuedbooks = async () => {
    const response = await getIssuedbook();
    setIssuedbooks(response.data.data);
  };

  useEffect(() => {
    fetchIssuedbooks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addIssuedbook(formData);

    setFormData({
      book_id: "",
      member_id: "",
      issue_date: "",
      return_date: "",
    });
    fetchIssuedbooks();
  }

  const handleDelete = async (id) => {
    await deletIssuedbook(id);
    fetchIssuedbooks();
  };

  console.log(issuedbooks);
  


  return (
    <div>
      <h1>Issued-books</h1>

      {user.role === "admin" && (
        <form onSubmit={handleSubmit}>
        <input
          name="book_id"
          placeholder="Book Id"
          value={formData.book_id}
          onChange={handleChange}
        />

        <input
          name="member_id"
          placeholder="Member Id"
          value={formData.member_id}
          onChange={handleChange}
        />

        <input
          name="issue_date"
          placeholder="Issue Date"
          value={formData.issue_date}
          onChange={handleChange}
        />

        <input
          name="return_date"
          placeholder="Return Date"
          value={formData.return_date}
          onChange={handleChange}
        />

          <Button type="submit">Add Issued book</Button>
      </form>)}

      {issuedbooks.map((issuedbook) => (
        <p key={issuedbook.id}>{issuedbook.name}
          {user.role === "admin" && (
            <button className="bg-red-500 m-3 p-1"
              onClick={() => handleDelete(issuedbook.id)}>
              Delete
            </button>)}</p>
      ))}

    </div>
  );
}

export default Issuedbook;
