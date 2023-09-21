import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
function App() {
  return (
  <Router>
    <div className='flex flex-col justify-between h-screen'>
    <Routes>
      <Route exact path='/' element={<Navbar/>}/>
      </Routes>
        <main className='container mx-auto px-3 pb-12'>
        Content
        </main>
      <Routes>
      <Route exact path='/' element={<Footer/>}/>
      </Routes>
      </div>
  </Router>
  );
}

export default App;
