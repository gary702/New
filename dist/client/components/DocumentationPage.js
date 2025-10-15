import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const DocumentationPage = () => {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    useEffect(() => {
        if (id) {
            fetch(`/api/documents/${id}`)
                .then((res) => res.json())
                .then((data) => setDocument(data));
        }
    }, [id]);
    if (!document) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsxs("div", { children: [_jsx("h1", { children: document.title }), _jsx("p", { children: document.content }), _jsx("h2", { children: "History" }), _jsxs("ul", { children: [_jsx("li", { children: "Change 1" }), _jsx("li", { children: "Change 2" }), _jsx("li", { children: "Change 3" })] })] }));
};
export default DocumentationPage;
