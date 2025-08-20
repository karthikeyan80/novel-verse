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
        {/* Heading centered (responsive) */}
        <div className="flex-1 text-center md:w-auto md:absolute md:left-1/2 md:-translate-x-1/2 md:transform">
          <h1
            className="text-4xl font-extrabold"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            NovelVerse
          </h1>
          <p
            className="text-gray-300 text-lg"
            style={{ fontFamily: "'Lora', serif" }}
          >
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
          className="md:hidden text-white text-2xl ml-auto z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
{/* Mobile Dropdown */}
{menuOpen && (
  <div className="fixed top-0 left-0 w-full h-1/3 bg-gradient-to-br from-gray-900 via-blue-800 to-gray-900/95 backdrop-blur-md shadow-xl rounded-b-3xl flex flex-col items-center justify-center space-y-6 p-6 md:hidden z-40 animate-slideDown">
    {/* Close Button inside menu */}
      

    {/* Links */}
    <Link
      to="/"
      className="w-full text-center text-lg font-semibold bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition"
      onClick={() => setMenuOpen(false)}
    >
      Home
    </Link>

    <Link
      to="/create-novel"
      className="w-full text-center text-lg font-semibold bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl transition"
      onClick={() => setMenuOpen(false)}
    >
      Upload New Novel
    </Link>

    {/* User Section */}
    <div className="flex flex-col items-center space-y-2">
      <UserButton />
      <p className="text-sm text-gray-300">User</p>
    </div>
  </div>
)}

      </nav>

      {/* Routes moved to App.jsx */}
    </>
  );
};

export default Navbar;
