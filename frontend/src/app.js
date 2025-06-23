import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [inputMessage, setInputMessage] = useState('');
  const [serverResponse, setServerResponse] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Erreur lors de la récupération de l\'API'));
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage: inputMessage }),
      });
      const data = await response.json();
      setServerResponse(data.serverResponse);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '2rem', textAlign: 'center' }}>
      <h1>Frontend React</h1>
      <p>Message depuis le backend :</p>
      <strong>{message}</strong>

      <div style={{ marginTop: '2rem' }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Entrez un message"
        />
        <button onClick={handleSubmit}>Envoyer</button>
        {serverResponse && <p>{serverResponse}</p>}
      </div>
    </div>
  );
}

export default App;
