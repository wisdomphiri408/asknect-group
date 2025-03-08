// pages/index.js
import BookCard from "/components/BookCard.jsx";
import { Share } from 'lucide-react';
import Link from "next/link";

const books = [
  {
    imageUrl: "/assets/books/pure math.jpg",
    title: "Pure and Applied Mathematics",
    posterProfileImage: "/assets/profile/profile1.jpg",
    posterName: "John Doe",
    downloads: 123,
    likes: 12,
  },
  {
    imageUrl: "/assets/books/life.jpg",
    title: "LifeSkills Excel form 4",
    posterProfileImage: "/assets/profile/channels4_profile (2).jpg",
    posterName: "Jane Smith",
    downloads: 456,
    likes: 34,
  },
  {
    imageUrl: "/assets/books/adma.jpg",
    title: "Additional Math",
    posterProfileImage: "/assets/profile/channels4_profile (1).jpg",
    posterName: "Mike Namate",
    downloads: 123,
    likes: 12,
  },
  {
    imageUrl: "/assets/books/bio excel.jpg",
    title: "Biology Excel form 1",
    posterProfileImage: "/assets/profile/unnamed (1).jpg",
    posterName: "Brain Mthulula",
    downloads: 456,
    likes: 34,
  },
  {
    imageUrl: "/assets/books/pure math.jpg",
    title: "Pure and Applied Mathematics(Terbet)",
    posterProfileImage: "/assets/profile/profile1.jpg",
    posterName: "Kelvin Heart",
    downloads: 123,
    likes: 12,
  },
  {
    imageUrl: "/assets/books/physics excel.jpg",
    title: "Physics Excel form 3",
    posterProfileImage: "/assets/icons/favicon.png",
    posterName: "Asknect Physics",
    downloads: 456,
    likes: 34,
  },
  {
    imageUrl: "/assets/books/terbet.jpg",
    title: "Pure and Applied Mathematics(Terbet)",
    posterProfileImage: "/assets/profile/profile1.jpg",
    posterName: "Goffrey James",
    downloads: 123,
    likes: 12,
  },
  {
    imageUrl: "/assets/books/bio.jpg",
    title: "Biology book",
    posterProfileImage: "/assets/profile/channels4_profile (2).jpg",
    posterName: "Mentry Gama ",
    downloads: 456,
    likes: 34,
  },
  {
    imageUrl: "/assets/books/terbet.jpg",
    title: "Pure and Applied Mathematics(Terbet)",
    posterProfileImage: "/assets/profile/profile1.jpg",
    posterName: "Goffrey James",
    downloads: 123,
    likes: 12,
  },
  {
    imageUrl: "/assets/books/bio.jpg",
    title: "Biology book",
    posterProfileImage: "/assets/profile/channels4_profile (2).jpg",
    posterName: "Mentry Gama ",
    downloads: 456,
    likes: 34,
  },
  {
    imageUrl: "/assets/books/bio.jpg",
    title: "Biology book",
    posterProfileImage: "/assets/profile/channels4_profile (2).jpg",
    posterName: "Mentry Gama ",
    downloads: 456,
    likes: 34,
  },
];



export default function Home() {
  return (
    <div className="mx-auto max-w-7xl mt-16">
      <div className="flex justify-between items-center px-2 pt-1 mb-2 shadow dark:bg-gray-800">
        <h3 className="text-sm font-bold mb-6 text-center dark:text-white">
        Explore Our Books
        </h3>
        <div className="actions">
          <Link href="/upload" className="text-sm dark:text-white mb-2 flex items-center"><Share width={15} /> Share</Link>
        </div>
      </div>
      
      {/* Flex Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.map((book, index) => (
          <div key={index} className="border dark:border-gray-700">
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}

