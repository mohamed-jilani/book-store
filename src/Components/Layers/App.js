import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from '../Books/BookList';
import AddBook from '../Books/AddBook';
import EditBook from '../Books/EditBook';


const App = () => {
  const [books, setBooks] = useState([
    { title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry' },
    { title: 'Harry Potter', author: 'J.K. Rowling' },
  ]);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const deleteBook = (index) => {
    const newBooks = books.filter((_, i) => i !== index);
    setBooks(newBooks);
  };

  const updateBook = (index, updatedBook) => {
    const newBooks = books.map((book, i) => (i === index ? updatedBook : book));
    setBooks(newBooks);
  };

  return (
    <Router>
      <div>
        <h3>Application de gestion des Livres électroniques : </h3>
        <Routes>
          <Route path="/" element={<BookList books={books} deleteBook={deleteBook} />} />
          <Route path="/add" element={<AddBook addBook={addBook} />} />
          <Route path="/edit/:id" element={<EditBook books={books} updateBook={updateBook} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
