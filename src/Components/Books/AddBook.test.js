import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AddBook from './AddBook';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';

// Mock du hook useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('AddBook Component', () => {
  const mockAddBook = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialiser les mocks à chaque test
    useNavigate.mockReturnValue(mockNavigate); // Mock de useNavigate
  });

  const renderWithRouter = (ui) => {
    return render(
      <MemoryRouter initialEntries={['/add']}>
        <Routes>
          <Route path="/add" element={ui} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('ajoute un livre et redirige', () => {
    renderWithRouter(<AddBook addBook={mockAddBook} />);

    // Remplir les champs du formulaire
    fireEvent.change(screen.getByLabelText(/titre/i), { target: { value: 'Nouveau Livre' } });
    fireEvent.change(screen.getByLabelText(/auteur/i), { target: { value: 'Auteur Test' } });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /ajouter/i }));

    // Vérifier que addBook a été appelé avec les bonnes données
    expect(mockAddBook).toHaveBeenCalledWith({
      title: 'Nouveau Livre',
      author: 'Auteur Test',
    });

    // Vérifier que la fonction navigate a été appelée avec la bonne URL
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
