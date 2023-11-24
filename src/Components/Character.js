import React, { useEffect, useRef, useState } from "react";

import classes from "./Character.module.css";
import CharacterCard from "./CharacterCard";

const Character = () => {
  const [charList, setCharList] = useState([]);
  const [visibleChar, setVisibleChar] = useState([]);
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  const fetchChar = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://swapi.dev/api/people");
      const data = await res.json();
      
      setCharList(data.results);
      setVisibleChar(data.results.slice(0, 3));
      setLoading(false);
      setCharIdx(2);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!isMounted.current) {
      fetchChar();
      isMounted.current = true;
    }
  });

  const addCharacter = async () => {
    if (charList.length - 1 > charIdx) {
      const newCharacter = charList[charIdx + 1];
      setVisibleChar((prevCharacters) => [...prevCharacters, newCharacter]);
      setCharIdx(charIdx + 1);
    } else {
      alert("Added All");
    }
  };

  const removeCharacter = (name) => {
    const filteredList = visibleChar.filter((item) => item.name !== name)
    setVisibleChar([...filteredList]);
  }

  

  return (
    <div className={classes.char}>
      <h1>Star Wars Characters</h1>
      <button onClick={addCharacter}>Add</button>
      {loading && <p>Loading...</p>}
      <div className={classes.charList}>
        {visibleChar.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            onRemove={removeCharacter}
            len={visibleChar.length}
            filmList={character.films}
          />
        ))}
      </div>
    </div>
  );
};

export default Character;
