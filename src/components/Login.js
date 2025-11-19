import React, { useState } from 'react';
import { FaUser, FaLock, FaCut } from 'react-icons/fa';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cliente');
  const [error, setError] = useState('');

  // Dados estáticos de usuários
  const users = {
    gerente: { email: 'gerente@barbearia.com', password: '123456' },
    barbeiro: { email: 'barbeiro@barbearia.com', password: '123456' },
    cliente: { email: 'cliente@barbearia.com', password: '123456' }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação simples
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    // Verificação de credenciais
    if (users[role].email === email && users[role].password === password) {
      onLogin(role);
    } else {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-wrapper">
            <FaCut className="login-icon" />
          </div>
          <h1>BarberPro</h1>
          <p className="login-subtitle">Gestão de Agendamentos</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Perfil de Acesso</label>
            <select 
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="cliente">Cliente</option>
              <option value="barbeiro">Barbeiro</option>
              <option value="gerente">Administrador</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <FaUser /> Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FaLock /> Senha
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-block">
            Acessar Sistema
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-title">Ambiente de Demonstração</p>
          <div className="credentials-list">
            <div className="credential-item">
              <span className="credential-role">Cliente:</span>
              <span className="credential-value">cliente@barbearia.com</span>
            </div>
            <div className="credential-item">
              <span className="credential-role">Barbeiro:</span>
              <span className="credential-value">barbeiro@barbearia.com</span>
            </div>
            <div className="credential-item">
              <span className="credential-role">Admin:</span>
              <span className="credential-value">gerente@barbearia.com</span>
            </div>
            <div className="credential-password">Senha padrão: 123456</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
