import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <div className="text-center mt-10 p-4">
      <h1 className="text-3xl font-bold">📚 Welcome to Novel Verse</h1>

      <SignedOut>
        <div className="flex justify-center gap-10 mt-10">
          <SignIn />
        </div>
      </SignedOut>

      <SignedIn>
        <div className="mt-6">
          <p>You are signed in!</p>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}

export default App;
