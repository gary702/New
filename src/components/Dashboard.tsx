import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Document {
  id: number;
  title: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    fetch('/api/documents')
      .then((res) => res.json())
      .then((data) => setDocuments(data));
  }, []);

  return (
    <div>
      <h1>Product Documentation Hub</h1>
      <p>Your single source of truth for product and feature information.</p>
      <input type="text" placeholder="Search for a document..." />
      <Link to="/create">
        <button>Create New Document</button>
      </Link>
      <h2>Recent Documents</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            <Link to={`/document/${doc.id}`}>{doc.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
