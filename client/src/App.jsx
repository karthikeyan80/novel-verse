import {
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import NovelForm from './pages/NovelForm';
import NovelList from './components/NovelList';
import NovelDetails from './pages/NovelDetails';
import { Route, Routes, Link } from "react-router-dom";
import AddChapter from "./pages/AddChapter";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white flex flex-col">
      <header className="text-center p-6">
        <h1 className="text-4xl font-extrabold mb-2">Novel Verse</h1>
        <p className="text-gray-300">Read, Create, and Explore Novels</p>
      </header>

      <main className="flex-1">
        {/* Signed Out State */}
        <SignedOut>
          <div className="flex justify-center items-center min-h-[60vh]">
            <SignIn />
          </div>
        </SignedOut>

        {/* Signed In State */}
        <SignedIn>
          <div className="flex justify-center space-x-8 items-center mb-6">
            <p className="text-lg font-semibold">You are signed in!</p>
            <UserButton />
          </div>

          <Routes>
            {/* Home page: NovelList + button to go to create page */}
            <Route
              path="/"
              element={
                <div className="flex flex-col p-6 space-y-8 ">
                  <div className="flex justify-center mb-4">
                    <Link
                      to="/create-novel"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                    >
                      Upload New Novel
                    </Link>
                  </div>
                  <NovelList />
                </div>
              }
            />

            {/* Novel creation form page */}
            <Route path="/create-novel" element={<NovelForm />}  />
           

            {/* Details page */}
           <Route path="/novels/:id" element={<NovelDetails />} />

            <Route path="/novels/:id/add-chapter" element={<AddChapter />} />
          </Routes>
        </SignedIn>
      </main>
    </div>
  );
};

export default App;
