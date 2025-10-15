import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Dashboard = () => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        fetch('/api/documents')
            .then((res) => res.json())
            .then((data) => setDocuments(data));
    }, []);
    return (_jsxs("div", { children: [_jsx("h1", { children: "Product Documentation Hub" }), _jsx("p", { children: "Your single source of truth for product and feature information." }), _jsx("input", { type: "text", placeholder: "Search for a document..." }), _jsx(Link, { to: "/create", children: _jsx("button", { children: "Create New Document" }) }), _jsx("h2", { children: "Recent Documents" }), _jsx("ul", { children: documents.map((doc) => (_jsx("li", { children: _jsx(Link, { to: `/document/${doc.id}`, children: doc.title }) }, doc.id))) })] }));
};
export default Dashboard;
