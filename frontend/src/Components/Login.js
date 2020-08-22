import React, { useContext, useState } from 'react';

import { Context } from '../Context/AuthContext';
import history from '../history';

import {Card, Form, Button} from "react-bootstrap"
import ErrorNotice from './ErrorNotice'

export default function Login() {
  const { handleLogin } = useContext(Context);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();


  const register = () => {history.push('/register')}

  const submit = async (e) => {
    e.preventDefault();
    const userLogin = { email, password };
    handleLogin(userLogin)
      .catch(err => {
        if(err.response) err.response.data.msg && setError(err.response.data.msg);
        else setError('Problemas com o servidor');
      })
    }

  return (
    <div className="custom-card content-container">
        <Card className='thick-border'>
            <Card.Body>
                <Card.Title><h2>Login</h2></Card.Title>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                <Form onSubmit={submit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control className='thick-border' type="email" placeholder="Seu email" id="login-email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <Form.Control className='thick-border' type="password" placeholder="Senha" id="login-password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button className='wide-button' variant="success" type="submit">
                        Login
                    </Button>
                </Form>
                Não tá registrado no sistema? <Card.Link style={{cursor: 'pointer'}} onClick={register}>Registrar</Card.Link>
            </Card.Body>

            
        </Card>
    </div>
  );
}