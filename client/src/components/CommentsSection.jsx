// src/components/CommentsSection.jsx
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getComments, addComment } from "../api/commentapi.js";
import ClipLoader from "react-spinners/ClipLoader";

const CommentsSection = ({ novelId, chapterId }) => {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments({ novelId, chapterId });
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };
    if (novelId || chapterId) fetchComments();
  }, [novelId, chapterId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const savedComment = await addComment({
        userId: user?.id,
        userName:
          user?.fullName ||
          user?.username ||
          user?.primaryEmailAddress?.emailAddress ||
          "",
        novelId,
        chapterId,
        content: newComment,
      });
      setComments((prev) => [savedComment, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <ClipLoader color="#000" />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {user && (
        <form onSubmit={handleAddComment} className="mb-6">
          <textarea
            className="w-full p-2 border rounded-lg text-black"
            rows="3"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Post Comment
          </button>
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-800 text-white p-3 rounded-lg shadow"
            >
              <p className="font-semibold">{comment.userName || "Anonymous"}</p>
              <p className="text-gray-300">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
