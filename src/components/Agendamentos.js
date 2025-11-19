import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUser, FaUserTie, FaCut, FaEdit, FaTrash, FaCheck, FaTimes, FaFilter } from 'react-icons/fa';
import './Agendamentos.css';

const Agendamentos = ({ userRole, onLogout }) => {
  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      cliente: 'João Silva',
      barbeiro: 'Carlos Silva',
      servico: 'Corte + Barba',
      data: '2024-11-19',
      horario: '09:00',
      status: 'confirmado',
      valor: 'R$ 65,00'
    },
    {
      id: 2,
      cliente: 'Pedro Santos',
      barbeiro: 'André Santos',
      servico: 'Corte',
      data: '2024-11-19',
      horario: '10:00',
      status: 'confirmado',
      valor: 'R$ 40,00'
    },
    {
      id: 3,
      cliente: 'Lucas Oliveira',
      barbeiro: 'Roberto Oliveira',
      servico: 'Barba',
      data: '2024-11-19',
      horario: '11:00',
      status: 'pendente',
      valor: 'R$ 25,00'
    },
    {
      id: 4,
      cliente: 'Marcos Costa',
      barbeiro: 'Paulo Costa',
      servico: 'Corte Infantil',
      data: '2024-11-19',
      horario: '14:00',
      status: 'confirmado',
      valor: 'R$ 35,00'
    },
    {
      id: 5,
      cliente: 'André Ferreira',
      barbeiro: 'Carlos Silva',
      servico: 'Pigmentação',
      data: '2024-11-20',
      horario: '09:00',
      status: 'pendente',
      valor: 'R$ 80,00'
    },
    {
      id: 6,
      cliente: 'Bruno Lima',
      barbeiro: 'André Santos',
      servico: 'Corte + Barba + Sobrancelha',
      data: '2024-11-20',
      horario: '15:00',
      status: 'cancelado',
      valor: 'R$ 75,00'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterDate, setFilterDate] = useState('');
  const [notification, setNotification] = useState(null);
  const [editingAgendamento, setEditingAgendamento] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleConfirm = (id) => {
    setAgendamentos(agendamentos.map(a => 
      a.id === id ? { ...a, status: 'confirmado' } : a
    ));
    showNotification('Agendamento confirmado com sucesso!');
  };

  const handleCancel = (id) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      setAgendamentos(agendamentos.map(a => 
        a.id === id ? { ...a, status: 'cancelado' } : a
      ));
      showNotification('Agendamento cancelado!', 'error');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      setAgendamentos(agendamentos.filter(a => a.id !== id));
      showNotification('Agendamento excluído com sucesso!');
    }
  };

  const handleReschedule = (agendamento) => {
    const newDate = prompt('Nova data (YYYY-MM-DD):', agendamento.data);
    const newTime = prompt('Novo horário (HH:MM):', agendamento.horario);
    
    if (newDate && newTime) {
      setAgendamentos(agendamentos.map(a => 
        a.id === agendamento.id 
          ? { ...a, data: newDate, horario: newTime, status: 'pendente' } 
          : a
      ));
      showNotification('Agendamento remarcado com sucesso!');
    }
  };

  const filteredAgendamentos = agendamentos.filter(agendamento => {
    let matchStatus = filterStatus === 'todos' || agendamento.status === filterStatus;
    let matchDate = !filterDate || agendamento.data === filterDate;
    
    // Se for cliente, mostrar apenas seus agendamentos
    if (userRole === 'cliente') {
      return matchStatus && matchDate && agendamento.cliente === 'João Silva';
    }
    
    // Se for barbeiro, mostrar apenas seus agendamentos
    if (userRole === 'barbeiro') {
      return matchStatus && matchDate && agendamento.barbeiro === 'Carlos Silva';
    }
    
    // Gerente vê todos
    return matchStatus && matchDate;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmado': return 'status-confirmado';
      case 'pendente': return 'status-pendente';
      case 'cancelado': return 'status-cancelado';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmado': return <FaCheck />;
      case 'pendente': return <FaClock />;
      case 'cancelado': return <FaTimes />;
      default: return null;
    }
  };

  return (
    <div className="agendamentos-container">
      <div className="page-header">
        <div className="header-left">
          <Link to="/dashboard" className="back-button">
            <FaArrowLeft /> Voltar
          </Link>
          <div>
            <h1>
              {userRole === 'cliente' ? 'Meus Agendamentos' : 'Agendamentos'}
            </h1>
            <p className="page-subtitle">
              {userRole === 'cliente' ? 'Visualize e gerencie seus agendamentos' : 'Gerencie todos os agendamentos do sistema'}
            </p>
          </div>
        </div>
        <button onClick={onLogout} className="btn btn-outline">
          Sair
        </button>
      </div>

      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="agendamentos-content">
        <div className="filters-bar">
          <div className="filter-group">
            <label>
              <FaFilter /> Filtrar por Status:
            </label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="todos">Todos</option>
              <option value="confirmado">Confirmados</option>
              <option value="pendente">Pendentes</option>
              <option value="cancelado">Cancelados</option>
            </select>
          </div>
          <div className="filter-group">
            <label>
              <FaCalendarAlt /> Filtrar por Data:
            </label>
            <input 
              type="date" 
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="filter-input"
            />
          </div>
          {filterDate && (
            <button 
              onClick={() => setFilterDate('')}
              className="btn btn-secondary"
            >
              Limpar Filtros
            </button>
          )}
        </div>

        <div className="agendamentos-grid">
          {filteredAgendamentos.length > 0 ? (
            filteredAgendamentos.map(agendamento => (
              <div key={agendamento.id} className="agendamento-card">
                <div className="agendamento-header">
                  <div className={`agendamento-status ${getStatusColor(agendamento.status)}`}>
                    {getStatusIcon(agendamento.status)}
                    {agendamento.status}
                  </div>
                  <div className="agendamento-valor">
                    {agendamento.valor}
                  </div>
                </div>
                
                <div className="agendamento-body">
                  <div className="agendamento-info">
                    <p>
                      <FaUser /> <strong>Cliente:</strong> {agendamento.cliente}
                    </p>
                    <p>
                      <FaUserTie /> <strong>Barbeiro:</strong> {agendamento.barbeiro}
                    </p>
                    <p>
                      <FaCut /> <strong>Serviço:</strong> {agendamento.servico}
                    </p>
                  </div>
                  
                  <div className="agendamento-datetime">
                    <div className="datetime-item">
                      <FaCalendarAlt />
                      <span>{new Date(agendamento.data + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="datetime-item">
                      <FaClock />
                      <span>{agendamento.horario}</span>
                    </div>
                  </div>
                </div>
                
                <div className="agendamento-actions">
                  {agendamento.status === 'pendente' && (
                    <>
                      <button 
                        onClick={() => handleConfirm(agendamento.id)}
                        className="btn-action btn-confirm"
                        title="Confirmar"
                      >
                        <FaCheck /> Confirmar
                      </button>
                      <button 
                        onClick={() => handleReschedule(agendamento)}
                        className="btn-action btn-reschedule"
                        title="Remarcar"
                      >
                        <FaEdit /> Remarcar
                      </button>
                    </>
                  )}
                  {agendamento.status !== 'cancelado' && (
                    <button 
                      onClick={() => handleCancel(agendamento.id)}
                      className="btn-action btn-cancel"
                      title="Cancelar"
                    >
                      <FaTimes /> Cancelar
                    </button>
                  )}
                  {userRole === 'gerente' && (
                    <button 
                      onClick={() => handleDelete(agendamento.id)}
                      className="btn-action btn-delete"
                      title="Excluir"
                    >
                      <FaTrash /> Excluir
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <FaCalendarAlt className="no-results-icon" />
              <h3>Nenhum agendamento encontrado</h3>
              <p>Não há agendamentos com os filtros selecionados.</p>
              <Link to="/novo-agendamento" className="btn btn-primary">
                Criar Novo Agendamento
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agendamentos;
