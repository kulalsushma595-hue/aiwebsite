import React, { useEffect, useState } from 'react'
import axios from 'axios'

function authHeaders(){
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
}

export default function Dashboard(){
  const [countries, setCountries] = useState([])
  const [form, setForm] = useState({ name:'', slug:'' })
  const [msg, setMsg] = useState(null)

  useEffect(()=>{ fetchCountries() },[])
  function fetchCountries(){
    axios.get('/api/countries')
      .then(r=>setCountries(r.data))
      .catch(e=>console.error(e))
  }

  async function createCountry(e){
    e.preventDefault();
    try{
      await axios.post('/api/admin/countries', form, authHeaders())
      setMsg('Country created');
      setForm({name:'',slug:''});
      fetchCountries();
    }catch(err){
      setMsg(err?.response?.data?.error || 'Error');
    }
  }

  function logout(){ localStorage.removeItem('token'); window.location.reload(); }

  return (
    <div style={{padding:24}}>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <section style={{marginTop:16}}>
        <h3>Create Country</h3>
        <form onSubmit={createCountry}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input placeholder="Slug" value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} />
          <button type="submit">Create</button>
        </form>
        {msg && <p>{msg}</p>}
      </section>

      <section style={{marginTop:24}}>
        <h3>Countries</h3>
        <ul>
          {countries.map(c=> <li key={c.id}>{c.name} — {c.slug}</li>)}
        </ul>
      </section>
    </div>
  )
}