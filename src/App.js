import './App.css';
import ShowStock from './Components/ShowStock';
import ClothingForm from './Components/ClothingForm';
import Nav from './Components/Layout/NavBar';
import HomePage from './Components/HomePage';
import {Route, BrowserRouter, Routes } from "react-router-dom"
import Footer from './Components/Layout/Footer';
import Container from './Components/Layout/Container';
import EntityDetails from './Components/EntityDetails';


function App() {
  return (        
      <BrowserRouter>
        <Container>
          <Nav/>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/new" element={<ClothingForm/>} />
              <Route path="/show" element={<ShowStock/>}/>
              <Route path='/details' element={<EntityDetails/>}/>
          </Routes>
        </Container>
        <Footer/>
      </BrowserRouter>
    
  )
  
}
export default App;
