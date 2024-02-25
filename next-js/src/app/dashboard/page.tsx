"use client";

import { useEffect } from "react";
import { useCompanyAuth } from "../context/CompanyAuthContext";
import Sidebar from "@/components/dashboard/Sidebar";
import { MainSection } from "@/components/dashboard/main-section/MainSection";

export default function DashboardPage() {
    const { checkSession } = useCompanyAuth();
    useEffect(() => {
        checkSession(true);
    }, []);
    return (
        <section>
            <Sidebar type="dashboard" />
            <MainSection />
        </section>
    );
}
