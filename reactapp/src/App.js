import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Movie from "./components/Movie";

import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverHeader,
  PopoverBody,
  UncontrolledPopover,
  Button,
  CardGroup,
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

function App() {
  const [dataStatus, setDataStatus] = useState("");
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    async function loadFilms() {
      let brutResponse = await fetch("/new-movies");
      let jsonResponse = await brutResponse.json();
      setMoviesList(jsonResponse.results);
      setDataStatus("filmsLoaded");
    }
    loadFilms();
  }, []);

  const [moviesCount, setMoviesCount] = useState(0);
  const [dataWish, setDataWish] = useState("");
  const [moviesWishList, setMoviesWishList] = useState([]);

  useEffect(() => {
    async function loadWishList() {
      let brutResponse = await fetch("/wishlist-movie");
      let jsonResponse = await brutResponse.json();
      setMoviesCount(jsonResponse.length);
      setMoviesWishList(jsonResponse);
      setDataWish("WishListLoaded");
    }
    loadWishList();
  }, []);

  var handleClickAddMovie = (filmName, filmUrl) => {
    setMoviesCount(moviesCount + 1);
    async function addMovie() {
      await fetch("/wishlist-movie", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `name=${filmName}&img=${filmUrl}`,
      });
    }
    addMovie();
    setMoviesWishList([...moviesWishList, { name: filmName, img: filmUrl }]);
  };

  var handleClickDeleteMovie = (deleteName) => {
    setMoviesCount(moviesCount - 1);
    async function delMovie() {
      await fetch(`/wishlist-movie/${deleteName}`, {
        method: "DELETE",
      });
    }
    delMovie();

    setMoviesWishList(moviesWishList.filter((elt) => elt.name !== deleteName));
  };

  var popoverClick = (popMovieName) => {
    setMoviesCount(moviesCount - 1);
    async function delMovie() {
      await fetch(`/wishlist-movie/${popMovieName}`, {
        method: "DELETE",
      });
    }
    delMovie();


    setMoviesWishList(moviesWishList.filter((e) => e.name !== popMovieName));
  };

  let filmList = moviesList.map((movie, i) => {
    let result = moviesWishList.find((elt) => elt.name === movie.title);
    let isSee = false;
    if (result !== undefined) {
      isSee = true;
    }

    return (
      <Movie
        movieSee={isSee}
        handleClickDeleteMovieParent={handleClickDeleteMovie}
        handleClickAddMovieParent={handleClickAddMovie}
        movieName={movie.title}
        movieDesc={movie.overview}
        movieImg={movie.backdrop_path}
        globalRating={movie.vote_average}
        globalCountRating={movie.vote_count}
      />
    );
  });

  let wish = moviesWishList.map((elt) => (
    <ListGroupItem onClick={() => popoverClick(elt.name)} href="#" tag="a">
      <img width="50" src={"https://image.tmdb.org/t/p/w500" + elt.img}></img>
      <span>{elt.name}</span>
    </ListGroupItem>
  ));

  // console.log(wish)

  return (
    <div className="container-fluid px-5 bg-dark">
      <div class="row">
        <div class="header mx-3 mb-4 col-12">
          <div>
            <Nav>
              <img src="./img/logo.png" />
              <NavItem>
                <NavLink className="text-light" disabled>
                  Lasts releases
                </NavLink>
              </NavItem>

              <div>
                <Button id="UncontrolledPopover" type="button">
                  {moviesCount} films
                </Button>
                <UncontrolledPopover
                  placement="bottom"
                  target="UncontrolledPopover"
                >
                  <PopoverHeader>Whishlist</PopoverHeader>
                  <PopoverBody>
                    <ListGroup flush>{wish}</ListGroup>
                  </PopoverBody>
                </UncontrolledPopover>
              </div>
            </Nav>
          </div>
        </div>
      </div>

      <div class="row">
        <CardGroup>{filmList}</CardGroup>
      </div>
    </div>
  );
}

export default App;
