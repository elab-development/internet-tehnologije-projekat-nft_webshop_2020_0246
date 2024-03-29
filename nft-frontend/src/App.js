import './App.css';
import LoginPage from './components/LoginPage';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Kriptovalute from './components/Kriptovalute';
import Nfts from './components/Nfts';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    return <Navigate to="/" />;
  };


  const [searchCriteria,setSearchCriteria]=useState("");

  function search(searchCriteria){
    setSearchCriteria(searchCriteria);
  }

  return (
    <div className="App">
      <BrowserRouter>  
      {loggedInUser && <NavBar  search={search} loggedInUser={loggedInUser} handleLogout={handleLogout} />}
        <Routes>
          <Route
            path="/"
            element={loggedInUser ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/home"
            element={loggedInUser ? <Home/> : <Navigate to="/" />}
          />
           <Route
            path="/kriptovalute"
            element={loggedInUser ? <Kriptovalute/> : <Navigate to="/" />}
          />
           <Route 
            path="/nfts" 
            element={loggedInUser ? <Nfts searchCriteria={searchCriteria}/> : <Navigate to="/" />} 
          />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
