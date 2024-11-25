import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = ({ books, updateBook }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const bookIndex = parseInt(id, 10);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNaN(bookIndex) || bookIndex < 0 || bookIndex >= books.length) {
      console.log('Invalid book ID, navigating to /');
      navigate('/');
      return;
    }

    const book = books[bookIndex];
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
    } else {
      console.log('Book not found, navigating to /');
      navigate('/');
    }
  }, [bookIndex, books, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setError('');
    updateBook(bookIndex, { title, author });
    console.log('Navigating to / after submission');
    navigate('/');
  };

  const mystyle = {
    margin: 'auto',
    width: '30%',
    padding: '10px',
  };

  return (
    <div>
      <div className="card" style={mystyle}>
        <div className="card-header">Modifier le livre</div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="col-auto mb-4">
              <label htmlFor="Titre" className="mb-2">Titre</label>
              <input
                type="text"
                className="form-control"
                id="Titre"
                placeholder="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-auto mb-4">
              <label htmlFor="Auteur" className="mb-2">Auteur</label>
              <input
                type="text"
                className="form-control"
                id="Auteur"
                placeholder="Auteur"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">Modifier</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
