"use client"

import { useCompanyAuth } from "@/app/context/CompanyAuthContext";
import { MainSection } from "@/components/dashboard/personalization/MainSection";
import { useEffect } from "react";

export default function PersonalizationPage() {
    const {checkSession} = useCompanyAuth();
    useEffect(() => {
        checkSession(false);
    })
    return (
        <MainSection />
    );
}
