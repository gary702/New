import express from 'express';
import { YouTrackService } from '../youtrack';
import { DocumentGenerator } from '../services/documentGenerator';

const router = express.Router();

// Initialize YouTrack service with environment variables
const youtrackService = new YouTrackService({
  baseUrl: process.env.YOUTRACK_URL || '',
  token: process.env.YOUTRACK_TOKEN || '',
});

// Generate documentation from YouTrack issue
router.post('/generate/:issueId', async (req, res) => {
  try {
    const { issueId } = req.params;
    const issue = await youtrackService.getIssue(issueId);
    const document = DocumentGenerator.generateFromIssue(issue);
    
    // Here you would typically save the document to your database
    // For now, we'll just return it
    res.json(document);
  } catch (error) {
    console.error('Error generating documentation:', error);
    res.status(500).json({ error: 'Failed to generate documentation' });
  }
});

// Get recent changes from YouTrack
router.get('/recent-changes', async (req, res) => {
  try {
    const since = new Date();
    since.setDate(since.getDate() - 7); // Last 7 days
    
    const changes = await youtrackService.getRecentChanges(since);
    const documents = changes.map(issue => DocumentGenerator.generateFromIssue(issue));
    
    res.json(documents);
  } catch (error) {
    console.error('Error fetching recent changes:', error);
    res.status(500).json({ error: 'Failed to fetch recent changes' });
  }
});

// Search YouTrack issues
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const issues = await youtrackService.searchIssues(query);
    const documents = issues.map(issue => DocumentGenerator.generateFromIssue(issue));
    
    res.json(documents);
  } catch (error) {
    console.error('Error searching issues:', error);
    res.status(500).json({ error: 'Failed to search issues' });
  }
});

export default router;