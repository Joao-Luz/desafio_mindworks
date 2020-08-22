import React, { useEffect, useState } from "react";
import {Container, Row} from 'react-bootstrap';

import User from './User'
import api from '../api';
import ErrorNotice from './ErrorNotice'

export default function Users() {
    const [users, setUsers] = useState();
    const [error, setError] = useState();
    
    useEffect(() => {
        (async () => {
          const token = localStorage.getItem('auth-token');
          
          try {
            const { data } = await api.get('/user', {headers: {'auth-token': token}});
            setUsers(data);
          } catch (err) {
            if(err.response) err.response.data.msg && setError(err.response.data.msg);
            else setError('Problemas com o servidor');
          }
        })();
      }, []);


    return (
        <div className='content-container'>
            <h2 className='custom-card'>Usuários cadastrados:</h2>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            
            <Container className='users-container'>
              <Row>
                {users ? users.map((user, i) => (<User href={'users/' + user._id} user={user} key={i} className='col-sm-6 pl-1 pr-1 mt-2'/>)) : null}
              </Row>
            </Container>
        </div>
  );
}