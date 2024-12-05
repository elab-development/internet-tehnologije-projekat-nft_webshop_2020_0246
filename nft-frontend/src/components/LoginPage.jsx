import React, { useState } from 'react';
import '../css/LoginPage.css';

const LoginPage = ({ onLogin }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const users = [
    { username: 'Vanja', password: 'vanja01' },
    { username: 'Djordje', password: 'djordje01' }
  ];

  const handleLogin = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      onLogin(username);
    } else {
      alert('Nisu dobri parametri za login, pokusajte ponovo.');
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-data">
        <h2>LOGIN:</h2>
        <label htmlFor="username">Korisnicko ime:</label>
        <input
          type="text"
          id="username"
          placeholder="korisnicko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Lozinka:</label>
        <input
          type="password"
          id="password"
          placeholder="lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>LOGIN</button>
      </div>
    </div>
  );
};

export default LoginPage;