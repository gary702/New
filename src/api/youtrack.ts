import express from 'express';
import fetch from 'node-fetch';
import logger from '../utils/logger.js';
import type { YouTrackTicket, DocumentationEntry } from '../types/youtrack';

const router = express.Router();
const YOUTRACK_API_URL = process.env.YOUTRACK_API_URL || 'https://your-youtrack-instance.com/api';
const YOUTRACK_TOKEN = process.env.YOUTRACK_TOKEN;

// Fetch tickets from YouTrack
router.get('/tickets', async (_req, res) => {
  try {
    logger.info('Fetching tickets from YouTrack', {
      url: `${YOUTRACK_API_URL}/issues`,
    });

    const response = await fetch(`${YOUTRACK_API_URL}/issues`, {
      headers: {
        'Authorization': `Bearer ${YOUTRACK_TOKEN}`,
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      logger.error('YouTrack API responded with an error', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error('Failed to fetch tickets');
    }

    const tickets = await response.json() as YouTrackTicket[];
    logger.info('Successfully fetched tickets', {
      count: tickets.length,
    });
    res.json(tickets);
  } catch (error) {
    logger.error('Error fetching tickets:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// Create documentation from ticket
router.post('/document', async (req, res) => {
  const { ticketId } = req.body;
  
  try {
    logger.info('Creating documentation from ticket', {
      ticketId,
      url: `${YOUTRACK_API_URL}/issues/${ticketId}`,
    });

    const response = await fetch(`${YOUTRACK_API_URL}/issues/${ticketId}`, {
      headers: {
        'Authorization': `Bearer ${YOUTRACK_TOKEN}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      logger.error('Failed to fetch ticket details from YouTrack', {
        ticketId,
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error('Failed to fetch ticket details');
    }

    const ticketData = await response.json() as YouTrackTicket;
    const docEntry: DocumentationEntry = {
      title: ticketData.summary,
      content: ticketData.description,
      created: ticketData.created,
      updated: ticketData.updated,
      ticketId: ticketData.id
    };

    logger.info('Successfully created documentation', {
      ticketId,
      documentTitle: docEntry.title,
    });

    res.json(docEntry);
  } catch (error) {
    logger.error('Error creating document:', {
      ticketId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    res.status(500).json({ error: 'Failed to create document' });
  }
});

export const youtrackRouter = router;