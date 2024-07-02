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
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const handleDeleteClick = (movieId) => {
    setMovieToDelete(movieId);
    setDeleteConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(deleteMovie(movieToDelete));
    setDeleteConfirm(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/ca6a7616-0acb-4bc5-be25-c4deef0419a7/c5af601a-6657-4531-8f82-22e629a3795e/IN-en-20231211-popsignuptwoweeks-perspective_alpha_website_medium.jpg')` }}>
      <div className="flex flex-col items-center justify-center min-h-screen h-full bg-black bg-opacity-50 p-4">
        <h1 className="text-6xl font-bold text-white mb-4">My Watchlist</h1>
        <Link to="/add" className="px-4 py-2 text-xl bg-purple-700 text-white rounded mb-4">Add Movie</Link>
        <div className="w-full max-w-3xl mt-4">
          {movies.map(movie => (
            <div key={movie.id} className="mb-4 p-4 border ml-48 rounded-xl w-96 bg-gray-400 bg-opacity-90">
              <h2 className="text-xl">
                <span className="font-bold">Title:</span> {movie.title}
              </h2>
              {movie.description && (
                <p>
                  <span className="font-bold">Description:</span> {movie.description}
                </p>
              )}
              {movie.releaseYear && (
                <p>
                  <span className="font-bold">Release Year:</span> {movie.releaseYear}
                </p>
              )}
              {movie.genre && (
                <p>
                  <span className="font-bold">Genre:</span> {movie.genre}
                </p>
              )}
              <p className='font-bold'>{movie.watched ? 'Watched' : 'Not Watched'}</p>
              <p>
                <span className="font-bold">Rating:</span> {movie.rating || 'Not Rated'}
              </p>
              <p>
                <span className="font-bold">Review:</span> {movie.review || 'No Review'}
              </p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => dispatch(markWatched(movie.id))}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  {movie.watched ? 'Unwatch' : 'Watch'}
                </button>
                <Link to={`/edit/${movie.id}`} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</Link>
                <Link to={`/details/${movie.id}`} className="px-2 py-1 bg-blue-500 text-white rounded">Details</Link>
                <button onClick={() => handleDeleteClick(movie.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
        <Modal
          show={deleteConfirm}
          onClose={() => setDeleteConfirm(false)}
          onConfirm={confirmDelete}
        >
          <p>Are you sure you want to delete this movie?</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={confirmDelete}
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
    </div>
  );
};

export default Home;
