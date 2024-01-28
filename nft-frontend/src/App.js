import './App.css';
import LoginPage from './components/LoginPage';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  return (
    <div className="App">
      <BrowserRouter>  
        <Routes>
          <Route
            path="/"
            element={loggedInUser ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/home"
            element={<Home/>}
          />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
