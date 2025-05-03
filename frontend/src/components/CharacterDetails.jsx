import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FooterClock from "../components/FooterClock";

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => setCharacter(data));
  }, [id]);

  if (!character) return <p>Loading...</p>;

  return (
    <div className="container detail">
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>
        <strong>Status:</strong> {character.status}
      </p>
      <p>
        <strong>Species:</strong> {character.species}
      </p>
      <p>
        <strong>Type:</strong> {character.type || "N/A"}
      </p>
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>
      <p>
        <strong>Origin:</strong> {character.origin.name}
      </p>
      <p>
        <strong>Location:</strong> {character.location.name}
      </p>
      <p>
        <strong>Episodes:</strong> {character.episode.length}
      </p>
      <FooterClock />
    </div>
  );
}
