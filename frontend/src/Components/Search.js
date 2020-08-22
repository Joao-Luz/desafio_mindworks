import React, { useState } from "react";

import { Form, Button, InputGroup } from 'react-bootstrap';

import ErrorNotice from './ErrorNotice';
import User from './User'
import api from '../api';

export default function Search() {
    const [users, setUsers] = useState();
    const [name, setName] = useState();
    const [error, setError] = useState();

    const search = async e => {
        e.preventDefault();
        
        const token = localStorage.getItem('auth-token');
        if(token && name){
            const { data } = await api.post('/user/search',{name: name} , {headers: {'auth-token': token}})
                .catch(err => {
                    if(err.response) err.response.data.msg && setError(err.response.data.msg);
                    else setError('Problemas com o servidor');
                });;
            setUsers(data);
        }
        else setUsers(null);
    } 


    return (
        <div className='custom-card content-container'>
            <Form onSubmit={search}>
                <InputGroup>
                    <Form.Control className='thick-border' type='string' placeholder='Procure por nome' onChange={e => {setName(e.target.value)}}/>
                    <InputGroup.Append>
                        <Button type='submit'>Procurar</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            {users ? users.map((user, i) => (<User href={'users/' + user._id} user={user} key={i} className='mt-3'/>)) : null}
        </div>
  );
}