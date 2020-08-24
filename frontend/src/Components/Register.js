import React, { useState, useContext } from "react";

import { Context } from '../Context/AuthContext';
import history from '../history';

import {Card, Form, Button, Col, FormGroup} from 'react-bootstrap'
import ErrorNotice from './ErrorNotice'

export default function Register() {
  const { handleRegister } = useContext(Context);

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [last_name, setLastName] = useState();
  const [age, setAge] = useState();
  const [sex, setSex] = useState();
  const [job, setJob] = useState();
  const [password, setPassword] = useState();
  const [password_check, setPasswordCheck] = useState();
  const [error, setError] = useState();
  
  const login = () => {history.push('/login')}

  const cancel = () => {history.push('/login')}

  const submit = async (e) => {
    e.preventDefault();

    const userRegister = {
      email: email,
      password: password,
      password_check: password_check,
      name: name,
      last_name: last_name,
      age: age,
      sex: sex,
      job: job
    };

    handleRegister(userRegister)
    .catch(err => {
      if(err.response) err.response.data.msg && setError(err.response.data.msg);
      else setError('Problemas com o servidor');
    })
  };

  return (
    <div className="custom-card content-container">
        <Card className='thick-border'>
            <Card.Body>
                <Card.Title><h2>Registrar</h2></Card.Title>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                <Form onSubmit={submit}>
                    <FormGroup>
                    <Form.Row>
                      <Col>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control className='thick-border' type="string" placeholder="Nome" id="register-name" onChange={(e) => setName(e.target.value)}/>
                      </Col>
                      
                      <Col>
                        <Form.Label>Sobrenome</Form.Label>
                        <Form.Control className='thick-border' type="string" placeholder="Sobrenome" id="register-last_name" onChange={(e) => setLastName(e.target.value)}/>
                      </Col>
                    </Form.Row>
                    </FormGroup>
                
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control className='thick-border' type="email" placeholder="Seu email" id="register-email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <Form.Control className='thick-border' type="password" placeholder="Senha" id="register-password" onChange={(e) => setPassword(e.target.value)}/>
                        <Form.Label htmlFor="register-password">Confirmar Senha</Form.Label>
                        <Form.Control className='thick-border' type="password" placeholder="Confirmar Senha" id="register-password" onChange={(e) => setPasswordCheck(e.target.value)}/>
                    </Form.Group>

                    <FormGroup>
                    <Form.Row>
                      <Col xs={2}>
                        <Form.Label>Idade</Form.Label>
                        <Form.Control className='thick-border' type="string" id="register-name" onChange={(e) => setAge(e.target.value)}/>
                      </Col>
                      
                      <Col xs={4}>
                        <Form.Label>Sexo</Form.Label>
                        <Form.Control as='select' className='thick-border'id="register-last_name" onChange={
                            (e) => setSex(e.target.value === 'Masculino' ? 'male' : (e.target.value === 'Feminino' ? 'female' : 'other'))
                          } custom >
                          <option> </option>
                          <option>Masculino</option>
                          <option>Feminino</option>
                          <option>Outro</option>
                        </Form.Control>
                      </Col>

                      <Col>
                        <Form.Label>Profissão</Form.Label>
                        <Form.Control className='thick-border' type="string" placeholder="Profissão" id="register-last_name" onChange={(e) => setJob(e.target.value)}/>
                      </Col>
                    </Form.Row>
                    </FormGroup>

                    <Button className='wide-button' variant="success" type="submit">
                        Registrar
                    </Button>

                    <Button className='wide-button' variant="light" onClick={cancel}>
                        Cancelar
                    </Button>
                </Form>
                Já ta registrado no sistema? <Card.Link style={{cursor: 'pointer'}} onClick={login} >Login</Card.Link>
            </Card.Body>
        </Card>
    </div>
  );
}