import { HttpResponse, http, type RequestHandler } from "msw";

const USERS = [
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
        content: "型安全で開発しやすいですね。tRPCとPrismaの組み合わせが最高!",
        likes: 3,
        likedBy: [1],
        comments: [],
        createdAt: "2024-11-17 09:15",
    },
];

//モックの定義
const fetchUsersHandler = http.get("http://internal-api/users", () => {
    return HttpResponse.json(USERS);
});
const fetchPostsHandler = http.post(
    "http://internal-api/posts",
    async ({ request }) => {
        const body = (await request.json()) as any;
        const newPost = {
            ...body,
            id: Math.floor(Math.random() * 10000), // ランダムなID
            likes: 0,
            likedBy: [],
            comments: [],
            createdAt: new Date().toLocaleString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            }),
        };
        // USERS.unshift(newPost); // stateで管理するためコメントアウト
        return HttpResponse.json({
            message: "created",
            post: newPost,
        });
    },
);
const postCommentHandler = http.post(
    "http://internal-api/posts/:postId/comments",
    async ({ params, request }) => {
        const { postId } = params;
        const body = (await request.json()) as any;

        // const postIndex = USERS.findIndex((p) => p.id === Number(postId));

        // if (postIndex === -1) {
        //     return new HttpResponse(null, { status: 404 });
        // }

        const newComment = {
            ...body,
            id: Math.floor(Math.random() * 10000),
            createdAt: new Date().toLocaleString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        // USERS[postIndex].comments.push(newComment); // stateで管理するためコメントアウト

        return HttpResponse.json({
            message: "comment created",
            comment: newComment,
        });
    },
);

export const handlers: RequestHandler[] = [
    fetchUsersHandler,
    fetchPostsHandler,
    postCommentHandler,
];
