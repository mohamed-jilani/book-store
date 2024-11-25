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
        <div className="card" style={mystyle}>
            <div className="card-header">
            Ajouter un livre
            </div>
            <div className="card-body">
                            
                <form onSubmit={handleSubmit}>
                    
                    <div className="col-auto mb-4">
                        <label htmlFor="Titre" className="mb-2">Titre</label>
                        <input type="text" className="form-control" id="Titre" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>

                    <div className="col-auto mb-4">
                        <label htmlFor="Auteur" className="mb-2">Auteur</label>
                        <input type="text" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control" id="Auteur" />
                    </div>
                    <button type="submit" className="btn btn-primary">Ajouter</button>
                </form>
            </div>
        </div>

    </div>


  );
};

export default AddBook;
