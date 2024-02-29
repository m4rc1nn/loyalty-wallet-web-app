"use client"

import { MainSection } from "@/components/dashboard/dashboard/main-section/MainSection";
import { useCompanyAuth } from "../context/CompanyAuthContext";
import { useEffect } from "react";

export default function DashboardPage() {
    const {checkSession} = useCompanyAuth();
    useEffect(() => {
        checkSession(true);
    })
    return (
        <MainSection />
    );
}
