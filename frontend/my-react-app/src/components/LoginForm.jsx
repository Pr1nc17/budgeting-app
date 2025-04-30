import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    //login logic
    console.log('Logging in with:', email, password);
  };

  
  //we could have it render a found user icon after email is entered
  //or a logo if no email is entered
  const iconText = email.trim() ? 'User Icon' : 'App Logo';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>
        {iconText}
      </div>
      <form
        onSubmit={handleLogin}
        style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
      >
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '10px',
            marginBottom: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px',
            marginBottom: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: '#fff',
            cursor: 'pointer',
            marginBottom: '10px',
          }}
        >
          Login
        </button>
      </form>
      <a href="/register" style={{ color: '#007BFF', textDecoration: 'none' }}>
        no account? Create one!
      </a>
    </div>
  );
};

export default LoginForm;