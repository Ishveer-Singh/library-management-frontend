import { useEffect, useState } from "react";
import { getBooks, createBook, deleteBook, editBook } from "../services/bookService";
import Button from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/Input";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import Card from "../components/Card";
import { toast } from "react-toastify";

function Books() {

  const { user } = useContext(AuthContext);

  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    available_copies: "",
  });

  const fetchBooks = async () => {
    const response = await getBooks(page, limit, search);
    setBooks(response.data);
    setTotalPages(response.totalPages);
  };

  useEffect(() => {
    fetchBooks();
  }, [search, page]);

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingBook) {
        await editBook(editingBook.id, formData);
        toast.info("Book updated!");
      } else {
        await createBook(formData);
        toast.success("Book added successfully!");
      }

      setEditingBook(null);

      setFormData({
        title: "",
        author: "",
        category: "",
        available_copies: "",
      });

      fetchBooks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save book!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      toast.success("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete book."
      );
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);

    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      available_copies: book.available_copies,
    });
  };


  return (
    <div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Books
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your library collection
          </p>
        </div>
      </div>

      <div className="relative mb-6 max-w-md">
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
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">

            <Input
              label="Title"
              name="title"
              placeholder="Enter book title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <Input
              label="Author"
              name="author"
              placeholder="Enter author name"
              value={formData.author}
              onChange={handleChange}
              required
            />

            <Input
              label="Category"
              name="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <Input
              label="Available Copies"
              type="number"
              name="available_copies"
              placeholder="0"
              value={formData.available_copies}
              onChange={handleChange}
              required
              min={0}
            />

            <Button type="submit" className="w-fit self-end px-4">
              {editingBook ? "Update Book" : "Add Book"}
            </Button>

          </form>
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">

        <table className="min-w-full w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left">Title</th>
              <th className="hidden md:table-cell px-4 md:px-6 py-3 text-left">Author</th>
              <th className="px-4 md:px-6 py-3 text-left">Category</th>
              <th className="px-4 md:px-6 py-3 text-left">Copies</th>

              {user.role === "admin" && (
                <th className="px-4 md:px-6 py-3 text-left">Actions</th>
              )}

            </tr>
          </thead>

          <tbody>

            {books.map((book) => (

              <tr
                key={book.id}
                className="border-b border-slate-200 hover:bg-slate-100 transition-colors"
              >

                <td className="px-4 md:px-6 py-4 font-medium text-slate-800">
                  {book.title}
                </td>

                <td className="hidden md:table-cell px-4 md:px-6 py-4">
                  {book.author}
                </td>

                <td className="px-4 md:px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                    {book.category}
                  </span>
                </td>

                <td className="px-4 md:px-6 py-4 font-medium">
                  {book.available_copies}
                </td>

                {user.role === "admin" && (

                  <td className="px-4 md:px-6 py-4">
                    <div className="flex gap-2 ">

                    <button
                      className="inline-flex items-center gap-1.5 px-2.5 py-2.5 mx-3 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                      onClick={() => handleEdit(book)}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="inline-flex items-center gap-1.5 px-2.5 py-2.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                      onClick={() => handleDelete(book.id)}
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

export default Books;
