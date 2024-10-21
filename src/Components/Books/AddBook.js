// src/components/AddBook.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = ({ addBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      addBook({ title, author });
      navigate('/');
    }
  };

  const mystyle = {
        margin: "auto",
        width: "30%",
        padding: "10px",
    };
    
  return (
    <div>
        <div class="card" style={mystyle}>
            <div class="card-header">
            Ajouter un livre
            </div>
            <div class="card-body">
                            
                <form onSubmit={handleSubmit}>
                    
                    <div class="col-auto mb-4">
                        <label for="Titre" class="mb-2">Titre</label>
                        <input type="text" class="form-control" id="Titre" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>

                    <div class="col-auto mb-4">
                        <label for="Auteur" class="mb-2">Auteur</label>
                        <input type="text" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} class="form-control" id="Auteur" />
                    </div>
                    <button type="submit" class="btn btn-primary">Ajouter</button>
                </form>
            </div>
        </div>

    </div>


  );
};

export default AddBook;
