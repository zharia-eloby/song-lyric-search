import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Lyrics from './pages/Lyrics';
import Error404 from './pages/Error404';
import BaseLayout from './pages/BaseLayout';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path='lyrics' element={<Lyrics />} />
            <Route path='*' element={<Error404 />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
