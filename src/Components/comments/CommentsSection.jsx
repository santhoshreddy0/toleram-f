import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetCommentsQuery,
  usePostCommentMutation,
} from "../../app/Services/commentsApi";
import { useGetRoomQuery } from "../../app/Services/roomsApi";
import moment from "moment";

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

const getDisplayName = (user) =>
  user?.name || (user?.email ? user.email : "You");

const getCommentAuthor = (comment) =>
  comment.name || (comment.email ? comment.email : "unanimous fan");

const CommentsSection = ({ title = "", description = "", roomName }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [postComment, { isLoading: postLoading }] = usePostCommentMutation();
  const userDetails = useSelector((state) => state.auth.user);
  const currentUserName = getDisplayName(userDetails);

  const { data: room, isLoading: roomLoading } = useGetRoomQuery(roomName, {
    skip: !roomName,
  });
  const [nextToken, setNextToken] = useState(null);

  const {
    data: commentsData,
    isLoading: commentsLoading,
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
      name: currentUserName,
      comment,
      created_at: "Sending...",
      pending: true,
    };

    setComments((prevComments) => [newComment, ...prevComments]);
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

  const formatTime = (date) => {
    return moment(date).from(moment.utc());
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-3 pb-8 pt-3 text-[#f4efe3] sm:px-4 sm:pb-10">
      <div className="relative overflow-hidden rounded-[28px] border border-[#f8d06f]/20 bg-[linear-gradient(145deg,#06101a_0%,#0b2135_52%,#08192b_100%)] shadow-[0_24px_60px_rgba(0,0,0,0.42)]">
        <div className="pointer-events-none absolute -left-20 top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(248,208,111,0.18)_0%,rgba(248,208,111,0)_72%)] blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-16 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(81,205,255,0.18)_0%,rgba(81,205,255,0)_72%)] blur-3xl" />

        <div className="relative border-b border-[#f8d06f]/14 px-4 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
          <div className="inline-flex items-center rounded-full border border-[#f8d06f]/30 bg-[#081523]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f8d06f] sm:text-[11px]">
            Fan Room
          </div>
          {title && (
            <h2 className="mt-4 text-left text-2xl font-black tracking-[0.04em] text-[#fff3d1] sm:text-3xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-2 max-w-2xl text-left text-sm leading-6 text-[#c9d6e6] sm:text-base">
              {description}
            </p>
          )}
          <div className="mt-5 h-px w-full bg-[linear-gradient(90deg,rgba(248,208,111,0)_0%,rgba(248,208,111,0.6)_20%,rgba(81,205,255,0.3)_80%,rgba(81,205,255,0)_100%)]" />
        </div>

        <div className="sticky top-[5.25rem] z-10 px-3 pt-3 sm:px-4">
          <div className="rounded-2xl border border-[#f8d06f]/18 bg-[linear-gradient(160deg,rgba(7,19,33,0.96)_0%,rgba(10,30,47,0.92)_55%,rgba(7,18,30,0.95)_100%)] p-3 shadow-[0_18px_36px_rgba(0,0,0,0.32)] backdrop-blur-md sm:p-4">
            <div className="flex items-start gap-3">
              <div className="shrink-0">
                <div
                  className={`flex size-11 items-center justify-center rounded-full text-sm font-black text-white ring-2 ring-white/10 ${getRandomColor(
                    currentUserName
                  )}`}
                >
                  {getInitials(currentUserName)}
                </div>
              </div>

              <div className="min-w-0 flex-1 text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f8d06f]">
                  Share your take with the room
                </p>
                <p className="mt-1 text-xs text-[#9fb1c9] sm:text-sm">
                  Keep it sharp, readable, and worth the scroll.
                </p>

                <form
                  className="mt-3"
                  action="#"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <div className="rounded-2xl border border-[#f8d06f]/16 bg-[#06111d]/88 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors focus-within:border-[#f8d06f]/40">
                    <label htmlFor="comment" className="sr-only">
                      Add your comment
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Drop your read on the action..."
                      className="block w-full resize-none border-0 bg-transparent p-0 text-sm leading-6 text-[#eef4ff] placeholder:text-[#6f849f] focus:outline-none focus:ring-0"
                    />
                  </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      type="submit"
                      disabled={!room?.id || postLoading}
                      className="inline-flex items-center justify-center rounded-full border border-[#f8d06f]/60 bg-gradient-to-r from-[#f8d06f] via-[#efbb58] to-[#e2ad45] px-5 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-[#1f1402] shadow-[0_14px_34px_rgba(248,208,111,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
                    >
                      {postLoading ? "Posting..." : "Post Comment"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 pb-4 pt-4 sm:px-4 sm:pb-5">
          {roomLoading || commentsLoading ? (
            <div className="rounded-2xl border border-[#f8d06f]/14 bg-[#071321]/78 px-6 py-10 text-center text-sm text-[#a8b8cc]">
              Loading the conversation...
            </div>
          ) : comments.length === 0 ? (
            <div className="rounded-2xl border border-[#f8d06f]/14 bg-[linear-gradient(160deg,rgba(7,19,33,0.92)_0%,rgba(8,24,38,0.85)_100%)] px-6 py-12 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f8d06f]">
                First voice in the room
              </p>
              <p className="mt-3 text-sm leading-6 text-[#cad7e7]">
                No discussions yet. Start the thread with a take worth
                backing.
              </p>
            </div>
          ) : (
            <>
              <ul role="list" className="space-y-3">
                {comments.map((commentItem) => {
                  const authorName = getCommentAuthor(commentItem);

                  return (
                    <li key={commentItem.id} className="list-none">
                      <article className="rounded-2xl border border-[#f8d06f]/12 bg-[linear-gradient(145deg,rgba(7,17,30,0.94)_0%,rgba(10,27,43,0.88)_55%,rgba(8,18,31,0.94)_100%)] p-4 text-left shadow-[0_14px_30px_rgba(0,0,0,0.24)] transition-colors duration-300 hover:border-[#f8d06f]/28 sm:p-5">
                        <div className="flex gap-3">
                          <div
                            className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white ring-2 ring-white/10 ${getRandomColor(
                              authorName
                            )}`}
                          >
                            {getInitials(authorName)}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                              <p className="text-sm font-bold tracking-[0.02em] text-[#fff1c7]">
                                {authorName}
                              </p>
                              <p className="text-xs text-[#8fa4bf]">
                                <time dateTime={commentItem.created_at}>
                                  {commentItem.pending
                                    ? "Sending..."
                                    : formatTime(commentItem.created_at)}
                                </time>
                              </p>
                            </div>

                            <p
                              className={`mt-3 whitespace-pre-wrap break-words text-sm leading-6 ${
                                commentItem.pending
                                  ? "text-[#8c9aae]"
                                  : "text-[#dbe6f4]"
                              }`}
                            >
                              {commentItem.comment}
                            </p>
                          </div>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
              {nextToken && (
                <div className="mt-5 flex justify-center">
                  <button
                    className="inline-flex items-center rounded-full border border-[#f8d06f]/32 bg-[#081523]/88 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f6df9f] transition-all duration-300 hover:border-[#f8d06f]/60 hover:bg-[#0d2237]"
                    onClick={loadMoreComments}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;
