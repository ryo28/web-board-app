// クライアントサイドで使用するヘルパー関数
export async function handleAddComment(
    postId: number,
    currentUserId: number,
    currentUserName: string,
    content: string,
) {
    try {
        const response = await fetch(
            `http://internal-api/posts/${postId}/comments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: currentUserId,
                    userName: currentUserName,
                    content: content,
                }),
            },
        );

        if (response.ok) {
            const data = await response.json();
            return { success: true, comment: data.comment };
        } else {
            console.error("コメントの追加に失敗しました");
            return { success: false };
        }
    } catch (error) {
        console.error("コメント追加中にエラーが発生しました:", error);
        return { success: false };
    }
}
