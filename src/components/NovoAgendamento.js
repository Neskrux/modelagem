import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarPlus, FaUser, FaUserTie, FaCut, FaCalendarAlt, FaClock, FaMoneyBillWave, FaCheck, FaEnvelope } from 'react-icons/fa';
import './NovoAgendamento.css';

const NovoAgendamento = ({ userRole, onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cliente: userRole === 'cliente' ? 'João Silva' : '',
    barbeiro: '',
    servico: '',
    data: '',
    horario: ''
  });
  const [notification, setNotification] = useState(null);

  // Dados estáticos
  const clientes = [
    'João Silva',
    'Pedro Santos',
    'Lucas Oliveira',
    'Marcos Costa',
    'André Ferreira',
    'Bruno Lima'
  ];

  const barbeiros = [
    { nome: 'Carlos Silva', especialidades: ['Corte', 'Barba', 'Pigmentação'] },
    { nome: 'André Santos', especialidades: ['Corte', 'Barba'] },
    { nome: 'Roberto Oliveira', especialidades: ['Corte', 'Coloração', 'Desenho'] },
    { nome: 'Paulo Costa', especialidades: ['Corte Infantil', 'Corte', 'Barba'] }
  ];

  const servicos = [
    { nome: 'Corte', preco: 40, duracao: '30 min' },
    { nome: 'Barba', preco: 25, duracao: '20 min' },
    { nome: 'Corte + Barba', preco: 65, duracao: '50 min' },
    { nome: 'Pigmentação', preco: 80, duracao: '60 min' },
    { nome: 'Coloração', preco: 60, duracao: '45 min' },
    { nome: 'Desenho', preco: 20, duracao: '15 min' },
    { nome: 'Corte Infantil', preco: 35, duracao: '25 min' },
    { nome: 'Sobrancelha', preco: 15, duracao: '10 min' },
    { nome: 'Corte + Barba + Sobrancelha', preco: 75, duracao: '60 min' }
  ];

  const horariosDisponiveis = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
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
    
    // Validar campos obrigatórios
    const cliente = userRole === 'cliente' ? 'João Silva' : formData.cliente;
    
    if (!cliente || !formData.barbeiro || !formData.servico || !formData.data || !formData.horario) {
      showNotification('Por favor, preencha todos os campos', 'error');
      return;
    }

    // Validar se a data não é passada
    const selectedDate = new Date(formData.data);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      showNotification('Não é possível agendar para datas passadas', 'error');
      return;
    }

    // Simular criação do agendamento
    showNotification('Agendamento criado com sucesso! Aguardando confirmação.');
    
    // Redirecionar após 2 segundos
    setTimeout(() => {
      navigate('/agendamentos');
    }, 2000);
  };

  const getServicoInfo = () => {
    const servico = servicos.find(s => s.nome === formData.servico);
    return servico || null;
  };

  const getBarbeirosForServico = () => {
    if (!formData.servico) return barbeiros;
    
    // Filtrar barbeiros que podem fazer o serviço selecionado
    return barbeiros.filter(barbeiro => {
      const servicoBase = formData.servico.split(' ')[0]; // Pega a primeira palavra do serviço
      return barbeiro.especialidades.some(esp => 
        formData.servico.includes(esp) || esp.includes(servicoBase)
      );
    });
  };

  const servicoInfo = getServicoInfo();
  const barbeirosDisponiveis = getBarbeirosForServico();

  return (
    <div className="novo-agendamento-container">
      <div className="page-header">
        <div className="header-left">
          <Link to="/dashboard" className="back-button">
            <FaArrowLeft /> Voltar
          </Link>
          <h1>Novo Agendamento</h1>
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

      <div className="novo-agendamento-content">
        <div className="form-container">
          <div className="form-header">
            <FaCalendarPlus className="form-icon" />
            <h2>Agendar Atendimento</h2>
            <p>Preencha os campos abaixo para criar um novo agendamento</p>
          </div>

          <form onSubmit={handleSubmit} className="agendamento-form">
            {/* Cliente */}
            <div className="form-group">
              <label className="form-label">
                <FaUser /> Cliente
              </label>
              {userRole === 'cliente' ? (
                <input
                  type="text"
                  name="cliente"
                  className="form-control"
                  value={formData.cliente}
                  disabled
                  readOnly
                />
              ) : (
                <select
                  name="cliente"
                  className="form-control"
                  value={formData.cliente}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione o cliente</option>
                  {clientes.map((cliente, index) => (
                    <option key={index} value={cliente}>{cliente}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Serviço */}
            <div className="form-group">
              <label className="form-label">
                <FaCut /> Serviço
              </label>
              <select
                name="servico"
                className="form-control"
                value={formData.servico}
                onChange={handleInputChange}
              >
                <option value="">Selecione o serviço</option>
                {servicos.map((servico, index) => (
                  <option key={index} value={servico.nome}>
                    {servico.nome} - R$ {servico.preco},00 ({servico.duracao})
                  </option>
                ))}
              </select>
            </div>

            {/* Barbeiro */}
            <div className="form-group">
              <label className="form-label">
                <FaUserTie /> Barbeiro
              </label>
              <select
                name="barbeiro"
                className="form-control"
                value={formData.barbeiro}
                onChange={handleInputChange}
                disabled={!formData.servico}
              >
                <option value="">
                  {formData.servico ? 'Selecione o barbeiro' : 'Primeiro selecione um serviço'}
                </option>
                {barbeirosDisponiveis.map((barbeiro, index) => (
                  <option key={index} value={barbeiro.nome}>
                    {barbeiro.nome}
                  </option>
                ))}
              </select>
              {formData.servico && barbeirosDisponiveis.length === 0 && (
                <small className="form-error">
                  Nenhum barbeiro disponível para este serviço
                </small>
              )}
            </div>

            {/* Data e Horário */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <FaCalendarAlt /> Data
                </label>
                <input
                  type="date"
                  name="data"
                  className="form-control"
                  value={formData.data}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaClock /> Horário
                </label>
                <select
                  name="horario"
                  className="form-control"
                  value={formData.horario}
                  onChange={handleInputChange}
                  disabled={!formData.data || !formData.barbeiro}
                >
                  <option value="">
                    {formData.data && formData.barbeiro ? 'Selecione o horário' : 'Primeiro selecione data e barbeiro'}
                  </option>
                  {horariosDisponiveis.map((horario, index) => (
                    <option key={index} value={horario}>{horario}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resumo do Agendamento */}
            {servicoInfo && formData.barbeiro && formData.data && formData.horario && (
              <div className="agendamento-resumo">
                <h3>Resumo do Agendamento</h3>
                <div className="resumo-grid">
                  <div className="resumo-item">
                    <span className="resumo-label">Cliente:</span>
                    <span className="resumo-value">
                      {userRole === 'cliente' ? 'João Silva' : formData.cliente}
                    </span>
                  </div>
                  <div className="resumo-item">
                    <span className="resumo-label">Barbeiro:</span>
                    <span className="resumo-value">{formData.barbeiro}</span>
                  </div>
                  <div className="resumo-item">
                    <span className="resumo-label">Serviço:</span>
                    <span className="resumo-value">{formData.servico}</span>
                  </div>
                  <div className="resumo-item">
                    <span className="resumo-label">Data:</span>
                    <span className="resumo-value">
                      {new Date(formData.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="resumo-item">
                    <span className="resumo-label">Horário:</span>
                    <span className="resumo-value">{formData.horario}</span>
                  </div>
                  <div className="resumo-item">
                    <span className="resumo-label">Duração:</span>
                    <span className="resumo-value">{servicoInfo.duracao}</span>
                  </div>
                  <div className="resumo-item total">
                    <span className="resumo-label">
                      <FaMoneyBillWave /> Valor Total:
                    </span>
                    <span className="resumo-value">R$ {servicoInfo.preco},00</span>
                  </div>
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-large">
                <FaCheck /> Confirmar Agendamento
              </button>
              <Link to="/agendamentos" className="btn btn-secondary btn-large">
                Cancelar
              </Link>
            </div>
          </form>
        </div>

        {/* Card de Informações */}
        <div className="info-cards">
          <div className="info-card">
            <h3><FaClock /> Horário de Funcionamento</h3>
            <p>Segunda a Sexta: 08:00 - 19:00</p>
            <p>Sábado: 08:00 - 15:00</p>
            <p>Domingo: Fechado</p>
          </div>

          <div className="info-card">
            <h3><FaCalendarAlt /> Localização</h3>
            <p>Rua das Barbas, 123</p>
            <p>Centro - São Paulo/SP</p>
            <p>CEP: 01234-567</p>
          </div>

          <div className="info-card">
            <h3><FaEnvelope /> Contato</h3>
            <p>Telefone: (11) 3333-4444</p>
            <p>WhatsApp: (11) 99999-8888</p>
            <p>Email: contato@barbearia.com</p>
          </div>

          <div className="info-card highlight">
            <h3>Política de Cancelamento</h3>
            <p>Cancelamentos devem ser feitos com pelo menos 2 horas de antecedência.</p>
            <p>Em caso de não comparecimento, poderá ser cobrada uma taxa.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovoAgendamento;
