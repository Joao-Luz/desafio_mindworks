import React from 'react';
import {Router} from "react-router-dom";
import history from './history';
import Routes from './routes';
import { AuthProvider } from './Context/AuthContext';

import NavBar from './Components/NavBar'

import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

function App() {
  return (
    <AuthProvider>
      <NavBar/>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
