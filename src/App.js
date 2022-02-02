import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddToFavourites from './Components/AddToFavourites';


  const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [favourites, setFavourites] = useState([]);
    
    const getMovieRequest = async () => {
      const url = 'http://www.omdbapi.com/?s=star wars&apikey=263d22d8';
      const response = await fetch(url);
      const responseJson = await response.json();
      if (responseJson.Search){
        setMovies(responseJson.Search);
      }
    };

    const addFavouriteMovie = (movie) => {
      const newFavouriteList = [...favourites,movie];
      setFavourites(newFavouriteList);
    };
    
    useEffect(() => {
      getMovieRequest();
    }, []);
          return (
            <div className='container-fluid movie-app'>
              <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading = 'Movies'/>
                <SearchBox searchValue={searchValue} setSearchValue = {setSearchValue} />
              </div>
              <div className='row'>
                <MovieList 
                      movies = {movies} 
                      favouriteComponent ={AddToFavourites} 
                      handleFavouritesClick = {addFavouriteMovie}
                 />
              </div>
              <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Favourites' />
              </div>
              <div className='row'>
				          <MovieList movies={favourites} favouriteComponent={AddToFavourites} />
			        </div>
            </div>
          );
  };

export default App;
