import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaUserTie, FaPlus, FaSignOutAlt, FaChartBar, FaClock, FaCheck, FaCut } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = ({ userRole, onLogout }) => {
  // Dados estáticos para demonstração
  const stats = {
    agendamentosHoje: 12,
    clientesTotal: 45,
    barbeirosAtivos: 4,
    proximoHorario: '14:30'
  };

  const proximosAgendamentos = [
    { id: 1, cliente: 'João Silva', servico: 'Corte + Barba', horario: '14:30', barbeiro: 'Carlos', status: 'confirmado' },
    { id: 2, cliente: 'Pedro Santos', servico: 'Corte', horario: '15:00', barbeiro: 'André', status: 'confirmado' },
    { id: 3, cliente: 'Lucas Oliveira', servico: 'Barba', horario: '15:30', barbeiro: 'Carlos', status: 'pendente' },
    { id: 4, cliente: 'Marcos Costa', servico: 'Corte + Barba', horario: '16:00', barbeiro: 'Roberto', status: 'confirmado' }
  ];

  const getMenuItems = () => {
    const baseItems = [
      { to: '/agendamentos', icon: <FaCalendarAlt />, label: 'Agendamentos', color: 'primary' },
      { to: '/novo-agendamento', icon: <FaPlus />, label: 'Novo Agendamento', color: 'success' }
    ];

    if (userRole === 'gerente') {
      return [
        ...baseItems,
        { to: '/clientes', icon: <FaUsers />, label: 'Clientes', color: 'info' },
        { to: '/barbeiros', icon: <FaUserTie />, label: 'Barbeiros', color: 'warning' }
      ];
    }

    return baseItems;
  };

  const getUserTitle = () => {
    switch(userRole) {
      case 'gerente':
        return 'Administração';
      case 'barbeiro':
        return 'Área do Profissional';
      case 'cliente':
        return 'Área do Cliente';
      default:
        return 'Dashboard';
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <FaCut className="logo-icon" />
            <h1>BarberPro</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="greeting">{getGreeting()}</span>
              <span className="user-role">{getUserTitle()}</span>
            </div>
            <button onClick={onLogout} className="btn btn-outline btn-logout">
              <FaSignOutAlt /> Sair
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Cards de Estatísticas */}
        {userRole === 'gerente' && (
          <>
            <div className="section-header">
              <h2>Visão Geral</h2>
              <span className="section-date">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#2c3e50' }}>
                  <FaCalendarAlt />
                </div>
                <div className="stat-info">
                  <h3>{stats.agendamentosHoje}</h3>
                  <p>Agendamentos hoje</p>
                  <span className="stat-trend">+2 em relação a ontem</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#34495e' }}>
                  <FaUsers />
                </div>
                <div className="stat-info">
                  <h3>{stats.clientesTotal}</h3>
                  <p>Clientes cadastrados</p>
                  <span className="stat-trend">Base de clientes</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#7f8c8d' }}>
                  <FaUserTie />
                </div>
                <div className="stat-info">
                  <h3>{stats.barbeirosAtivos}</h3>
                  <p>Profissionais ativos</p>
                  <span className="stat-trend">Em operação</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#95a5a6' }}>
                  <FaClock />
                </div>
                <div className="stat-info">
                  <h3>{stats.proximoHorario}</h3>
                  <p>Próximo atendimento</p>
                  <span className="stat-trend">Em breve</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Menu de Navegação */}
        <div className="menu-grid">
          {getMenuItems().map((item, index) => (
            <Link to={item.to} key={index} className={`menu-card menu-${item.color}`}>
              <div className="menu-icon">{item.icon}</div>
              <h3>{item.label}</h3>
            </Link>
          ))}
        </div>

        {/* Próximos Agendamentos */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2>Próximos Agendamentos</h2>
              <p className="card-subtitle">Atendimentos programados para hoje</p>
            </div>
          </div>
          <div className="appointments-list">
            {proximosAgendamentos.map(appointment => (
              <div key={appointment.id} className="appointment-item">
                <div className="appointment-time">
                  <FaClock />
                  <strong>{appointment.horario}</strong>
                </div>
                <div className="appointment-info">
                  <h4>{appointment.cliente}</h4>
                  <p>{appointment.servico} - {appointment.barbeiro}</p>
                </div>
                <div className={`appointment-status status-${appointment.status}`}>
                  {appointment.status === 'confirmado' ? <FaCheck /> : <FaClock />}
                  {appointment.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico de Desempenho (apenas visual) */}
        {userRole === 'gerente' && (
          <div className="card">
            <div className="card-header">
              <h2>
                <FaChartBar /> Desempenho da Semana
              </h2>
            </div>
            <div className="chart-container">
              <div className="chart-bars">
                <div className="chart-bar" style={{ height: '60%' }}>
                  <span className="bar-value">12</span>
                  <span className="bar-label">Seg</span>
                </div>
                <div className="chart-bar" style={{ height: '80%' }}>
                  <span className="bar-value">16</span>
                  <span className="bar-label">Ter</span>
                </div>
                <div className="chart-bar" style={{ height: '70%' }}>
                  <span className="bar-value">14</span>
                  <span className="bar-label">Qua</span>
                </div>
                <div className="chart-bar" style={{ height: '90%' }}>
                  <span className="bar-value">18</span>
                  <span className="bar-label">Qui</span>
                </div>
                <div className="chart-bar" style={{ height: '100%' }}>
                  <span className="bar-value">20</span>
                  <span className="bar-label">Sex</span>
                </div>
                <div className="chart-bar" style={{ height: '85%' }}>
                  <span className="bar-value">17</span>
                  <span className="bar-label">Sáb</span>
                </div>
                <div className="chart-bar" style={{ height: '30%' }}>
                  <span className="bar-value">6</span>
                  <span className="bar-label">Dom</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
