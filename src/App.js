import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddEditMovie from './components/AddEditMovie';
import MovieDetails from './components/MovieDetails';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEditMovie />} />
          <Route path="/edit/:id" element={<AddEditMovie />} />
          <Route path="/details/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
