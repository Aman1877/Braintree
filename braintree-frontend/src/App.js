import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./comps/Cart";
import Header from "./comps/Header";
import Home from "./comps/Home";
const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
