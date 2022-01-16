import React from 'react';
import './App.css';
import ContextProvider from './context/context';
import SocketContextProvider from './context/scoketContext';
import { Routes,Route } from 'react-router-dom';
import Home from './Screens/Home/Home';
import SignUpForm from './components/signup/signup';
import LoginForm from './components/login/login';
import ProtectedRoutes from './components/protectedroutes/protectedroutes';

function App() {
  return (
    <SocketContextProvider>
       <ContextProvider>
      <Routes>
      <Route path="/signup" element={<SignUpForm/>} />
      <Route path="/login" element={<LoginForm/>} />
      <Route  path='/' element={<ProtectedRoutes/>}>
      <Route  path='/' element={<Home/>}/>
      </Route>
      </Routes>    
    </ContextProvider>
    </SocketContextProvider>);
}

export default App;
