import type { Metadata } from "next";
import "./globals.css";
import { MswProvider } from "@/components/MswProvider";

export const metadata: Metadata = {
    title: "掲示板アプリ",
    description: "シンプルな掲示板アプリケーション",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ja">
            <body>
                <MswProvider>{children}</MswProvider>
            </body>
        </html>
    );
}
