import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DocumentationPage from './components/DocumentationPage';
import CreateDocument from './components/CreateDocument';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/document/:id" element={<DocumentationPage />} />
        <Route path="/create" element={<CreateDocument />} />
      </Routes>
    </Router>
  );
}

export default App;
