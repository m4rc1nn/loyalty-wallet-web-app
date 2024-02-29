"use client"

import { useCompanyAuth } from "@/app/context/CompanyAuthContext";
import { MainSection } from "@/components/dashboard/history/MainSection";
import { useEffect } from "react";

export default function HistoryPage() {
    const {checkSession} = useCompanyAuth();
    useEffect(() => {
        checkSession(false);
    })
    return (
        <MainSection />
    );
}
