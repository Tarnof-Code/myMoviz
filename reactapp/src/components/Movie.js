import {
  Card,
  CardImg,
  CardBody,
  Button,
  ButtonGroup,
  CardText,
  CardTitle,
  Col,
  Badge,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart, faVideo, faStar } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";

export default function Movie(props) {
  const [watchMovie, setWatchMovie] = useState(false);
  const [countWatchMovie, setCountWatchMovie] = useState(0);
  const [myRatingMovie, setMyRatingMovie] = useState(0);

  let moyenne = 0;
  let nbVotes = 0;

  var plusClick = () => {
    if (myRatingMovie < 10) {
      setMyRatingMovie(myRatingMovie + 1);
    }
    if (myRatingMovie > 10) {
      setMyRatingMovie(10);
    }
  };

  var minusClick = () => {
    if (myRatingMovie > 0) {
      setMyRatingMovie(myRatingMovie - 1);
    }
    if (myRatingMovie < 0) {
      setMyRatingMovie(0);
    }
  };

  if (myRatingMovie > 0) {
    moyenne = Math.round(
      (props.globalCountRating * props.globalRating + myRatingMovie) /
        (props.globalCountRating + 1)
    );
    nbVotes = props.globalCountRating + 1;
  } else {
    moyenne = Math.round(props.globalRating);
    nbVotes = props.globalCountRating;
  }

  var handleClick = () => {
    if (!props.movieSee) {
      props.handleClickAddMovieParent(props.movieName, props.movieImg);
    }
    if (props.movieSee === true) {
      props.handleClickDeleteMovieParent(props.movieName);
    }
  };

  var colorButton = {};

  if (props.movieSee === true) {
    colorButton = {
      color: "#e74c3c",
    };
  } else {
    colorButton = {
      color: "grey",
    };
  }
  var camClick = () => {
    setWatchMovie(true);
    setCountWatchMovie(countWatchMovie + 1);
  };

  var colorCam = {};

  if (watchMovie) {
    colorCam = {
      color: "#e74c3c",
    };
  }

  var tabGlobalRating = [];
  for (let i = 0; i < 10; i++) {
    let color = {};
    if (i < moyenne) {
      color = { color: "#f1c40f" };
    }
    tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} />);
  }

  var starClick = (index) => {
    setMyRatingMovie(index);
  };

  var tabMyRating = [];
  for (let i = 0; i < 10; i++) {
    let color = {};
    if (i < myRatingMovie) {
      color = { color: "#f1c40f" };
    }

    tabMyRating.push(
      <FontAwesomeIcon
        onClick={() => starClick(i + 1)}
        style={color}
        icon={faStar}
      />
    );
  }

  let shortDesc = props.movieDesc;

  if (shortDesc.length > 80) {
    shortDesc = props.movieDesc.slice(0, 80) + "...";
  }

  shortDesc = props.movieDesc.slice(0, 80) + "...";

  let srcImg = "https://image.tmdb.org/t/p/w500" + props.movieImg;
  if (!props.movieImg) {
    srcImg = "./img/generique.jpg";
  }

  return (
    <Col xs="12" lg="6" xl="4">
      <Card className="m-3">
        <CardImg alt={props.movieName} src={srcImg} top width="100%" />
        <CardBody>
          <CardText>
            Like
            <FontAwesomeIcon
              onClick={() => handleClick()}
              style={colorButton}
              type="button"
              className="mx-2"
              icon={faHeart}
            />
          </CardText>
          <CardText>
            Nombre de vues
            <FontAwesomeIcon
              onClick={() => camClick()}
              style={colorCam}
              type="button"
              className="mx-2 "
              icon={faVideo}
            />
            <Badge color="secondary">{countWatchMovie}</Badge>
          </CardText>
          <CardText>
            Mon avis
            {tabMyRating}
            <ButtonGroup>
              <Button onClick={() => minusClick()}>-</Button>
              <Button onClick={() => plusClick()}>+</Button>
            </ButtonGroup>
          </CardText>
          <CardText>
            Avis Global
            {tabGlobalRating}({nbVotes})
          </CardText>
          <CardTitle>{props.movieName}</CardTitle>
          <CardText>{shortDesc}</CardText>
        </CardBody>
      </Card>
    </Col>
  );
}
