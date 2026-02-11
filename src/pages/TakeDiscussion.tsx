import { useParams, Link, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { RatingStars } from "@/components/RatingStars";
import { UserAvatar } from "@/components/UserAvatar";
import { AlbumCover } from "@/components/AlbumCover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Lock, Send } from "lucide-react";
import { useTakes } from "@/hooks/useTakes";
import { useThreadReplies } from "@/hooks/useThreadReplies";
import { getUserById, mockUsers } from "@/data/mockData";
import { useState } from "react";
import { toast } from "sonner";

const CURRENT_USER = mockUsers[0];

export default function TakeDiscussion() {
  const { takeId } = useParams<{ takeId: string }>();
  const navigate = useNavigate();
  const { allTakes, getUserTakeForAlbum } = useTakes();
  const rootTake = allTakes.find((t) => t.id === takeId);

  const { replies, addReply, toggleLike, isLiked } = useThreadReplies(takeId || "");
  const [replyText, setReplyText] = useState("");

  if (!rootTake) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto py-20 text-center">
          <p className="text-muted-foreground">Take not found</p>
          <Button variant="ghost" className="mt-4" onClick={() => navigate(-1)}>
            Go back
          </Button>
        </div>
      </AppLayout>
    );
  }

  const rootUser = getUserById(rootTake.userId);
  const canInteract = !!getUserTakeForAlbum(rootTake.album.id);

  const handleReply = () => {
    if (!replyText.trim()) return;
    addReply(
      rootTake.album.id,
      CURRENT_USER.id,
      CURRENT_USER.name,
      CURRENT_USER.avatar,
      replyText.trim()
    );
    setReplyText("");
    toast.success("Reply posted!");
  };

  const handleHeartGated = () => {
    toast.info("Post your take to react");
  };

  // Root take like count (optimistic via local state)
  const rootLikeCount = rootTake.likes + (isLiked(rootTake.id) ? 1 : 0);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto pb-20 lg:pb-0">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Root Take */}
        <div className="p-5 rounded-xl bg-card border border-primary mb-2">
          <div className="flex gap-3">
            <Link to={`/album/${rootTake.album.id}`} className="shrink-0">
              <AlbumCover
                src={rootTake.album.cover_image_url}
                alt={rootTake.album.title}
                className="w-14 h-14 rounded-lg"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Link to={`/user/${rootTake.userId}`}>
                    <UserAvatar
                      name={rootUser?.name || "User"}
                      image={rootUser?.avatar}
                      size="sm"
                    />
                  </Link>
                  <div>
                    <Link
                      to={`/user/${rootTake.userId}`}
                      className="font-medium text-foreground hover:text-primary transition-colors text-sm"
                    >
                      {rootUser?.name || "User"}
                    </Link>
                    <span className="text-xs text-muted-foreground ml-2">
                      {rootTake.createdAt}
                    </span>
                  </div>
                </div>
                <RatingStars rating={rootTake.rating} size="sm" />
              </div>
              <Link
                to={`/album/${rootTake.album.id}`}
                className="block mt-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {rootTake.album.title}{" "}
                <span className="text-muted-foreground">
                  by {rootTake.album.artist}
                </span>
              </Link>
              <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
                {rootTake.comment}
              </p>
              <div className="mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground hover:text-primary"
                  onClick={() => {
                    if (!canInteract) return handleHeartGated();
                    toggleLike(rootTake.id);
                  }}
                >
                  <Heart
                    className={`w-4 h-4 mr-1 ${
                      isLiked(rootTake.id) ? "fill-primary text-primary" : ""
                    }`}
                  />
                  <span className="text-xs">{rootLikeCount}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Replies header */}
        <p className="text-xs text-muted-foreground mb-4 px-1">
          {replies.length} {replies.length === 1 ? "reply" : "replies"}
        </p>

        {/* Replies list */}
        <div className="space-y-3 mb-6">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="p-4 rounded-xl bg-card border border-border ml-6"
            >
              <div className="flex items-start gap-2">
                <UserAvatar
                  name={reply.userName}
                  image={reply.userAvatar}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-foreground">
                      {reply.userName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {reply.createdAt}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/90 leading-relaxed">
                    {reply.text}
                  </p>
                  <div className="mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-muted-foreground hover:text-primary"
                      onClick={() => {
                        if (!canInteract) return handleHeartGated();
                        toggleLike(reply.id);
                      }}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 mr-1 ${
                          isLiked(reply.id) ? "fill-primary text-primary" : ""
                        }`}
                      />
                      <span className="text-xs">{reply.likeCount}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reply input or gate */}
        {canInteract ? (
          <div className="flex gap-3 items-start">
            <UserAvatar
              name={CURRENT_USER.name}
              image={CURRENT_USER.avatar}
              size="sm"
            />
            <div className="flex-1 flex gap-2">
              <Textarea
                placeholder="Write a reply…"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value.slice(0, 500))}
                className="bg-card border-border focus:border-primary"
                rows={2}
              />
              <Button
                size="icon"
                disabled={!replyText.trim()}
                onClick={handleReply}
                className="shrink-0 bg-gradient-warm text-primary-foreground hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-xl bg-card border border-border text-center">
            <Lock className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-semibold text-foreground mb-1">
              Post your take to join the discussion
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              To comment on takes for this album, add your own take first.
            </p>
            <Button
              size="sm"
              onClick={() => navigate(`/album/${rootTake.album.id}`)}
              className="bg-gradient-warm text-primary-foreground hover:opacity-90"
            >
              Add your take
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
