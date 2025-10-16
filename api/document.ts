import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import type { YouTrackTicket, DocumentationEntry } from '../src/types/youtrack';

const YOUTRACK_API_URL = process.env.YOUTRACK_API_URL || 'https://your-youtrack-instance.com/api';
const YOUTRACK_TOKEN = process.env.YOUTRACK_TOKEN;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { ticketId } = request.body;

  if (!ticketId) {
    return response.status(400).json({ error: 'ticketId is required' });
  }

  try {
    const ticketResponse = await fetch(`${YOUTRACK_API_URL}/issues/${ticketId}`, {
      headers: {
        'Authorization': `Bearer ${YOUTRACK_TOKEN}`,
        'Accept': 'application/json',
      },
    });

    if (!ticketResponse.ok) {
      throw new Error('Failed to fetch ticket details');
    }

    const ticketData = await ticketResponse.json() as YouTrackTicket;
    const docEntry: DocumentationEntry = {
      title: ticketData.summary,
      content: ticketData.description,
      created: ticketData.created,
      updated: ticketData.updated,
      ticketId: ticketData.id
    };

    return response.json(docEntry);
  } catch (error) {
    return response.status(500).json({ 
      error: 'Failed to create document',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}