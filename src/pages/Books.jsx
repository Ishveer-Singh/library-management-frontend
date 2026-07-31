import { useEffect, useState } from "react";
import { getBooks, createBook, deleteBook, editBook } from "../services/bookService";
import Button from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Books() {

  const { user } = useContext(AuthContext);

  const [books, setBooks] = useState([]);

  const [editingBook, setEditingBook] = useState(null);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    available_copies: "",
  });

  const fetchBooks = async () => {
    const response = await getBooks(search);
    setBooks(response.data.data);
  };

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingBook) {
      await editBook(editingBook.id, formData);
    } else {
      await createBook(formData);
    }

    setFormData({
      title: "",
      author: "",
      category: "",
      available_copies: "",
    });
    fetchBooks();
  }

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
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
      <h1>Books</h1>

      <input
        type="text"
        placeholder="Search book..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {user.role === "admin" && (
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <input
            name="available_copies"
            placeholder="Copies"
            value={formData.available_copies}
            onChange={handleChange}
          />

          <Button type="submit">
            {editingBook ? "Update Book" : "Add Book"}
          </Button>

        </form>)}

      <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Copies</th>

              {user.role === "admin" && (
                <th className="px-6 py-3 text-left">Actions</th>
              )}

            </tr>
          </thead>

          <tbody>

            {books.map((book) => (

              <tr
                key={book.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-6 py-4">
                  {book.title}
                </td>

                <td className="px-6 py-4">
                  {book.author}
                </td>

                <td className="px-6 py-4">
                  {book.category}
                </td>

                <td className="px-6 py-4">
                  {book.available_copies}
                </td>

                {user.role === "admin" && (

                  <td className="px-6 py-4">

                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(book.id)}
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

export default Books;

