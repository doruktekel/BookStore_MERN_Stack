import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/books/details/:id" element={<ShowBook />} />
      <Route exact path="/books/create" element={<CreateBook />} />
      <Route exact path="/books/edit/:id" element={<EditBook />} />
      <Route exact path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
};

export default App;
