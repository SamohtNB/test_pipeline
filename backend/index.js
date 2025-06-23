const express = require('express');
const app = express();
const port = 3001;

// Middleware pour parser le JSON
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Nouvel endpoint POST pour recevoir des données
app.post('/api/message', (req, res) => {
  const { userMessage } = req.body;
  console.log('Message reçu du frontend:', userMessage);
  res.json({ serverResponse: `Le backend a reçu : ${userMessage}` });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
