import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import VaccinationData from './context/VaccinationData';
import AddCenter from './components/AddCenter';
function App() {
  return (
    <>
    <VaccinationData>
    <Router>
    <Navbar/>
    <Routes>
            <Route exact path='/about' element={<About></About>}></Route>
            <Route exact path='/home' element={<Home></Home>}></Route>
            <Route exact path='/addcenter' element={<AddCenter></AddCenter>}></Route>
            <Route exact path='/login' element={<Login></Login>}></Route>
            <Route exact path='/signup' element={<SignUp></SignUp>}></Route>

          </Routes>
    </Router>
    </VaccinationData>
    </>
  );
}

export default App;
