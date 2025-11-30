import { handleAddComment } from "../_actions/handleAddComment";
import type { TypeUser } from "../type";

export function HandleCommentButton({
    currentUser,
    commentInputs,
    postId,
    setCommentInputs,
    onCommentAdded,
}: {
    currentUser: TypeUser | null;
    commentInputs: { [key: number]: string };
    postId: number;
    setCommentInputs: React.Dispatch<
        React.SetStateAction<{ [key: number]: string }>
    >;
    onCommentAdded: (postId: number, newComment: any) => void;
}) {
    const isEmpty = !commentInputs[postId]?.trim();

    const handleSubmit = async () => {
        if (!currentUser || isEmpty) return;

        const result = await handleAddComment(
            postId,
            currentUser.id,
            currentUser.name,
            commentInputs[postId],
        );

        if (result.success) {
            onCommentAdded(postId, result.comment);
            setCommentInputs({ ...commentInputs, [postId]: "" });
        }
    };

    return (
        <div className="flex gap-2">
            <input
                type="text"
                value={commentInputs[postId] || ""}
                onChange={(e) =>
                    setCommentInputs({
                        ...commentInputs,
                        [postId]: e.target.value,
                    })
                }
                placeholder="コメントを入力"
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isEmpty}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-sm text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                送信
            </button>
        </div>
    );
}
