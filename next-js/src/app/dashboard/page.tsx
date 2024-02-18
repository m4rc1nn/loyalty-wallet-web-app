"use client";

import { useEffect } from "react";
import { useCompanyAuth } from "../context/CompanyAuthContext";

export default function DashboardPage() {
    const { checkSession } = useCompanyAuth();
    useEffect(() => {
        checkSession(true);
    }, []);
    return <h1>Dashboard</h1>;
}
