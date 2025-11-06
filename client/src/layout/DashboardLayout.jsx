import { useState } from "react";
import Sidebar from "../components/DashboardSidebar";

export default function DashboardLayout({ title, children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-gray-800">
        
            {/* Mobile toggle button */}
            <button
                className="lg:hidden fixed top-4 right-4 z-50 bg-blue-600 text-white p-2 rounded"
                onClick={() => setOpen(true)}
            >
                ☰
            </button>

            {/* Sidebar */}
            <Sidebar isOpen={open} onClose={() => setOpen(false)} />

            {/* Main content */}
            <div className="flex-1 p-4 lg:ml-0 mt-16">
                <h1 className="text-2xl font-bold mb-4 dark:text-white">{title}</h1>
                <div className="bg-white dark:bg-gray-900 p-4 shadow rounded">
                    {children}
                </div>
            </div>
        </div>
    );
}