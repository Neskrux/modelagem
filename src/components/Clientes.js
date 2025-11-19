import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUserPlus, FaEdit, FaTrash, FaSearch, FaPhone, FaEnvelope, FaUser } from 'react-icons/fa';
import './Clientes.css';

const Clientes = ({ onLogout }) => {
  const [clientes, setClientes] = useState([
    { id: 1, nome: 'João Silva', telefone: '(11) 98765-4321', email: 'joao@email.com', dataCadastro: '2024-01-15' },
    { id: 2, nome: 'Pedro Santos', telefone: '(11) 97654-3210', email: 'pedro@email.com', dataCadastro: '2024-01-20' },
    { id: 3, nome: 'Lucas Oliveira', telefone: '(11) 96543-2109', email: 'lucas@email.com', dataCadastro: '2024-02-01' },
    { id: 4, nome: 'Marcos Costa', telefone: '(11) 95432-1098', email: 'marcos@email.com', dataCadastro: '2024-02-10' },
    { id: 5, nome: 'André Ferreira', telefone: '(11) 94321-0987', email: 'andre@email.com', dataCadastro: '2024-02-15' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: ''
  });
  const [notification, setNotification] = useState(null);

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
    
    if (!formData.nome || !formData.telefone || !formData.email) {
      showNotification('Por favor, preencha todos os campos', 'error');
      return;
    }

    if (editingClient) {
      // Editar cliente existente
      setClientes(clientes.map(c => 
        c.id === editingClient.id 
          ? { ...c, ...formData }
          : c
      ));
      showNotification('Cliente atualizado com sucesso!');
    } else {
      // Adicionar novo cliente
      const newClient = {
        id: clientes.length + 1,
        ...formData,
        dataCadastro: new Date().toISOString().split('T')[0]
      };
      setClientes([...clientes, newClient]);
      showNotification('Cliente cadastrado com sucesso!');
    }

    // Limpar formulário
    setFormData({ nome: '', telefone: '', email: '' });
    setEditingClient(null);
    setShowForm(false);
  };

  const handleEdit = (cliente) => {
    setEditingClient(cliente);
    setFormData({
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClientes(clientes.filter(c => c.id !== id));
      showNotification('Cliente excluído com sucesso!');
    }
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm)
  );

  return (
    <div className="clientes-container">
      <div className="page-header">
        <div className="header-left">
          <Link to="/dashboard" className="back-button">
            <FaArrowLeft /> Voltar
          </Link>
          <h1>Gerenciar Clientes</h1>
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

      <div className="clientes-content">
        <div className="page-section-header">
          <div>
            <h2>Cadastro de Clientes</h2>
            <p className="page-description">Gerencie o cadastro de clientes da barbearia</p>
          </div>
        </div>
        
        <div className="actions-bar">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            onClick={() => {
              setShowForm(true);
              setEditingClient(null);
              setFormData({ nome: '', telefone: '', email: '' });
            }} 
            className="btn btn-primary"
          >
            <FaUserPlus /> Adicionar Cliente
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <h2>{editingClient ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Nome Completo <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="nome"
                    className="form-control"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Ex: João Silva"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Telefone <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    className="form-control"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    placeholder="(11) 98765-4321"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="joao.silva@email.com"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-success">
                  {editingClient ? 'Atualizar' : 'Cadastrar'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingClient(null);
                    setFormData({ nome: '', telefone: '', email: '' });
                  }} 
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="clientes-table-card">
          <div className="table-header">
            <h2>Clientes Cadastrados</h2>
            <span className="table-count">{filteredClientes.length} {filteredClientes.length === 1 ? 'cliente' : 'clientes'}</span>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th>Data de Cadastro</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.length > 0 ? (
                  filteredClientes.map(cliente => (
                    <tr key={cliente.id}>
                      <td>#{cliente.id}</td>
                      <td>
                        <div className="client-name">
                          <FaUser className="client-icon" />
                          {cliente.nome}
                        </div>
                      </td>
                      <td>{cliente.telefone}</td>
                      <td>{cliente.email}</td>
                      <td>{new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            onClick={() => handleEdit(cliente)} 
                            className="btn-action btn-edit"
                            title="Editar"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => handleDelete(cliente.id)} 
                            className="btn-action btn-delete"
                            title="Excluir"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      {searchTerm ? 'Nenhum cliente encontrado com os critérios de busca.' : 'Nenhum cliente cadastrado.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
