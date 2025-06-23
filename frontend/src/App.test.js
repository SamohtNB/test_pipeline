import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the App component', () => {
    render(<App />);
    expect(screen.getByText('Frontend React')).toBeInTheDocument();
  });

  it('displays the message from the backend', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Hello from backend!' }),
      })
    );

    render(<App />);
    const message = await screen.findByText('Hello from backend!');
    expect(message).toBeInTheDocument();
  });

  it('sends a message to the backend', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ serverResponse: 'Le backend a reçu : Test message' }),
      })
    );

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Entrez un message'), { target: { value: 'Test message' } });
    fireEvent.click(screen.getByText('Envoyer'));

    const responseMessage = await screen.findByText('Le backend a reçu : Test message');
    expect(responseMessage).toBeInTheDocument();
  });
});
