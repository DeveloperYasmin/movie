import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { rateMovie, reviewMovie, deleteMovie, markWatched } from '../features/moviesSlice';
import Modal from './Modal';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movie = useSelector(state => state.movies.movies.find(movie => movie.id === id));

  const [localRating, setLocalRating] = useState(movie.rating || '');
  const [localReview, setLocalReview] = useState(movie.review || '');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if (movie) {
      setLocalRating(movie.rating || '');
      setLocalReview(movie.review || '');
    }
  }, [movie]);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleRatingChange = (e) => {
    const newRating = e.target.value;
    setLocalRating(newRating);
  };

  const handleReviewChange = (e) => {
    const newReview = e.target.value;
    setLocalReview(newReview);
  };

  const handleUpdate = () => {
    dispatch(rateMovie({ id: movie.id, rating: localRating }));
    dispatch(reviewMovie({ id: movie.id, review: localReview }));
    navigate('/');
  };

  
 

  return (
    <div className="p-4">
      <div className="flex justify-center mb-8">
        <h1 className="text-3xl font-bold">Movie Details</h1>
      </div>
            <div className="mb-4">
        <p >
          <span className="font-bold">Title:</span> {movie.title}
        </p>
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
        <div className="my-2">
          <label className="block font-bold">Rating:</label>
          <select value={localRating} onChange={handleRatingChange} className="p-2 border rounded">
            <option value="" disabled>-select-</option>
            {[1, 2, 3, 4, 5].map(star => (
              <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div className="my-2">
          <label className="block font-bold">Review:</label>
          <textarea
            value={localReview}
            onChange={handleReviewChange}
            className="w-full p-2 border rounded resize-y"
            style={{ minHeight: '100px' }} // Adjust the minimum height as needed
          />
        </div>
        <div className="flex space-x-2">
          <button onClick={handleUpdate} className="px-2 py-1 bg-blue-500 text-white rounded">Update</button>
          <Link to={`/edit/${movie.id}`} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</Link>
          <button onClick={() => dispatch(markWatched(movie.id))} className="px-2 py-1 bg-green-500 text-white rounded">
            {movie.watched ? 'Unwatch' : 'Watch'}
          </button>
          <button onClick={() => setDeleteConfirm(true)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
          <button onClick={() => navigate('/')} className="px-2 py-1 bg-gray-500 text-white rounded">Cancel</button>
        </div>
        <Modal show={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
          <p>Are you sure you want to delete this movie?</p>
          <div className="flex justify-end mt-4">
            <button onClick={() => { dispatch(deleteMovie(movie.id)); navigate('/'); }} className="px-4 py-2 bg-red-500 text-white rounded mr-2">
              Confirm
            </button>
            <button onClick={() => setDeleteConfirm(false)} className="px-4 py-2 bg-gray-500 text-white rounded">
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MovieDetails;
