"use client";
import { LogIn, LogOut, MessageSquare, User } from "lucide-react";
import { useState } from "react";

type TypeUser = {
    id: number;
    name: string;
};

export function Header() {
    // ユーザー情報の状態管理は今後ログイン機能実装時に置き換え予定なので仮実装
    const [currentUser, setCurrentUser] = useState<TypeUser | null>({
        id: 1,
        name: "山田太郎",
    });
    const handleLogout = () => {
        setCurrentUser(null);
    };

    // ログイン/ログアウト
    const handleLogin = () => {
        setCurrentUser({ id: 1, name: "山田太郎" });
    };
    return (
        <div>
            {/* ヘッダー */}
            <header className="border-slate-200 border-b bg-white shadow-sm">
                <div className="mx-auto max-w-4xl px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <MessageSquare className="h-8 w-8 text-blue-600" />
                            <h1 className="font-bold text-3xl text-slate-800">
                                掲示板アプリ
                            </h1>
                        </div>
                        {currentUser ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2">
                                    <User className="h-5 w-5 text-blue-600" />
                                    <span className="font-medium text-slate-700 text-sm">
                                        {currentUser.name}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span className="font-medium text-sm">
                                        ログアウト
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={handleLogin}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                            >
                                <LogIn className="h-5 w-5" />
                                <span className="font-medium text-sm">
                                    ログイン
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}
