import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LoyaltyApp - Zarejestruj nową firę",
    description: "Wirtualne karty lojalnościowe dla Twoich klientów",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 dark`}>
                <CookiesProvider>{children}</CookiesProvider>
            </body>
        </html>
    );
}
