import { POSTS } from "@/lib/data";
import { MainContent } from "./_components/MainContent";

export default async function BulletinBoard() {
    return (
        <div>
            <MainContent data={POSTS} />
        </div>
    );
}
