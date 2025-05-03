import React, { useEffect, useState } from "react";
import CharaterCard from "./CharaterCard";
import FooterClock from "./FooterClock";
import "../App.css";
import ToggleThemeComponents from "./ToggleThemeComponents";
import { useNavigate } from "react-router-dom";
const Charater = () => {
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setdata(data.results);
        setInfo(data.info);
      });
  }, [page]);

  const handleClickRandom = () => {
    const randomPage = Math.floor(Math.random() * 836) + 1;
    navigate(`/character/${randomPage}`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Rick and Morty Characters
      </h1>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <button onClick={handleClickRandom}>Random Character</button>
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
        {data?.map((char) => (
          <CharaterCard key={char.id} {...char} />
        ))}
      </div>

      {/* Pagination */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={!info.prev}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            cursor: info.prev ? "pointer" : "not-allowed",
          }}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!info.next}
          style={{
            padding: "10px 20px",
            cursor: info.next ? "pointer" : "not-allowed",
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
