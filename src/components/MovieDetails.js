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

  const [localRating, setLocalRating] = useState(movie.rating || 0);
  const [localReview, setLocalReview] = useState(movie.review || '');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if (movie) {
      setLocalRating(movie.rating || 0);
      setLocalReview(movie.review || '');
    }
  }, [movie]);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleRatingChange = (e) => {
    const newRating = parseInt(e.target.value, 10);
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
      <h1 className="text-2xl font-bold mb-4">Movie Details</h1>
      <div className="mb-4">
        <h2 className="text-xl">{movie.title}</h2>
        <p>{movie.description}</p>
        <p>{movie.releaseYear}</p>
        <p>{movie.genre}</p>
        <p>{movie.watched ? 'Watched' : 'Not Watched'}</p>
        <div className="my-2">
          <label className="block">Rating:</label>
          <select value={localRating} onChange={handleRatingChange} className="p-2 border rounded">
            {[0,1, 2, 3, 4, 5].map(star => (
              <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div className="my-2">
          <label className="block">Review:</label>
          <textarea value={localReview} onChange={handleReviewChange} className="w-full p-2 border rounded" />
        </div>
        <div className="flex space-x-2">
          <button onClick={handleUpdate} className="px-2 py-1 bg-blue-500 text-white rounded">Update</button>
          <Link to={`/edit/${movie.id}`} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</Link>
          <button
            onClick={() => dispatch(markWatched(movie.id))}
            className="px-2 py-1 bg-green-500 text-white rounded"
          >
            {movie.watched ? 'Unwatch' : 'Watch'}
          </button>
          <button
            onClick={() => setDeleteConfirm(true)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-2 py-1 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
        <Modal show={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
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
    </div>
  );
};

export default MovieDetails;
