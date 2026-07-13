
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home"; 
import Details from "./pages/Details"; 
import Favorites from "./pages/Favorites"; 
import About from "./pages/About"; 


function App() { 
  return ( 
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/artefacts/:id" element={<Details />} /> 
        <Route path="/favorites" element={<Favorites />} /> 
        <Route path="/about" element={<About />} /> 
      </Routes> 
    </BrowserRouter> 
  ); 
} 

export default App;
