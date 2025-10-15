import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Document {
  id: number;
  title: string;
  content: string;
}

const DocumentationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/documents/${id}`)
        .then((res) => res.json())
        .then((data) => setDocument(data));
    }
  }, [id]);

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{document.title}</h1>
      <p>{document.content}</p>
      <h2>History</h2>
      <ul>
        <li>Change 1</li>
        <li>Change 2</li>
        <li>Change 3</li>
      </ul>
    </div>
  );
};

export default DocumentationPage;
