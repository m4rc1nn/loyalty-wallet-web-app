import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Inter } from "next/font/google";
import { CompanyAuthProvider } from "../context/CompanyAuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
