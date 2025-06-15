import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={submit} style={{ padding: 20 }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
      <button type="submit">Ingresar</button>
    </form>
  );
}
