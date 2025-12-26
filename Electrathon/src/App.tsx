import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Events from './pages/Events.tsx';
import Header from './components/layout/Header'
import Connect from './pages/Connect.tsx';
import Sponsorship from './pages/Sponsorship.tsx';
import Footer from './components/layout/Footer';
import CircuitBackground from './components/animations/CircuitBackground';

function App() {
  const location = useLocation()
  const path = location.pathname
  const selectedPage = path === '/' ? 'Home' : path.replace('/', '').replace(/\/-?/, '')

  return (
    <div className="min-h-screen bg-[#0f3d2e] text-white relative overflow-x-hidden">
      <CircuitBackground />
      <Header SelectedPage={selectedPage} />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path='/connect' element={<Connect />} />
          <Route path='/sponsorship' element={<Sponsorship />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;