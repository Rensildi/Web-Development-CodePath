import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Detail from './pages/Detail';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/character/:id" element={<Detail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;