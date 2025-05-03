import React from "react";
import { Route, Routes } from "react-router-dom";
import CharacterDetails from "../components/CharacterDetails";
import Charater from "../components/Charater";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Charater />} />
      <Route path="/character/:id" element={<CharacterDetails />} />
    </Routes>
  );
};

export default AllRoutes;
