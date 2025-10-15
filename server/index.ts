import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getYouTrackIssues } from './youtrack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '..' ,'..', 'dist')));

interface Document {
  id: number;
  title: string;
  content: string;
}

let documents: Document[] = [
  { id: 1, title: 'Document 1', content: 'This is the content of document 1.' },
  { id: 2, title: 'Document 2', content: 'This is the content of document 2.' },
  { id: 3, title: 'Document 3', content: 'This is the content of document 3.' },
];

app.get('/api/documents', (_req: Request, res: Response) => {
  res.json(documents);
});

app.get('/api/documents/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const document = documents.find((doc) => doc.id === id);
  if (document) {
    res.json(document);
  } else {
    res.status(404).send('Document not found');
  }
});

app.post('/api/documents', (req: Request, res: Response) => {
  const { title, content } = req.body;
  const newDocument: Document = {
    id: documents.length + 1,
    title,
    content,
  };
  documents.push(newDocument);
  res.status(201).json(newDocument);
});

app.get('/api/youtrack-issues', async (req: Request, res: Response) => {
  try {
    const issues = await getYouTrackIssues();
    res.json(issues);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to fetch YouTrack issues');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..' ,'..', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});