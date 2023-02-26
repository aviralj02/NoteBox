import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Navbar from "./components/Navbar";
import Details from "./pages/Details";

const App = () => {
  return (
    <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/:id" element={<Update />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;