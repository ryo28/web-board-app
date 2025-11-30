export type Comment = {
    id: number;
    userId: number;
    userName: string;
    content: string;
    createdAt: string;
};

export type TypePost = {
    id: number;
    userId: number;
    userName: string;
    title: string;
    content: string;
    likes: number;
    likedBy: number[];
    comments: Comment[];
    createdAt: string;
};

// データをメモリに保存（本来はデータベースを使用）
// eslint-disable-next-line import/no-mutable-exports
export const POSTS: TypePost[] = [
    {
        id: 1,
        userId: 1,
        userName: "山田太郎",
        title: "はじめての投稿",
        content: "Next.jsとTailwindCSSで掲示板を作ってみました！",
        likes: 5,
        likedBy: [2, 3],
        comments: [
            {
                id: 1,
                userId: 2,
                userName: "佐藤花子",
                content: "素晴らしいですね！",
                createdAt: "2024-11-17 10:35",
            },
        ],
        createdAt: "2024-11-17 10:30",
    },
    {
        id: 2,
        userId: 2,
        userName: "佐藤花子",
        title: "T3 Stackについて",
        content: "型安全で開発しやすいですね。tRPCとPrismaの組み合わせが最高！",
        likes: 3,
        likedBy: [1],
        comments: [],
        createdAt: "2024-11-17 09:15",
    },
];
