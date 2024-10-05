import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import RepositoryFolder from "./pages/RepositoryFolder";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />

        <Route path="/blog" element={<Blog />} />

        {/* Match everything after /projects/* for folders */}
        <Route path="/projects/*" element={<RepositoryFolder />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
