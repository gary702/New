interface YouTrackTicket {
  id: string;
  summary: string;
  description: string;
  created: string;
  updated: string;
  // Add other YouTrack fields as needed
}

interface DocumentationEntry {
  title: string;
  content: string;
  created: string;
  updated: string;
  ticketId?: string;
}