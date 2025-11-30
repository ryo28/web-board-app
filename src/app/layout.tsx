import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "掲示板アプリ",
    description: "シンプルな掲示板アプリケーション",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    );
}
