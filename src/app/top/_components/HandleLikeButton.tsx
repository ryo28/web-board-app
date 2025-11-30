import { Heart } from "lucide-react";

export function HandleLikeButton({ post, currentUser, setPosts }) {
    return (
        <div>
            {/* アクションボタン */}
            <form
                action={() =>
                    likeMutation.mutate({
                        postId: post.id,
                        userId: currentUser.id,
                    })
                }
                className="mb-4 flex items-center gap-4"
            >
                <button
                    type="button"
                    disabled={!currentUser}
                    className={`flex items-center gap-1 transition-colors ${
                        currentUser && post.likedBy.includes(currentUser.id)
                            ? "text-red-500"
                            : "text-slate-600 hover:text-red-500"
                    } ${!currentUser ? "cursor-not-allowed opacity-50" : ""}`}
                >
                    <Heart
                        className={`h-5 w-5 ${currentUser && post.likedBy.includes(currentUser.id) ? "fill-current" : ""}`}
                    />
                    <span className="font-medium text-sm">{post.likes}</span>
                </button>
            </form>
        </div>
    );
}
