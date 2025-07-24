import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
    }}>
      <div style={{
        background: '#fff',
        padding: '2.5rem 2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        textAlign: 'center',
        maxWidth: 400,
        width: '100%'
      }}>
        <h1 style={{marginBottom: '1.2rem', color: '#1a237e', fontWeight: 700, fontSize: '2.2rem'}}>Welcome to the Upskilling Portal</h1>
        <p style={{marginBottom: '2rem', color: '#333', fontSize: '1.1rem'}}>Empowering communities to self-sustain and grow. Please choose an option below:</p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.2rem'}}>
          <button
            onClick={()=>navigate('/form')}
            style={{
              padding: '0.9rem 0',
              fontSize: '1.1rem',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)'
            }}
          >
            Fill Form
          </button>
          <button
            onClick={()=>navigate('/admin-login')}
            style={{
              padding: '0.9rem 0',
              fontSize: '1.1rem',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
              boxShadow: '0 2px 8px rgba(67, 206, 162, 0.08)'
            }}
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
} 