import React, { useState, useContext, useEffect } from "react";

import { Context } from '../Context/AuthContext';
import api from '../api';
import ErrorNotice from './ErrorNotice';
import history from '../history';

import {Card, Form, Button, Col, FormGroup} from 'react-bootstrap';

export default function Edit() {
  const { handleEdit } = useContext(Context);
  const [user, setUser] = useState();
  const [userId, setUserId] = useState(window.location.pathname.split('/').pop());
  const [foundUser, setFoundUser] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('auth-token');
      setUserId(window.location.pathname.split('/').pop());
      try {
        const { data } = await api.get('/user/' + userId, {headers: {'auth-token': token}});
        setUser(data);
      } catch (err) {
        setFoundUser(false);
      }
    })();
  }, []);
  
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [last_name, setLastName] = useState();
  const [age, setAge] = useState();
  const [sex, setSex] = useState();
  const [job, setJob] = useState();
  const [password, setPassword] = useState();
  const [password_check, setPasswordCheck] = useState();
  const [error, setError] = useState();

  const cancel = () => {history.push('/users')}

  const submit = async (e) => {
    e.preventDefault();
    
    const userEdit = {
      email: email ? email : undefined,
      password: password ? password : undefined,
      password_check: password_check ? password_check : undefined,
      name: name ? name : undefined,
      last_name: last_name ? last_name : undefined,
      age: age ? age : undefined,
      sex: sex ? sex : undefined,
      job: job ? job : undefined
    };

    handleEdit(userEdit, userId)
      .catch(err => {
        if(err.response) err.response.data.msg && setError(err.response.data.msg);
        else setError('Problemas com o servidor');
      });

  };

  return user ? (
    <div className="custom-card content-container">
        <Card className='thick-border'>
            <Card.Body>
                <Card.Title><h2>Editar</h2></Card.Title>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                <Form onSubmit={submit}>
                    <FormGroup>
                    <Form.Row>
                      <Col>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control className='thick-border' type="string" placeholder={user.name} id="register-name" onChange={(e) => setName(e.target.value)}/>
                      </Col>
                      
                      <Col>
                        <Form.Label>Sobrenome</Form.Label>
                        <Form.Control className='thick-border' type="string" placeholder={user.last_name} id="register-last_name" onChange={(e) => setLastName(e.target.value)}/>
                      </Col>
                    </Form.Row>
                    </FormGroup>
                
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control className='thick-border' type="email" placeholder={user.email} id="register-email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <Form.Control className='thick-border' type="password" placeholder='******' id="register-password" onChange={(e) => setPassword(e.target.value)}/>
                        <Form.Label htmlFor="register-password">Confirmar Senha</Form.Label>
                        <Form.Control className='thick-border' type="password" id="register-password" onChange={(e) => setPasswordCheck(e.target.value)}/>
                    </Form.Group>

                    <FormGroup>
                    <Form.Row>
                      <Col xs={2}>
                        <Form.Label>Idade</Form.Label>
                        <Form.Control className='thick-border' placeholder={user.age} type="string" id="register-name" onChange={(e) => setAge(e.target.value)}/>
                      </Col>
                      
                      <Col xs={4}>
                        <Form.Label>Sexo</Form.Label>
                        <Form.Control as='select' className='thick-border'id="register-last_name" onChange={
                            (e) => setSex(e.target.value === 'Masculino' ? 'male' : (e.target.value === 'Feminino' ? 'female' : 'other'))
                          } custom>
                          <option></option>
                          <option>Masculino</option>
                          <option>Feminino</option>
                          <option>Outro</option>
                        </Form.Control>
                      </Col>

                      <Col>
                        <Form.Label>Profissão</Form.Label>
                        <Form.Control className='thick-border' type="string" placeholder={user.job} id="register-last_name" onChange={(e) => setJob(e.target.value)}/>
                      </Col>
                    </Form.Row>
                    </FormGroup>

                    <Button className='wide-button' variant="success" type="submit">
                        Salvar
                    </Button>
                    <Button className='wide-button' variant="light" onClick={cancel}>
                        Cancelar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
  ) : foundUser ? null :
  (<div className="custom-card content-container">
    <h2>Oops...</h2>
    <h4 style={{color: 'grey'}}>Usuário não encontrado</h4>
  </div>);
}