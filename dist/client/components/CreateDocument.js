import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CreateDocument = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/documents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        })
            .then((res) => res.json())
            .then(() => {
            navigate('/');
        });
    };
    return (_jsxs("div", { children: [_jsx("h1", { children: "Create New Document" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("label", { htmlFor: "title", children: "Title" }), _jsx("input", { type: "text", id: "title", value: title, onChange: (e) => setTitle(e.target.value) }), _jsx("label", { htmlFor: "content", children: "Content" }), _jsx("textarea", { id: "content", value: content, onChange: (e) => setContent(e.target.value) }), _jsx("button", { type: "submit", children: "Create" })] })] }));
};
export default CreateDocument;
