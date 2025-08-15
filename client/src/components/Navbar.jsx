import { useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import { Link, Route, Routes } from "react-router-dom";
import NovelForm from "../pages/NovelForm";
import NovelDetails from "../pages/NovelDetails";
import AddChapter from "../pages/AddChapter";
import NovelList from "./NovelList";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar with heading + buttons in same row */}
      <nav className="text-white px-6 py-4 flex items-center justify-between relative mt-1">
        {/* Heading centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
         <h1 className="text-4xl font-extrabold" style={{ fontFamily: "'Cinzel', serif" }}>
  NovelVerse
</h1>
<p className="text-gray-300 text-lg" style={{ fontFamily: "'Lora', serif" }}>
  Read, Create, and Explore Novels
</p>
        </div>

        {/* Desktop Menu on right */}
        <div className="hidden md:flex items-center space-x-5 ml-auto">
          <Link
  to="/create-novel"
  style={{ fontFamily: "'Lora', serif" }}
  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-2xl transition"
>
  Upload Novel
</Link>
          <UserButton />
        </div>

        {/* Mobile Hamburger on right */}
        <button
          className="md:hidden text-white text-2xl ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg flex flex-col p-4 space-y-3 md:hidden z-50">
            {/* Home Link */}
            <Link
              to="/"
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition text-center"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            {/* Upload New Novel */}
            <Link
              to="/create-novel"
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition text-center"
              onClick={() => setMenuOpen(false)}
            >
              Upload New Novel
            </Link>
            <div className="flex justify-center">
              <UserButton /><p>User</p>
            </div>
          </div>
        )}
      </nav>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col p-6 space-y-8">
              <NovelList />
            </div>
          }
        />
        <Route path="/create-novel" element={<NovelForm />} />
        <Route path="/novels/:id" element={<NovelDetails />} />
        <Route path="/novels/:id/add-chapter" element={<AddChapter />} />
      </Routes>
    </>
  );
};

export default Navbar;
