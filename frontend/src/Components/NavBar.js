import React, { useContext, useEffect, useState} from 'react';
import api from '../api';

import { Context } from '../Context/AuthContext';
import history from '../history';

import {Navbar, Nav} from "react-bootstrap"

export default function NavBar() {
  const { user, authenticated, handleLogout } = useContext(Context);
  
  const userId = localStorage.getItem('id');

  const edit = () => {history.push('/users/' + userId); history.go(0)};
  const allusers = () => {history.push('/users')};
  const search = () => {history.push('/search')};
  const login = () => {history.push('/login')};
  const register = () => {history.push('/register')};

  return (
    <>
    <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        {authenticated ? 
            (
            <>
            
            <Nav className="mr-auto">
                <Nav.Link onClick={allusers}>Todos Usuários</Nav.Link>
                <Nav.Link onClick={edit}>Editar meus dados</Nav.Link>
                <Nav.Link onClick={search}>Procurar e editar usuários</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
            
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {user ? user.full_name : null}
              </Navbar.Text>
            </Navbar.Collapse>
            </>
            ) :
            (<Nav className="mr-auto">
                <Nav.Link onClick={login}>Login</Nav.Link>
                <Nav.Link onClick={register}>Registrar</Nav.Link>
            </Nav>)
        }
        </Navbar.Collapse>
    </Navbar>
    </>
  );
}