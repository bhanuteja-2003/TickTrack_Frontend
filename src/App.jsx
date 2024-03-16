import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import './styles/app.scss';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";
function App() {
  
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  // this runs on every RELOAD , so it checks whether the cookie is there or not
  // using axios.get(....) , if YES then the state variable are set or else the state variables are set to their default values
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);


  return (
    <Router>
      <Header />
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route  path="/profile" element={<Profile />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
