"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useCookies } from "next-client-cookies";
import axios from "axios";
import { Company } from "../types/Company";
import { useRouter } from "next/navigation";

type CompanyAuthContextType = {
    company: Company | null;
    setCompany: (company: Company) => void;
    checkSession: (redirect: boolean) => void;
    isLoading: boolean;
};

const CompanyAuthContext = createContext<CompanyAuthContextType | null>(null);

export function CompanyAuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const cookies = useCookies();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [company, setCompany] = useState<Company | null>(null);

    const checkSession = async (redirect: boolean) => {
        setIsLoading(true);
        try {
            const token = cookies.get("auth_token") as string;
            if (token === undefined) return router.push(process.env.NEXT_PUBLIC_URL + "/login");
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/company/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response && response.data.status === "SUCCESS") {
                if (redirect) {
                    return router.push(process.env.NEXT_PUBLIC_URL + "/dashboard");
                }
                const companyResponse: Company = {
                    id: response.data.id,
                    email: response.data.email,
                    type: response.data.type,
                    isActive: response.data.isActive,
                    name: response.data.name,
                    authToken: token,
                };
                setCompany(companyResponse);
            } else {
                return router.push(process.env.NEXT_PUBLIC_URL + "/login");
            }
        } catch (error) {
            return router.push(process.env.NEXT_PUBLIC_URL + "/login");
        }
    };

    return (
        <CompanyAuthContext.Provider value={{ company, setCompany, checkSession, isLoading }}>
            {children}
        </CompanyAuthContext.Provider>
    );
}

export const useCompanyAuth = () => {
    const context = useContext(CompanyAuthContext);
    if (!context) {
        throw new Error("useCompanyAuth must be used within an CompanyAuthProvider");
    }
    return context;
};
