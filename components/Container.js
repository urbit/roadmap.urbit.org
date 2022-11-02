import React from "react";

export default function Container({ children }) {
    return (
        <div className="flex flex-col min-h-screen w-screen max-w-full items-center bg-white">
            {children}
        </div>
    );
}
