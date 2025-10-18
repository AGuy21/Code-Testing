import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Events from './pages/Events.tsx';
import Header from './components/Header'
function App() {
  const location = useLocation()
  const path = location.pathname
  const selectedPage = path === '/' ? 'Home' : path.replace('/', '').replace(/\/-?/, '')

  return (
    <div className="min-h-screen bg-[#0f3d2e] text-white">
      <Header SelectedPage={selectedPage} />

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