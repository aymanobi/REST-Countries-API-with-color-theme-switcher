import './App.css';
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Details from './Components/Details';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <main>
        <h1 className='hidden'>REST Countries API with color theme switcher</h1>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/details/:countrieName" element={<Details />} />
          </Routes>
        </Router>
      </main>
    </>
  )
}

export default App;
