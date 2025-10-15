import React, { useState } from 'react';

interface GenerateFromYouTrackProps {
  onDocumentGenerated: (document: any) => void;
}

const GenerateFromYouTrack: React.FC<GenerateFromYouTrackProps> = ({ onDocumentGenerated }) => {
  const [issueId, setIssueId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/youtrack/generate/${issueId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate documentation');
      }

      const document = await response.json();
      onDocumentGenerated(document);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="youtrack-generator">
      <h2>Generate from YouTrack</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="issueId">YouTrack Issue ID:</label>
          <input
            type="text"
            id="issueId"
            value={issueId}
            onChange={(e) => setIssueId(e.target.value)}
            placeholder="Enter YouTrack issue ID (e.g., DOC-123)"
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="button primary" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Documentation'}
        </button>
      </form>
    </div>
  );
};

export default GenerateFromYouTrack;