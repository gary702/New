import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import type { YouTrackTicket } from '../src/types/youtrack';

const YOUTRACK_API_URL = process.env.YOUTRACK_API_URL || 'https://your-youtrack-instance.com/api';
const YOUTRACK_TOKEN = process.env.YOUTRACK_TOKEN;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const response = await fetch(`${YOUTRACK_API_URL}/issues`, {
      headers: {
        'Authorization': `Bearer ${YOUTRACK_TOKEN}`,
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch tickets');
    }

    const tickets = await response.json() as YouTrackTicket[];
    return { tickets };
  } catch (error) {
    return response.status(500).json({ 
      error: 'Failed to fetch tickets',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}