export interface Document {
  id: string;
  title: string;
  content: string;
  lastUpdated: string;
  type: 'product' | 'feature';
}

export interface SearchQuery {
  query: string;
  type?: 'product' | 'feature';
}