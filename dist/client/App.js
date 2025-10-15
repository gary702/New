import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DocumentationPage from './components/DocumentationPage';
import CreateDocument from './components/CreateDocument';
import './App.css';
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/document/:id", element: _jsx(DocumentationPage, {}) }), _jsx(Route, { path: "/create", element: _jsx(CreateDocument, {}) })] }) }));
}
export default App;
