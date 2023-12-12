import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import { Mycontext } from './MyContext';
import axios from 'axios'
import Layout from './pages/Layout';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Page from './pages/Page';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Public from './pages/Public';
import Edit from './pages/Edit';

function App() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {        
        const token = localStorage.getItem("token");        
        if (!token) {
          return navigate("/login");
        }

        const tokenValidationResponse = await axios.get(`https://noteapi-g1nt.onrender.com/auth/token-valid/${token}`);
        const { valid } = tokenValidationResponse.data;        
        if (!valid) {          
          return navigate("/login");
        }

        const notesResponse = await axios.get(`https://noteapi-g1nt.onrender.com/notes/get-all/${token}`);
        const notesData = notesResponse.data;

        setNotes([...notesData]);
      } catch (error) {
        console.error(error);    
        alert('Error fetching notes');
      }
    };

    fetchData(); 
  }, [])
  return (
    <>
      <Mycontext.Provider value={{ notes, setNotes }}>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/editor' element={<Editor />} />
            <Route path='/editor/:id' element={<Edit />} />
            <Route path='/page/:id' element={<Page />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/public' element={<Public />} />            
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Mycontext.Provider>
    </>
  )
}

export default App
