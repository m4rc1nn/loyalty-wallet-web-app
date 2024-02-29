import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Inter } from "next/font/google";
import { CompanyAuthProvider } from "../context/CompanyAuthContext";
import Sidebar from "@/components/dashboard/Sidebar";

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
                    <CompanyAuthProvider>
                        <Sidebar />
                        <main className="p-4 md:ml-64 h-auto">{children}</main>
                    </CompanyAuthProvider>
                </CookiesProvider>
            </body>
        </html>
    );
}
