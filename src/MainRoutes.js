import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import PokemonDetail from "./PokemonDetail";

export default function MainRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route path="/pokemon-detail" element={<PokemonDetail />} />
    </Routes>
  );
}
