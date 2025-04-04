import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  usePostCommentMutation,
  useGetCommentsQuery,
} from "../app/Services/commentsApi";
import { useGetRoomQuery } from "../app/Services/roomsApi";

const getRandomColor = (name) => {
  const colors = [
    "bg-rose-500",
    "bg-fuchsia-500",
    "bg-emerald-500",
    "bg-amber-400",
    "bg-violet-500",
    "bg-cyan-400",
    "bg-orange-400",
    "bg-lime-400",
  ];

  const charCode = name.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
};

const getInitials = (name) => {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
};

const CommentsSection = ({ roomName }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [postComment, { isLoading: postLoading }] = usePostCommentMutation();
  const userDetails = useSelector((state) => state.auth.user);

  const { data: room, isLoading: roomLoading } = useGetRoomQuery(roomName, {
    skip: !roomName,
  });
  const [nextToken, setNextToken] = useState(null);

  const {
    data: commentsData,
    isLoading: commentsLoading,
    refetch: refetchComments,
  } = useGetCommentsQuery({ roomId: room?.id }, { skip: !room?.id });

  const { refetch: fetchMore } = useGetCommentsQuery(
    { roomId: room?.id, token: nextToken },
    { skip: !nextToken || !room?.id }
  );

  useEffect(() => {
    if (commentsData) {
      setComments(commentsData.comments || []);
      setNextToken(commentsData.nextToken);
    }
  }, [commentsData]);

  const loadMoreComments = async () => {
    if (!nextToken || !room?.id) return;

    try {
      const result = await fetchMore();
      if (result.data) {
        setComments((prevComments) => [
          ...prevComments,
          ...(result.data.comments || []),
        ]);
        setNextToken(result.data.nextToken);
      }
    } catch (error) {
      console.error("Error loading more comments", error);
    }
  };

  const handleSendMessage = async () => {
    if (!comment.trim() || !room?.id) return;

    const tempId = `temp-${Date.now()}`;

    const newComment = {
      id: tempId,
      user_name: userDetails.name,
      comment,
      created_at: "Sending...",
      pending: true,
    };

    setComments([newComment, ...comments]);
    setComment("");

    try {
      const data = await postComment({
        roomId: room.id,
        commentData: { comment },
      }).unwrap();

      setComments((prev) =>
        prev.map((c) =>
          c.id === tempId
            ? {
                ...c,
                id: data.id,
                created_at: new Date().toLocaleString(),
                pending: false,
              }
            : c
        )
      );
    } catch (error) {
      console.error("Error posting comment:", error);
      setComments((prev) => prev.filter((c) => c.id !== tempId));
    }
  };

  const formatTimestamp = (dateString) => {
    if (!dateString || dateString === "Sending...") return "Sending...";

    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.floor((now - date) / 1000);

    if (diffSeconds < 60) return "Just now";
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
    if (diffSeconds < 604800) return `${Math.floor(diffSeconds / 86400)}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="bg-gray mt-4 mx-2 flex items-start space-x-4 px-1 sticky top-0 z-10">
        <div className="shrink-0">
          <div
            className={`flex items-center justify-center size-10 rounded-full text-white font-semibold ${getRandomColor(
              userDetails.name || "you"
            )}`}
          >
            {getInitials(userDetails?.name || "You")}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <div className="pb-px">
              <label htmlFor="comment" className="sr-only">
                Add your comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment..."
                className="block w-full resize-none text-base text-gray-900 rounded-md placeholder:text-gray-400 sm:text-sm/6"
              />
            </div>
            <div className="flex justify-end pt-2">
              <div className="shrink-0">
                <button
                  type="submit"
                  disabled={!room?.id || postLoading}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
                >
                  {postLoading ? "Posting..." : "Post comment"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="px-2 overflow-y-auto max-h-screen overflow-hidden scrollbar-hide">
        {roomLoading || commentsLoading ? (
          <div className="flex justify-center py-4">
            <p className="text-gray-400">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="flex justify-center py-4">
            <p className="text-gray-400">No comments found</p>
          </div>
        ) : (
          <>
            <ul role="list">
              {comments.map((comment) => (
                <li key={comment.id} className="flex gap-x-4 py-2">
                  <div
                    className={`flex items-center justify-center size-8 flex-none rounded-full text-white font-semibold ${getRandomColor(
                      comment.user_name
                    )}`}
                  >
                    {getInitials(comment.user_name)}
                  </div>
                  <div className="flex-auto">
                    <div className="flex items-baseline justify-between gap-x-4">
                      <p className="text-sm/6 font-semibold text-white-900">
                        {comment.user_name}
                      </p>
                      <p className="flex-none text-xs text-gray-600">
                        <time dateTime={comment.created_at}>
                          {comment.pending
                            ? "Sending..."
                            : formatTimestamp(comment.created_at)}
                        </time>
                      </p>
                    </div>
                    <p
                      className={`mt-1 line-clamp-2 text-sm/6 text-left ${
                        comment.pending ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {comment.comment}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            {nextToken && (
              <div className="flex justify-center mt-4">
                <button
                  className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  onClick={loadMoreComments}
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CommentsSection;
