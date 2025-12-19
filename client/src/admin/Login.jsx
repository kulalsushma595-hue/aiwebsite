import React, { useState } from 'react'
import axios from 'axios'

export default function Login({ onLogin }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function submit(e){
    e.preventDefault();
    try{
      const res = await axios.post('/api/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      onLogin(user);
    }catch(err){
      setError(err?.response?.data?.error || 'Login failed');
    }
  }

  return (
    <div style={{maxWidth:420,padding:24}}>
      <h2>Admin login</h2>
      <form onSubmit={submit}>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {error && <p style={{color:'crimson'}}>{error}</p>}
      </form>
    </div>
  )
}