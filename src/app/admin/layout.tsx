"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <AdminSidebar
                isCollapsed={isCollapsed}
                onToggle={() => setIsCollapsed(!isCollapsed)}
            />
            <div
                className={`transition-all duration-300 min-h-screen ${isCollapsed ? "pl-16" : "pl-[220px]"
                    }`}
            >
                {children}
            </div>
        </div>
    );
}
