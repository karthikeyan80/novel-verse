// App.jsx
import {
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import NovelForm from './components/NovelForm';
import NovelList from './components/NovelList';
import NovelDetails from './pages/NovelDetails';
import { Route, Routes } from "react-router-dom";

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
            {/* Home page with form + list */}
            <Route
              path="/"
              element={
                <div className="flex flex-col p-6 space-y-8">
                  <div className="flex flex-1/3 justify-center">
                    <NovelForm />
                  </div>
                  <NovelList />
                </div>
              }
            />

            {/* Details page */}
            <Route path="/novels/:id" element={<NovelDetails />} />
          </Routes>
        </SignedIn>
      </main>
    </div>
  );
};

export default App;
