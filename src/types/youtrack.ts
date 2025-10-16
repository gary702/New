export interface YouTrackTicket {
  id: string;
  summary: string;
  description: string;
  created: string;
  updated: string;
}

export interface DocumentationEntry {
  title: string;
  content: string;
  created: string;
  updated: string;
  ticketId: string;
}