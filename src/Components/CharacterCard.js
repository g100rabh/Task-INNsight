import React, { useEffect, useState } from "react";

import classes from "./CharacterCard.module.css";
import myImage from "../assets/myImage.jpg";

const CharacterCard = (props) => {
  const [films, setFilms] = useState([]);
  const [loadingFilms, setLoadingFilms] = useState(false);

  useEffect(() => {
    const fetchFilmName = async (apiList) => {
      setLoadingFilms(true);
      const filmNames = [];
      for (const element of apiList) {
        try {
          const res = await fetch(element);
          const data = await res.json();
          filmNames.push(data.title);
        } catch (error) {
          console.log(error);
        }
      }
      setFilms([...filmNames]);
      setLoadingFilms(false);
    };

    fetchFilmName(props.character.films);
  }, [props.character.films]);

  return (
    <div className={classes.card}>
    <img src={myImage} alt='card image' />
      {props.len > 3 && (
        <span
          className={classes.closeIcon}
          onClick={() => props.onRemove(props.character.name)}
        >
          X
        </span>
      )}
      <h2>{props.character.name}</h2>
      <p>Height: {props.character.height}</p>
      <span>
        <h5>Films:</h5>
        {loadingFilms && <p className={classes.loading}>Loading films...</p>}
        <p>{films.join(", ")}</p>
      </span>
    </div>
  );
};

export default CharacterCard;
