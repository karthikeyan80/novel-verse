import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getFavorites } from "../api/favoriteapi";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const FavoritesPage = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites(user.id); // Clerk userId
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchFavorites();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#000" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">You haven’t added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((novel) => (
            <Link
              to={`/novels/${novel._id}`}
              key={novel._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{novel.title}</h2>
              <p className="text-sm text-gray-600">
                {novel.description?.substring(0, 100)}...
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
