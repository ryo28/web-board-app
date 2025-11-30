"use client";
import { Clock, Heart, LogIn, MessageCircle, Send, User } from "lucide-react";
import { useState } from "react";
import type { TypePost } from "@/lib/data";
import type { TypeUser } from "../type";
import { HandleCommentButton } from "./HandleCommentButton";
import { HandleLikeButton } from "./HandleLikeButton";

export function MainContent({ data }: { data: TypePost[] }) {
    // ユーザー情報の状態管理は今後ログイン機能実装時に置き換え予定なので仮実装
    const [currentUser, setCurrentUser] = useState<TypeUser | null>({
        id: 1,
        name: "山田太郎",
    });

    const [posts, setPosts] = useState<TypePost[]>(data || []);
    const [loading, setLoading] = useState(false);

    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [commentInputs, setCommentInputs] = useState<{
        [key: number]: string;
    }>({});
    const [showComments, setShowComments] = useState<{
        [key: number]: boolean;
    }>({});

    // ログイン/ログアウト
    const handleLogin = () => {
        setCurrentUser({ id: 1, name: "山田太郎" });
    };

    // 投稿追加
    const handleSubmit = async () => {
        if (!currentUser || !newTitle.trim() || !newContent.trim()) return;

        try {
            const response = await fetch("http://internal-api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: currentUser.id,
                    userName: currentUser.name,
                    title: newTitle,
                    content: newContent,
                }),
            });

            if (response.ok) {
                const newPost = await response.json();
                setNewTitle("");
                setNewContent("");
                // 新しい投稿を先頭に追加
                setPosts([newPost.post, ...posts]);
            } else {
                console.error("投稿の作成に失敗しました");
            }
        } catch (error) {
            console.error("投稿の作成中にエラーが発生しました:", error);
        }
    };

    // コメント追加後の状態更新
    const handleCommentAdded = (postId: number, newComment: any) => {
        setPosts(
            posts.map((post) =>
                post.id === postId
                    ? {
                          ...post,
                          comments: [...post.comments, newComment],
                      }
                    : post,
            ),
        );
    };

    // コメント表示切り替え
    const toggleComments = (postId: number) => {
        setShowComments({ ...showComments, [postId]: !showComments[postId] });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
            <main className="mx-auto max-w-4xl px-4 py-8">
                {/* 投稿フォーム */}
                {currentUser && (
                    <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
                        <h2 className="mb-4 flex items-center gap-2 font-semibold text-slate-800 text-xl">
                            <Send className="h-5 w-5 text-blue-600" />
                            新規投稿
                        </h2>
                        <div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) =>
                                        setNewTitle(e.target.value)
                                    }
                                    placeholder="タイトルを入力"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    value={newContent}
                                    onChange={(e) =>
                                        setNewContent(e.target.value)
                                    }
                                    placeholder="内容を入力"
                                    rows={4}
                                    className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
                            >
                                <Send className="h-5 w-5" />
                                投稿する
                            </button>
                        </div>
                    </div>
                )}

                {/* ログインを促すメッセージ */}
                {!currentUser && (
                    <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6 text-center">
                        <p className="mb-2 text-slate-700">
                            投稿するにはログインが必要です
                        </p>
                        <button
                            type="button"
                            onClick={handleLogin}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                        >
                            <LogIn className="h-5 w-5" />
                            ログイン
                        </button>
                    </div>
                )}

                {/* 投稿一覧 */}
                <div className="space-y-4">
                    <h2 className="mb-4 font-bold text-2xl text-slate-800">
                        投稿一覧
                    </h2>
                    {loading ? (
                        <div className="py-8 text-center">
                            <p className="text-slate-600">読み込み中...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="py-8 text-center">
                            <p className="text-slate-600">
                                まだ投稿がありません
                            </p>
                        </div>
                    ) : (
                        <div>
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-md"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600 shadow-md">
                                            <User className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-2 flex items-center gap-3">
                                                <h3 className="font-semibold text-slate-900">
                                                    {post.userName}
                                                </h3>
                                                <div className="flex items-center gap-1 text-slate-500 text-sm">
                                                    <Clock className="h-4 w-4" />
                                                    <span>
                                                        {post.createdAt}
                                                    </span>
                                                </div>
                                            </div>
                                            <h4 className="mb-2 font-bold text-lg text-slate-800">
                                                {post.title}
                                            </h4>
                                            <p className="mb-4 text-slate-700 leading-relaxed">
                                                {post.content}
                                            </p>

                                            {/* アクションボタン */}
                                            <div className="mb-4 flex items-center gap-4">
                                                {/* <HandleLikeButton post={post} currentUser={currentUser} setPosts={setPosts} /> */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleComments(post.id)
                                                    }
                                                    className="flex items-center gap-1 text-slate-600 transition-colors hover:text-blue-500"
                                                >
                                                    <MessageCircle className="h-5 w-5" />
                                                    <span className="font-medium text-sm">
                                                        {post.comments.length}
                                                    </span>
                                                </button>
                                            </div>

                                            {/* コメントセクション */}
                                            {showComments[post.id] && (
                                                <div className="mt-4 border-slate-200 border-t pt-4">
                                                    {/* コメント一覧 */}
                                                    {post.comments.length >
                                                        0 && (
                                                        <div className="mb-4 space-y-3">
                                                            {post.comments.map(
                                                                (comment) => (
                                                                    <div
                                                                        key={
                                                                            comment.id
                                                                        }
                                                                        className="rounded-lg bg-slate-50 p-3"
                                                                    >
                                                                        <div className="mb-1 flex items-center gap-2">
                                                                            <span className="font-semibold text-slate-700 text-sm">
                                                                                {
                                                                                    comment.userName
                                                                                }
                                                                            </span>
                                                                            <span className="text-slate-500 text-xs">
                                                                                {
                                                                                    comment.createdAt
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-slate-600 text-sm">
                                                                            {
                                                                                comment.content
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* コメント入力 */}
                                                    {currentUser && (
                                                        // <div className="flex gap-2">
                                                        //     <input
                                                        //         type="text"
                                                        //         value={
                                                        //             commentInputs[
                                                        //                 post.id
                                                        //             ] || ""
                                                        //         }
                                                        //         onChange={(e) =>
                                                        //             setCommentInputs(
                                                        //                 {
                                                        //                     ...commentInputs,
                                                        //                     [post.id]:
                                                        //                         e
                                                        //                             .target
                                                        //                             .value,
                                                        //                 },
                                                        //             )
                                                        //         }
                                                        //         placeholder="コメントを入力"
                                                        //         className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                                        //     />
                                                        //     <button
                                                        //         type="button"
                                                        //         onClick={() =>
                                                        //             handleAddComment(
                                                        //                 post.id,
                                                        //             )
                                                        //         }
                                                        //         className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-sm text-white transition hover:bg-blue-700"
                                                        //     >
                                                        //         送信
                                                        //     </button>
                                                        // </div>
                                                        <HandleCommentButton
                                                            currentUser={
                                                                currentUser
                                                            }
                                                            commentInputs={
                                                                commentInputs
                                                            }
                                                            postId={post.id}
                                                            setCommentInputs={
                                                                setCommentInputs
                                                            }
                                                            onCommentAdded={
                                                                handleCommentAdded
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
