import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaCut, FaChevronLeft, FaChevronRight, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import './LoginCarousel.css';

const LoginCarousel = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cliente');
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Dados estáticos de usuários
  const users = {
    gerente: { email: 'gerente@barbearia.com', password: '123456' },
    barbeiro: { email: 'barbeiro@barbearia.com', password: '123456' },
    cliente: { email: 'cliente@barbearia.com', password: '123456' }
  };

  // Slides do carrossel
  const slides = [
    {
      title: "Agendamento Online 24h",
      subtitle: "Agende seu horário a qualquer momento",
      description: "Sistema moderno e intuitivo para você agendar quando quiser",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800"
    },
    {
      title: "Profissionais Qualificados",
      subtitle: "Os melhores barbeiros da cidade",
      description: "Equipe treinada e experiente para cuidar do seu visual",
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800"
    },
    {
      title: "Horários Flexíveis",
      subtitle: "Atendimento que se adapta à sua rotina",
      description: "Funcionamos em horários especiais para sua comodidade",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800"
    },
    {
      title: "Ambiente Premium",
      subtitle: "Experiência única e exclusiva",
      description: "Conforto e qualidade em cada detalhe do atendimento",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800"
    }
  ];

  // Auto-play do carrossel
  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [currentSlide, isAutoPlaying, slides.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (users[role].email === email && users[role].password === password) {
      onLogin(role);
    } else {
      setError('Email ou senha incorretos');
    }
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="login-carousel-container">
      {/* Lado Esquerdo - Carrossel */}
      <div className="carousel-section">
        <div className="carousel-wrapper">
          <div className="carousel-slides">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${slide.image})`,
                  transform: `translateX(${(index - currentSlide) * 100}%)`
                }}
              >
                <div className="slide-content">
                  <h1 className="slide-title">{slide.title}</h1>
                  <h3 className="slide-subtitle">{slide.subtitle}</h3>
                  <p className="slide-description">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Controles do Carrossel */}
          <button className="carousel-control prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className="carousel-control next" onClick={nextSlide}>
            <FaChevronRight />
          </button>

          {/* Indicadores */}
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Informações da Barbearia */}
        <div className="barbershop-info">
          <div className="info-header">
            <FaCut className="brand-icon" />
            <h2>BarberPro Premium</h2>
          </div>
          <div className="info-stats">
            <div className="stat">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Clientes Satisfeitos</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.9★</span>
              <span className="stat-label">Avaliação</span>
            </div>
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Anos de Experiência</span>
            </div>
          </div>
          <div className="social-links">
            <a href="#" className="social-link"><FaWhatsapp /></a>
            <a href="#" className="social-link"><FaInstagram /></a>
            <a href="#" className="social-link"><FaFacebook /></a>
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário de Login */}
      <div className="login-section">
        <div className="login-card-modern">
          <div className="login-header-modern">
            <div className="logo-wrapper-modern">
              <FaCut className="login-icon-modern" />
            </div>
            <h1>Bem-vindo de volta!</h1>
            <p className="login-subtitle-modern">Faça login para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form-modern">
            <div className="form-group-modern">
              <label className="form-label-modern">Perfil de Acesso</label>
              <div className="profile-selector">
                <button
                  type="button"
                  className={`profile-btn ${role === 'cliente' ? 'active' : ''}`}
                  onClick={() => setRole('cliente')}
                >
                  Cliente
                </button>
                <button
                  type="button"
                  className={`profile-btn ${role === 'barbeiro' ? 'active' : ''}`}
                  onClick={() => setRole('barbeiro')}
                >
                  Barbeiro
                </button>
                <button
                  type="button"
                  className={`profile-btn ${role === 'gerente' ? 'active' : ''}`}
                  onClick={() => setRole('gerente')}
                >
                  Gerente
                </button>
              </div>
            </div>

            <div className="form-group-modern">
              <label className="form-label-modern">
                <FaUser /> Email
              </label>
              <input
                type="email"
                className="form-control-modern"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="form-group-modern">
              <label className="form-label-modern">
                <FaLock /> Senha
              </label>
              <input
                type="password"
                className="form-control-modern"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Lembrar-me</span>
              </label>
              <a href="#" className="forgot-password">Esqueceu a senha?</a>
            </div>

            {error && <div className="alert alert-error-modern">{error}</div>}

            <button type="submit" className="btn-login-modern">
              Entrar no Sistema
            </button>

            <div className="divider">
              <span>ou</span>
            </div>

            <button type="button" className="btn-register">
              Criar Nova Conta
            </button>
          </form>

          <div className="login-footer-modern">
            <p className="footer-title-modern">Ambiente de Demonstração</p>
            <div className="demo-credentials">
              <div className="credential-pill">
                <span className="role">Cliente:</span>
                <span className="email">cliente@barbearia.com</span>
              </div>
              <div className="credential-pill">
                <span className="role">Barbeiro:</span>
                <span className="email">barbeiro@barbearia.com</span>
              </div>
              <div className="credential-pill">
                <span className="role">Gerente:</span>
                <span className="email">gerente@barbearia.com</span>
              </div>
              <div className="password-hint">Senha padrão: <strong>123456</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCarousel;
