import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import Connect from './pages/Connect';
import StarField from './components/StarField';
import ShootingStars from './components/ShootingStars';
import { Colors } from './constants/colors';

function App() {
  const location = useLocation()
  const path = location.pathname
  const selectedPage = path === '/' ? 'Home' : path.replace('/', '').replace(/\/-?/, '')

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: Colors.background }}>
      <StarField />
      <ShootingStars />
      <div className="relative z-10">
        <Header SelectedPage={selectedPage} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/connect' element={<Connect />} />
        </Routes>
      </main>
      </div>
    </div>
  );
}

export default App;
