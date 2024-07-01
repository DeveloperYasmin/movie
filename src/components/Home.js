import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { markWatched, deleteMovie } from '../features/moviesSlice';
import { useNavigate } from 'react-router-dom';

import Modal from './Modal';


const Home = () => {
  const navigate = useNavigate();

  const movies = useSelector(state => state.movies.movies);
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const handleDeleteClick = (movieId) => {
    setMovieToDelete(movieId);
    setDeleteConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(deleteMovie(movieToDelete));
    setDeleteConfirm(false);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
      <Link to="/add" className="px-4 py-2 bg-blue-500 text-white rounded">Add Movie</Link>
      <div className="mt-4">
        {movies.map(movie => (
          <div key={movie.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl">{movie.title}</h2>
            <p>{movie.description}</p>
            <p>{movie.releaseYear}</p>
            <p>{movie.genre}</p>
            <p>{movie.watched ? 'Watched' : 'Not Watched'}</p>
            <p>Rating: {movie.rating || 'Not Rated'}</p>
            <p>Review: {movie.review || 'No Review'}</p>
            <button
              onClick={() => dispatch(markWatched(movie.id))}
              className="px-2 py-1 bg-green-500 text-white rounded mr-2"
            >
              {movie.watched ? 'Unwatch' : 'Watch'}
            </button>
            <Link to={`/edit/${movie.id}`} className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">Edit</Link>
            <Link to={`/details/${movie.id}`} className="px-2 py-1 bg-blue-500 text-white rounded mr-2">Details</Link>
         <button onClick={() => handleDeleteClick(movie.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
            
        
        
    
      <Modal
        show={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        onConfirm={confirmDelete}
      >
        <p>Are you sure you want to delete this movie?</p>
        <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  dispatch(deleteMovie(movie.id));
                  navigate('/');
                }}
                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
              >
                Confirm
              </button>
              <button
                onClick={() => setDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
      </Modal>
    </div>
          
          
        ))}
      </div>
    </div>
  );
};

export default Home;
