import {
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import NovelForm from './components/NovelForm';
import NovelList from './components/NovelList';

const App = () => {
  return (
    <div className="text-center mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4">📚 Welcome to Novel Verse</h1>

      {/* Show sign-in form if user is signed out */}
      <SignedOut>
        <div className="flex justify-center gap-10 mt-10">
          <SignIn />
        </div>
      </SignedOut>

      {/* Show novel features if user is signed in */}
      <SignedIn>
        <div className="mb-4">
          <p className="text-lg">You are signed in!</p>
          <div className="flex justify-center my-4">
            <UserButton />
          </div>
        </div>

        {/* Novel Form and List */}
        <div className="max-w-xl mx-auto mt-10">
          <NovelForm />
          <NovelList />
        </div>
      </SignedIn>
    </div>
  );
};

export default App;
