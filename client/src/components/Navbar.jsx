import { useState, useEffect, useRef } from "react";
import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home07Icon,
  BookIcon,
} from "@hugeicons/core-free-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="text-white px-6 py-4 flex items-center justify-between relative mt-1">
        {/* Heading centered */}
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

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-5 ml-auto">
          <Link
            to="/"
            style={{ fontFamily: "'Lora', serif" }}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-2xl transition flex items-center gap-2"
          >
            <HugeiconsIcon icon={Home07Icon} />
            Home
          </Link>

          <Link
            to="/favorites"
            style={{ fontFamily: "'Lora', serif" }}
            className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-2xl transition flex items-center gap-2"
          >
            <Heart className="w-5 h-5 text-black" />
            Favorites
          </Link>

          <Link
            to="/create-novel"
            style={{ fontFamily: "'Lora', serif" }}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-2xl transition"
          >
            Upload Novel
          </Link>

          <UserButton />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl ml-auto z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Mobile Dropdown with animation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full 
                        bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                        backdrop-blur-xl shadow-2xl rounded-b-3xl 
                        flex flex-col items-center justify-center 
                        space-y-4 py-8 md:hidden z-40"
            >
              <Link
                to="/"
                className="w-3/4 flex justify-center items-center 
            text-center text-lg font-semibold 
            bg-gray-700 hover:bg-gray-600 
            px-6 py-3 rounded-xl transition gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <HugeiconsIcon icon={Home07Icon} className="w-6 h-6" />
                Home
              </Link>

              <Link
                to="/favorites"
                className="w-3/4 flex justify-center items-center 
            text-center text-lg font-semibold 
            bg-cyan-600 hover:bg-cyan-700 
            px-6 py-3 rounded-xl transition gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <HugeiconsIcon icon={BookIcon} className="w-6 h-6" />
                Favorites
              </Link>

              <Link
                to="/create-novel"
                className="w-3/4 text-center text-lg font-semibold 
                          bg-blue-600 hover:bg-blue-700 
                          px-6 py-3 rounded-xl transition"
                onClick={() => setMenuOpen(false)}
              >
                Upload New Novel
              </Link>

              {/* User Section */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center space-y-2 pt-2"
              >
                <UserButton />
                <p className="text-sm text-gray-300">User</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
