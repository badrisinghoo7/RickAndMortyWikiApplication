import React, { useEffect, useState } from "react";
import CharaterCard from "./CharaterCard";
import FooterClock from "./FooterClock";
import "../App.css";
import ToggleThemeComponents from "./ToggleThemeComponents";
import { useNavigate } from "react-router-dom";

const Charater = () => {
  const [apiPage, setApiPage] = useState(1); // API page
  const [localPage, setLocalPage] = useState(1); // Local page for showing 6 per page
  const [data, setData] = useState([]);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  const itemsPerPage = 6;

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${apiPage}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setInfo(data.info);
      });
  }, [apiPage]);

  const totalLocalPages = Math.ceil(data.length / itemsPerPage);
  const currentPageData = data.slice(
    (localPage - 1) * itemsPerPage,
    localPage * itemsPerPage
  );

  const handleNext = () => {
    if (localPage < totalLocalPages) {
      setLocalPage((p) => p + 1);
    } else if (info.next) {
      setApiPage((p) => p + 1);
      setLocalPage(1); // Reset local page
    }
  };

  const handlePrevious = () => {
    if (localPage > 1) {
      setLocalPage((p) => p - 1);
    } else if (apiPage > 1) {
      setApiPage((p) => p - 1);
      setLocalPage(Math.ceil(20 / itemsPerPage)); // Assume API always returns 20
    }
  };

  const handleClickRandom = () => {
    const randomPage = Math.floor(Math.random() * 826)+ 1;
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
        {currentPageData.map((char) => (
          <CharaterCard key={char.id} {...char} />
        ))}
      </div>

      {/* Pagination */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <button
          onClick={handlePrevious}
          disabled={apiPage === 1 && localPage === 1}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            cursor:
              apiPage === 1 && localPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!info.next && localPage === totalLocalPages}
          style={{
            padding: "10px 20px",
            cursor:
              !info.next && localPage === totalLocalPages
                ? "not-allowed"
                : "pointer",
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
