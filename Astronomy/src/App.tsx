import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import Connect from './pages/Connect';
import { Colors } from './constants/colors';

function App() {
  const location = useLocation()
  const path = location.pathname
  const selectedPage = path === '/' ? 'Home' : path.replace('/', '').replace(/\/-?/, '')

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: Colors.background }}>
      <Header SelectedPage={selectedPage} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/connect' element={<Connect />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
