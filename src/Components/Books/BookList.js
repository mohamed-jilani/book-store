// src/components/BookList.js
import React from 'react';
import { Link } from 'react-router-dom';


const BookList = ({ books, deleteBook }) => {

    const handleDelete = (index) => {
        if(window.confirm('Voulez-vous vraiment supprimer ce livre ?')) {
            deleteBook(index)
        }
    }

    return (
        <div>
            
            <Link to="/add" className='btn btn-primary mb-4'>Add new Book</Link>

            <table className="table table-striped">
                <thead> 
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Auteur</th>
                        <th scope="col">Modifier</th>
                        <th scope="col">Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {books.map((book, index) => (
                        <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>
                                <Link to={`/edit/${index}`} style={{ marginLeft: '10px' }}  className="btn btn-outline-success" >Modifier</Link> 
                            </td>
                            <td>
                                <button onClick={() => handleDelete(index)} style={{ marginLeft: '10px' }} className='btn btn-outline-danger'>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>





        </div>
    );
};

export default BookList;
