import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditBook from './EditBook';
import '@testing-library/jest-dom';
import { useParams, useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('EditBook Component - Modification Validée', () => {
  const mockUpdateBook = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise les mocks avant chaque test
    useParams.mockReturnValue({ id: '1' }); // ID valide
    useNavigate.mockReturnValue(mockNavigate);
  });

  const books = [
    { title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry' },
    { title: 'Harry Potter', author: 'J.K. Rowling' },
  ];

  const renderWithRouter = (ui) => {
    return render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <Routes>
          <Route path="/edit/:id" element={ui} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('soumet les nouvelles valeurs du formulaire', () => {
    renderWithRouter(<EditBook books={books} updateBook={mockUpdateBook} />);

    // Vérifiez que les valeurs initiales sont chargées
    expect(screen.getByDisplayValue('Harry Potter')).toBeInTheDocument();
    expect(screen.getByDisplayValue('J.K. Rowling')).toBeInTheDocument();

    // Modifier les champs
    fireEvent.change(screen.getByLabelText(/titre/i), { target: { value: 'Nouveau Titre' } });
    fireEvent.change(screen.getByLabelText(/auteur/i), { target: { value: 'Nouvel Auteur' } });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /modifier/i }));

    // Vérifiez que `updateBook` a été appelé avec les bonnes valeurs
    expect(mockUpdateBook).toHaveBeenCalledWith(1, {
      title: 'Nouveau Titre',
      author: 'Nouvel Auteur',
    });

    // Vérifiez que la navigation vers `/` a été effectuée
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
