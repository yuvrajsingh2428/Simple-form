import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin({ setAdmin }) {
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (user === 'admin' && pw === 'admin123') {
      setAdmin(true);
      localStorage.setItem('adminUser', user);
      localStorage.setItem('adminPw', pw);
      navigate('/admin');
    } else {
      setErr('Invalid credentials');
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: '2.5rem 2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        maxWidth: 400,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.2rem',
      }}>
        <h2 style={{ color: '#1a237e', fontWeight: 700, marginBottom: '0.5rem' }}>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={e=>setUser(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #bdbdbd',
            fontSize: '1rem',
            outline: 'none',
            marginBottom: '0.2rem',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e=>setPw(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #bdbdbd',
            fontSize: '1rem',
            outline: 'none',
            marginBottom: '0.2rem',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.9rem 0',
            fontSize: '1.1rem',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '0.5rem',
            boxShadow: '0 2px 8px rgba(67, 206, 162, 0.08)'
          }}
        >
          Login
        </button>
        {err && <div style={{color:'red',marginTop:10, fontWeight:500}}>{err}</div>}
      </form>
    </div>
  );
} 