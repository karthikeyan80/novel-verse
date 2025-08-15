import {
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white flex flex-col">

      <main className="flex flex-col">
        {/* Signed Out State */}
        <SignedOut>
          <div className="flex justify-center items-center min-h-[60vh]">
            <SignIn />
          </div>
        </SignedOut>

        {/* Signed In State */}
        <SignedIn>
         <Navbar  />
        </SignedIn>
      </main>
    </div>
  );
};

export default App;
