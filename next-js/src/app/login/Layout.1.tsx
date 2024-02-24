import { CookiesProvider } from "next-client-cookies/server";
import { CompanyAuthProvider } from "../context/CompanyAuthContext";
import { Header } from "@/components/Header";
import { inter } from "./layout";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 dark`}>
                <CookiesProvider>
                    <CompanyAuthProvider>
                        <Header />
                        {children}
                        <Footer />
                    </CompanyAuthProvider>
                </CookiesProvider>
            </body>
        </html>
    );
}
