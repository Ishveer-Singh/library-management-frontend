import { useEffect, useState } from "react";
import { BookOpen, Users, Repeat, Library } from "lucide-react";
import Card from "../components/Card";
import { getBooks } from "../services/bookService";
import { getMembers } from "../services/memberService";
import { getIssuedbook } from "../services/issuedBookService";


function Dashboard() {

    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [issuedBooks, setIssuedBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchData() {

            try {
                const booksData = await getBooks();
                const membersData = await getMembers();
                const issuedData = await getIssuedbook();

                setBooks(booksData.data.data);
                setMembers(membersData.data.data);
                setIssuedBooks(issuedData.data.data);

            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);

            }}
        fetchData();},[]);

    const stats = [

        {
            title: "Total Books",
            value: books.length,
            icon: <BookOpen size={27} />,
        },
        {
            title: "Members",
            value: members.length,
            icon: <Users size={27} />,
        },
        {
            title: "Issued Books",
            value: issuedBooks.length,
            icon: <Repeat size={27} />,
        },
        {
            title: "Available Copies",
            value: books.reduce(
                (total, book) => total + book.available_copies,0),
            icon: <Library size={27} />,
        }
    ];


    if (loading) {
        return (
            <div className="text-center text-gray-500">
                Loading dashboard...
            </div>
        );
    }

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome back👋
                </h1>
                <p className="text-gray-500 mt-1">
                    Manage your library efficiently with BookSphere.
                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {stats.map((item, index) => (

                    <Card key={index}
                    className="hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 text-sm">
                                    {item.title}
                                </p>

                                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                    {item.value}
                                </h2>

                            </div>

                            <div className="bg-indigo-100 text-indigo-600 p-4 rounded-2xl">
                                {item.icon}

                            </div>

                        </div>

                    </Card>

                ))}

            </div>

            <Card>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Recent Activity
                </h2>
                <p className="text-gray-500">
                    No recent activity available.
                </p>
            </Card>

        </div>

    );

}

export default Dashboard;