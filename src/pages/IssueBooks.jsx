import { useEffect, useState } from "react";
import { getIssuedbook, addIssuedbook, returnIssuedbook } from "../services/issuedbookService";
import Button from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/Input";
import { Undo2 } from "lucide-react";
import { toast } from "react-toastify";

function Issuedbook() {

  const { user } = useContext(AuthContext);

  const [issuedbooks, setIssuedbooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [formData, setFormData] = useState({
    book_id: "",
    member_id: "",
    issue_date: "",
  });

  const fetchIssuedbooks = async () => {
    const response = await getIssuedbook(page, limit);
    setIssuedbooks(response.data.data);
    setTotalPages(response.data.totalPages);
  };

  useEffect(() => {
    fetchIssuedbooks();
  }, [page]);

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addIssuedbook(formData);
    toast.success("Book issued successfully!");

    setFormData({
      book_id: "",
      member_id: "",
      issue_date: "",
    });
    fetchIssuedbooks();
  }

  const handleReturn = async (id) => {
    await returnIssuedbook(id);
    toast.success("Book returned successfully!");
    fetchIssuedbooks();
  };

  return (
    <div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Issued Books
          </h1>

          <p className="text-slate-500 mt-1">
            Manage book issues and returns
          </p>
        </div>
      </div>

      {user.role === "admin" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <form onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

            <Input
              label="Book ID"
              name="book_id"
              placeholder="Enter book Id"
              value={formData.book_id}
              onChange={handleChange}
              required
            />

            <Input
              label="Member ID"
              name="member_id"
              placeholder="Enter member Id"
              value={formData.member_id}
              onChange={handleChange}
              required
            />

            <Input
              label="Issue date"
              name="issue_date"
              placeholder="Enter issue date"
              value={formData.issue_date}
              onChange={handleChange}

            />

            <Button type="submit" className="w-fit self-end px-4">
              Add Issued book
            </Button>

          </form>
        </div>)}

      <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">
            <tr>

              <th className="px-6 py-3 text-left">Book</th>
              <th className="px-6 py-3 text-left">Member</th>
              <th className="hidden md:table-cell px-6 py-3 text-left">Issue Date</th>
              <th className="hidden md:table-cell px-6 py-3 text-left">Return Date</th>
              <th className="px-6 py-3 text-left">status</th>

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
                className="border-b border-slate-200 hover:bg-slate-100 transition-colors"
              >

                <td className="px-6 py-4">
                  {issuedbook.title}
                </td>

                <td className="px-6 py-4">
                  {issuedbook.name}
                </td>

                <td className="hidden md:table-cell px-6 py-4">
                  {new Date(issuedbook.issue_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="hidden md:table-cell px-6 py-4">
                  {new Date(issuedbook.return_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${issuedbook.status === "issued"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                      }`}
                  >
                    {issuedbook.status}
                  </span>
                </td>

                {user.role === "admin" && (

                  <td className="px-6 py-4">

                    {issuedbook.status === "issued" && (

                      <button
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg transition"
                        onClick={() => handleReturn(issuedbook.id)}
                      >
                        <Undo2 size={16} />
                        Return
                      </button>
                    )}

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

export default Issuedbook;
