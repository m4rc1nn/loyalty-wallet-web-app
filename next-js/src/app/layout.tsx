import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LoyaltyApp",
    description: "Wirtualne karty lojalnościowe dla Twoich klientów",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl">
            <body className={`${inter.className} min-h-screen dark bg-gray-50 dark:bg-gray-900`}>
                <Header />
                {children}
            </body>
        </html>
    );
}
