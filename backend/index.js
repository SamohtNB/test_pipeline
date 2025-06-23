const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.post('/api/message', (req, res) => {
  const { userMessage } = req.body;
  console.log('Message reçu du frontend:', userMessage);
  res.json({ serverResponse: `Le backend a reçu : ${userMessage}` });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Exportez l'application pour les tests
module.exports = app;

// Écoutez sur le port uniquement si ce fichier est exécuté directement
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
  });
}