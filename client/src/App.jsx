import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Login from './admin/Login'
import Dashboard from './admin/Dashboard'

export default function App(){
  const [countries, setCountries] = useState([])
  const [user, setUser] = useState(null)

  useEffect(()=>{
    axios.get('/api/countries')
      .then(r=>setCountries(r.data))
      .catch(e=>console.error(e))

    // check for token presence
    const token = localStorage.getItem('token')
    if(token){
      // quick fetch to verify and retrieve user info via /api/auth/profile could be added; for now show dashboard
      setUser({});
    }
  },[])

  if(localStorage.getItem('token')){
    return <Dashboard />
  }

  return (
    <div style={{fontFamily: 'Inter, system-ui, sans-serif', padding: 24}}>
      <h1>WanderWay — Countries</h1>
      <p>Sample client fetching /api/countries (proxy or same-origin expected in dev)</p>
      <ul>
        {countries.map(c => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
      <hr />
      <Login onLogin={(u)=>setUser(u)} />
      <p style={{marginTop:24}}>Next: build pages for country and destination details, search, and auth flows.</p>
    </div>
  )
}
