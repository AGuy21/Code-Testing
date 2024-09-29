
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css'
import Home from './pages/Home'
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/projects" Component={Projects} />
        <Route path="/blog" Component={Blog} />
        {/* Add a fallback route or a 404 page if needed */}
        </Routes>
    </BrowserRouter>
  );
};


export default App


