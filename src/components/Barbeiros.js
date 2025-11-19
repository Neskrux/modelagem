import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUserTie, FaEdit, FaTrash, FaSearch, FaPhone, FaEnvelope, FaCut, FaClock, FaStar } from 'react-icons/fa';
import './Barbeiros.css';

const Barbeiros = ({ onLogout }) => {
  const [barbeiros, setBarbeiros] = useState([
    { 
      id: 1, 
      nome: 'Carlos Silva', 
      telefone: '(11) 98765-1111', 
      email: 'carlos@barbearia.com',
      especialidades: ['Corte', 'Barba', 'Pigmentação'],
      horarios: 'Seg-Sex: 9h-18h, Sáb: 9h-14h',
      avaliacao: 4.8
    },
    { 
      id: 2, 
      nome: 'André Santos', 
      telefone: '(11) 98765-2222', 
      email: 'andre@barbearia.com',
      especialidades: ['Corte', 'Barba'],
      horarios: 'Seg-Sex: 10h-19h, Sáb: 10h-15h',
      avaliacao: 4.6
    },
    { 
      id: 3, 
      nome: 'Roberto Oliveira', 
      telefone: '(11) 98765-3333', 
      email: 'roberto@barbearia.com',
      especialidades: ['Corte', 'Coloração', 'Desenho'],
      horarios: 'Ter-Sáb: 9h-18h',
      avaliacao: 4.9
    },
    { 
      id: 4, 
      nome: 'Paulo Costa', 
      telefone: '(11) 98765-4444', 
      email: 'paulo@barbearia.com',
      especialidades: ['Corte Infantil', 'Corte', 'Barba'],
      horarios: 'Seg-Sex: 8h-17h',
      avaliacao: 4.7
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingBarbeiro, setEditingBarbeiro] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    especialidades: '',
    horarios: ''
  });
  const [notification, setNotification] = useState(null);

  const especialidadesDisponiveis = [
    'Corte', 
    'Barba', 
    'Pigmentação', 
    'Coloração', 
    'Desenho', 
    'Corte Infantil',
    'Tratamento Capilar',
    'Sobrancelha'
  ];

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.telefone || !formData.email || !formData.especialidades || !formData.horarios) {
      showNotification('Por favor, preencha todos os campos', 'error');
      return;
    }

    const especialidadesArray = formData.especialidades.split(',').map(e => e.trim());

    if (editingBarbeiro) {
      // Editar barbeiro existente
      setBarbeiros(barbeiros.map(b => 
        b.id === editingBarbeiro.id 
          ? { ...b, ...formData, especialidades: especialidadesArray, avaliacao: b.avaliacao }
          : b
      ));
      showNotification('Barbeiro atualizado com sucesso!');
    } else {
      // Adicionar novo barbeiro
      const newBarbeiro = {
        id: barbeiros.length + 1,
        ...formData,
        especialidades: especialidadesArray,
        avaliacao: 5.0
      };
      setBarbeiros([...barbeiros, newBarbeiro]);
      showNotification('Barbeiro cadastrado com sucesso!');
    }

    // Limpar formulário
    setFormData({ nome: '', telefone: '', email: '', especialidades: '', horarios: '' });
    setEditingBarbeiro(null);
    setShowForm(false);
  };

  const handleEdit = (barbeiro) => {
    setEditingBarbeiro(barbeiro);
    setFormData({
      nome: barbeiro.nome,
      telefone: barbeiro.telefone,
      email: barbeiro.email,
      especialidades: barbeiro.especialidades.join(', '),
      horarios: barbeiro.horarios
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este barbeiro?')) {
      setBarbeiros(barbeiros.filter(b => b.id !== id));
      showNotification('Barbeiro excluído com sucesso!');
    }
  };

  const filteredBarbeiros = barbeiros.filter(barbeiro =>
    barbeiro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    barbeiro.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    barbeiro.especialidades.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="barbeiros-container">
      <div className="page-header">
        <div className="header-left">
          <Link to="/dashboard" className="back-button">
            <FaArrowLeft /> Voltar
          </Link>
          <h1>Gerenciar Barbeiros</h1>
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

      <div className="barbeiros-content">
        <div className="actions-bar">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou especialidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            onClick={() => {
              setShowForm(true);
              setEditingBarbeiro(null);
              setFormData({ nome: '', telefone: '', email: '', especialidades: '', horarios: '' });
            }} 
            className="btn btn-primary"
          >
            <FaUserTie /> Novo Barbeiro
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <h2>{editingBarbeiro ? 'Editar Barbeiro' : 'Cadastrar Novo Barbeiro'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <FaUserTie /> Nome Completo
                  </label>
                  <input
                    type="text"
                    name="nome"
                    className="form-control"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Digite o nome completo"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FaPhone /> Telefone
                  </label>
                  <input
                    type="text"
                    name="telefone"
                    className="form-control"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">
                  <FaEnvelope /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@barbearia.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <FaCut /> Especialidades
                </label>
                <input
                  type="text"
                  name="especialidades"
                  className="form-control"
                  value={formData.especialidades}
                  onChange={handleInputChange}
                  placeholder="Ex: Corte, Barba, Coloração (separadas por vírgula)"
                />
                <small className="form-hint">
                  Opções disponíveis: {especialidadesDisponiveis.join(', ')}
                </small>
              </div>
              <div className="form-group">
                <label className="form-label">
                  <FaClock /> Horários de Trabalho
                </label>
                <input
                  type="text"
                  name="horarios"
                  className="form-control"
                  value={formData.horarios}
                  onChange={handleInputChange}
                  placeholder="Ex: Seg-Sex: 9h-18h, Sáb: 9h-14h"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-success">
                  {editingBarbeiro ? 'Atualizar' : 'Cadastrar'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingBarbeiro(null);
                    setFormData({ nome: '', telefone: '', email: '', especialidades: '', horarios: '' });
                  }} 
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="barbeiros-grid">
          {filteredBarbeiros.length > 0 ? (
            filteredBarbeiros.map(barbeiro => (
              <div key={barbeiro.id} className="barbeiro-card">
                <div className="barbeiro-header">
                  <div className="barbeiro-avatar">
                    <FaUserTie />
                  </div>
                  <div className="barbeiro-rating">
                    <FaStar className="star-icon" />
                    <span>{barbeiro.avaliacao}</span>
                  </div>
                </div>
                <div className="barbeiro-info">
                  <h3>{barbeiro.nome}</h3>
                  <p className="barbeiro-contact">
                    <FaPhone /> {barbeiro.telefone}
                  </p>
                  <p className="barbeiro-contact">
                    <FaEnvelope /> {barbeiro.email}
                  </p>
                  <div className="barbeiro-especialidades">
                    {barbeiro.especialidades.map((esp, index) => (
                      <span key={index} className="especialidade-tag">
                        {esp}
                      </span>
                    ))}
                  </div>
                  <p className="barbeiro-horarios">
                    <FaClock /> {barbeiro.horarios}
                  </p>
                </div>
                <div className="barbeiro-actions">
                  <button 
                    onClick={() => handleEdit(barbeiro)} 
                    className="btn-action btn-edit"
                    title="Editar"
                  >
                    <FaEdit /> Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(barbeiro.id)} 
                    className="btn-action btn-delete"
                    title="Excluir"
                  >
                    <FaTrash /> Excluir
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              {searchTerm ? 'Nenhum barbeiro encontrado com os critérios de busca.' : 'Nenhum barbeiro cadastrado.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Barbeiros;
