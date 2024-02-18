import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Inter } from "next/font/google";
import { CompanyAuthProvider } from "../context/CompanyAuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LoyaltyApp - Panel firmy",
    description: "Wirtualne karty lojalnościowe dla Twoich klientów",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900 dark`}>
                <CookiesProvider>
                    <CompanyAuthProvider>{children}</CompanyAuthProvider>
                </CookiesProvider>
            </body>
        </html>
    );
}
