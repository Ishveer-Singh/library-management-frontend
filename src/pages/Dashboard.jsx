import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import { getMembers } from "../services/memberService";
import { getIssuedbook } from "../services/issuedbookService";
import Card from "../components/Card";
function Dashboard() {

  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    const book = await getBooks();
    setBooks(book.data.data);
    const member = await getMembers();
    setMembers(member.data.data);
    const issuedbook = await getIssuedbook();
    setIssuedBooks(issuedbook.data.data);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }

  return (

    <div>

      <h1>Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card>
          <h3 className="text-gray-500">Total Books</h3>
          <p className="text-3xl font-bold">{books.length}</p>
        </Card>

        <Card>
          <h3 className="text-gray-500">Total Members</h3>
          <p className="text-3xl font-bold">{members.length}</p>
        </Card>

        <Card>
          <h3 className="text-gray-500">Issued Books</h3>
          <p className="text-3xl font-bold">{issuedBooks.length}</p>
        </Card>

        <Card>
          <h3 className="text-gray-500">Available Copies</h3>
          <p className="text-3xl font-bold">
            {books.reduce(
              (total, book) => total + book.available_copies,0)}
          </p>
        </Card>

      </div>

    </div>

  )
}

export default Dashboard;
