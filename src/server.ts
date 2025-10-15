import express from 'express'
const app = express()
app.get('/api/test', (_req, res) => res.json({ message: 'Server is running' }))
app.listen(3001)

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

createServer().catch(console.error);
