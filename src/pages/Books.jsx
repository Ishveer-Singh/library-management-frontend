import { useEffect, useState } from "react";
import { getBooks, createBook, deleteBook } from "../services/bookService";
import Button from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Books() {

  const { user } = useContext(AuthContext);

  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    available_copies: "",
  });

  const fetchBooks = async () => {
    const response = await getBooks();
    setBooks(response.data.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createBook(formData);

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


  return (
    <div>
      <h1>Books</h1>

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

          <Button type="submit">Add Book</Button>
      </form>)}

      {books.map((book) => (
        <p key={book.id}>{book.title}
          {user.role === "admin" && (
            <button className="bg-red-500 m-3 p-1"
              onClick={() => handleDelete(book.id)}>
              Delete
            </button>)}
        </p>
      ))}

    </div>
  );
}

export default Books;