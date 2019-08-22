import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: ''
};

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie);
  useEffect(() => {
    const id = props.match.params.id;
    const movieInArr = props.movies.find(movie => `${movie.id}` === id);
    if (movieInArr) setMovie(movieInArr);
  }, [props.movies, props.match.params.id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'price') {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        setMovie(initialMovie);
        props.updateMovies(res.data);
        props.history.push('/movies');
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
        <h2>Update Movie</h2>
        <form onSubmit={handleSubmit}>
            <input 
                type='text'
                name='name'
                onChange={changeHandler}
                placeholder='name'
                value={movie.name}
            />
            <input 
                type='text'
                name='name'
                onChange={changeHandler}
                placeholder='name'
                value={movie.name}
            />
            <input 
                type='text'
                name='name'
                onChange={changeHandler}
                placeholder='name'
                value={movie.name}
            />
            <input 
                type='text'
                name='name'
                onChange={changeHandler}
                placeholder='name'
                value={movie.name}
            />

            <button>Update Movie</button>
        </form>
    </div>
  );
};

export default UpdateMovie;
