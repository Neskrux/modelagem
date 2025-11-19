import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginCarousel from './components/LoginCarousel';
import Dashboard from './components/Dashboard';
import Clientes from './components/Clientes';
import Barbeiros from './components/Barbeiros';
import Agendamentos from './components/Agendamentos';
import NovoAgendamento from './components/NovoAgendamento';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? 
              <LoginCarousel onLogin={handleLogin} /> : 
              <Navigate to="/dashboard" />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard userRole={userRole} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/clientes" 
            element={
              isAuthenticated && userRole === 'gerente' ? 
              <Clientes onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/barbeiros" 
            element={
              isAuthenticated && userRole === 'gerente' ? 
              <Barbeiros onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/agendamentos" 
            element={
              isAuthenticated ? 
              <Agendamentos userRole={userRole} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/novo-agendamento" 
            element={
              isAuthenticated ? 
              <NovoAgendamento userRole={userRole} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


