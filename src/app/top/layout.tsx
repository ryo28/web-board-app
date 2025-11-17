import { Header } from "./_components/Header";

export default function topLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    );
}
