import { useEffect, useState } from "react";
import { getIssuedbook, addIssuedbook, returnIssuedbook } from "../services/issuedbookService";
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
  });

  const fetchIssuedbooks = async () => {
    const response = await getIssuedbook();
    console.log("API Response:", response.data);
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
    });
    fetchIssuedbooks();
  }

  const handleReturn = async (id) => {
    await returnIssuedbook(id);
    fetchIssuedbooks();
  };


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

          <Button type="submit">Add Issued book</Button>
        </form>)}

      <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>

              <th className="px-6 py-3 text-left">
                Book
              </th>

              <th className="px-6 py-3 text-left">
                Member
              </th>

              <th className="px-6 py-3 text-left">
                Issue Date
              </th>

              <th className="px-6 py-3 text-left">
                Return Date
              </th>

              <th className="px-6 py-3 text-left">
                status
              </th>

              {user.role === "admin" && (
                <th className="px-6 py-3 text-left">
                  Actions
                </th>
              )}

            </tr>
          </thead>

          <tbody>

            {issuedbooks.map((issuedbook) => (

              <tr
                key={issuedbook.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-6 py-4">
                  {issuedbook.title}
                </td>


                <td className="px-6 py-4">
                  {issuedbook.name}
                </td>

                <td className="px-6 py-4">
                  {issuedbook.issue_date}
                </td>

                <td className="px-6 py-4">
                  {issuedbook.return_date}
                </td>

                <td className="px-6 py-4">
                  {issuedbook.status}
                </td>

                {user.role === "admin" && (

                  <td className="px-6 py-4">

                    {issuedbook.status === "issued" && (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => handleReturn(issuedbook.id)}
                      >
                        Return book
                      </button>
                    )}

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

export default Issuedbook;
