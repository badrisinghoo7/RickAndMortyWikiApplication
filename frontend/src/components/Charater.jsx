import React, { useEffect, useState } from "react";
import CharaterCard from "./CharaterCard";
import FooterClock from "./FooterClock";
import "../App.css";
import ToggleThemeComponents from "./ToggleThemeComponents";
import { useNavigate } from "react-router-dom";

const Charater = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        let characters = [];
        let nextUrl = "https://rickandmortyapi.com/api/character";

        while (nextUrl) {
          const res = await fetch(nextUrl);
          const data = await res.json();
          characters = characters.concat(data.results);
          nextUrl = data.info.next;
        }

        setAllCharacters(characters);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchAllCharacters();
  }, []);

  const totalPages = Math.ceil(allCharacters.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentPageData = allCharacters.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleRandomClick = () => {
    const randomId = Math.floor(Math.random() * 826) + 1;
    navigate(`/character/${randomId}`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Rick and Morty Characters
      </h1>

      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <button onClick={handleRandomClick}>Random Character</button>
        <ToggleThemeComponents />
      </div>

      {/* Grid container */}
      <div
        className="grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {currentPageData.map((char) => (
          <CharaterCard key={char.id} {...char} />
        ))}
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          style={{
            padding: "10px 20px",
            cursor: page === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>

        <span style={{ fontWeight: "bold" }}>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          style={{
            padding: "10px 20px",
            cursor: page === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>

      <FooterClock />
    </div>
  );
};

export default Charater;
