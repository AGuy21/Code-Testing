import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Events from './pages/Events.tsx';

function App() {
  return (
    <div className="min-h-screen bg-[#0f3d2e] text-white">
      <header className="py-6">
        <nav className="max-w-4xl mx-auto flex gap-4 justify-center">
          <Link to="/" className="px-3 py-2 rounded hover:bg-white/5">Home</Link>
          <Link to="/about" className="px-3 py-2 rounded hover:bg-white/5">About</Link>
          <Link to="/events" className="px-3 py-2 rounded hover:bg-white/5">Events</Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;