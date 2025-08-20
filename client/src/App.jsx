import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import NovelList from "./components/NovelList";
import NovelForm from "./pages/NovelForm";
import NovelDetails from "./pages/NovelDetails";
import AddChapter from "./pages/AddChapter";
import ChapterDetails from "./pages/ChapterDetails";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white flex flex-col">
      <main className="flex flex-col flex-1">
        {/* Signed Out State */}
       <SignedOut>
      <div className="flex justify-center items-center flex-1">
        <SignIn
  appearance={{
    elements: {
      card: "clerk-card", // custom class
    },
  }}
/>

      </div>
    </SignedOut>

        

        {/* Signed In State */}
        <SignedIn>
          <Navbar />
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
            <Route path="/chapters/:id" element={<ChapterDetails />} />
          </Routes>
        </SignedIn>
      </main>
    </div>
  );
};

export default App;
