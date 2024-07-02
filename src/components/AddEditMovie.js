import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addMovie, editMovie, deleteMovie } from '../features/moviesSlice';
import Modal from './Modal';

const AddEditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.movies);
  const movie = movies.find(movie => movie.id === id) || {};
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Initialize state based on movie when editing
  useEffect(() => {
    if (id && movie) {
      setIsEditing(true);
      setTitle(movie.title || '');
      setDescription(movie.description || '');
      setReleaseYear(movie.releaseYear || '');
      setGenre(movie.genre || '');
    }
  }, [id, movie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMovie = {
      id: id || Date.now().toString(),
      title,
      description,
      releaseYear,
      genre,
      watched: isEditing ? movie.watched : false, // Preserve watched status if editing
    };

    if (isEditing) {
      dispatch(editMovie({ id, updatedMovie }));
    } else {
      dispatch(addMovie(updatedMovie));
    }
    navigate('/');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Movie' : 'Add Movie'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block font-bold">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-bold">Release Year</label>
          <input type="text" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-bold">Genre</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{isEditing ? 'Update Movie' : 'Add Movie'}</button>
        </div>
        <button type="button" onClick={() => navigate('/')} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
      </form>
      
      {isEditing && (
        <div className="mt-4">
          <button
            onClick={() => setDeleteConfirm(true)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete Movie
          </button>
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
      )}
    </div>
  );
};

export default AddEditMovie;
