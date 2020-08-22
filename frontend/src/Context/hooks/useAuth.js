import { useState, useEffect } from 'react';

import api from '../../api';
import history from '../../history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    (async () => {
    
      const token = localStorage.getItem('auth-token');

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setAuthenticated(true);
        const userId = localStorage.getItem('id');
        const { data } = await api.get('/user/' + userId, {headers: {'auth-token': token}});
        setUser(data);
      }

      setLoading(false);
  })()}, []);
  
  async function handleLogin(userLogin) {
    const res = await api.post('/user/login', {email: userLogin.email, password: userLogin.password});
    const token = res.data.token;
    localStorage.setItem('auth-token', token);
    localStorage.setItem('id', res.data.user._id);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    setUser(res.data.user);
    history.push('/users');
  }

  async function handleRegister(userRegister) {
    await api.post('/user/register', userRegister);
    handleLogin({email: userRegister.email, password: userRegister.password})
  }

  async function handleEdit(userEdit, userId) {
    const token = localStorage.getItem('auth-token');
    api.defaults.headers.Authorization = `Bearer ${token}`;
    await api.post('/user/update/' + userId, userEdit, {headers: {'auth-token': token}});
    history.push('/users')
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('auth-token');
    localStorage.removeItem('id');
    api.defaults.headers.Authorization = undefined;
    setUser(undefined);
    history.push('/login');
  }
  
  return { user, authenticated, loading, setUser, handleLogin, handleLogout, handleRegister, handleEdit };
}