import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const UserSync = () => {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName || user.username || "No Name",
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to sync user");
        }

        const data = await res.json();
        console.log("✅ User synced successfully:", data);
      } catch (err) {
        console.error("❌ User sync failed:", err.message);
      }
    };

    // Run only when user logs in or signs up
    if (isSignedIn && user) {
      syncUser();
    }
  }, [isSignedIn, user]);

  return null; // no UI needed
};

export default UserSync;
