import React, { useEffect, useState } from 'react';

interface TestProps {
  onSuccess?: () => void;
}

const Test: React.FC<TestProps> = ({ onSuccess }) => {
  const [backendStatus, setBackendStatus] = useState<string>('Checking...');
  const [apiResponse, setApiResponse] = useState<string>('');

  // Test backend connection
  useEffect(() => {
    fetch('/api/test')
      .then(response => response.json())
      .then(data => {
        setBackendStatus('Connected');
        setApiResponse(JSON.stringify(data, null, 2));
        if (onSuccess) onSuccess();
      })
      .catch(error => {
        setBackendStatus(`Error: ${error.message}`);
      });
  }, [onSuccess]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Documentation Hub Test Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Backend Connection Status</h2>
        <p>Status: {backendStatus}</p>
        {apiResponse && (
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            {apiResponse}
          </pre>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Environment Info</h2>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          {`Frontend URL: ${window.location.origin}
API URL: ${window.location.origin}/api
Node Env: ${import.meta.env.MODE}`}
        </pre>
      </div>
    </div>
  );
};

export default Test;