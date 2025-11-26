export async function register() {
    // 起動確認用のログを追加
    console.log("🔍 Register function triggered");

    if (
        process.env.NEXT_RUNTIME === "nodejs" &&
        process.env.NODE_ENV === "development"
    ) {
        const { server } = await import("./server");
        server.listen({
            onUnhandledRequest: "bypass",
        });
        console.log("✅ MSW Server listening");
    }
}
