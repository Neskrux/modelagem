# Documentação Completa - Sistema de Agendamento de Barbearia
## Diagramas UML e Especificações

---

## 1. DIAGRAMAS DE MÁQUINA DE ESTADOS

### 1.1 Diagrama de Estados - Agendamento

Este diagrama representa os estados pelos quais um agendamento passa durante seu ciclo de vida no sistema.

#### Estados Principais:
- **Criado**: Estado inicial quando um agendamento é solicitado
- **Pendente**: Aguardando confirmação do barbeiro
- **Confirmado**: Agendamento confirmado e horário bloqueado
- **Remarcado**: Agendamento com nova data/hora
- **Em Andamento**: Serviço sendo executado
- **Concluído**: Serviço finalizado e pago
- **Cancelado**: Agendamento cancelado
- **Não Compareceu**: Cliente faltou ao agendamento
- **Avaliado**: Agendamento com avaliação do cliente

#### Elementos UML Implementados:
- **Ações de Entrada**: 
  - `entry: registrarDataCriacao()` no estado Criado
  - `entry: enviarNotificacaoBarbeiro()` no estado Pendente
  - `entry: bloquearHorarioAgenda()` no estado Confirmado
  
- **Ações de Saída**:
  - `exit: notificarCriacao()` ao sair de Criado
  - `exit: liberarRecursos()` ao sair de Confirmado
  - `exit: arquivarHistorico()` ao sair de Concluído

- **Condições de Guarda**:
  - `[dadosCompletos]` para transição Criado → Pendente
  - `[barbeiroDisponivel && horarioLivre]` para Pendente → Confirmado
  - `[motivoCancelamento != null]` para Pendente → Cancelado
  - `[tempoEspera > 15min]` para Confirmado → NaoCompareceu

- **Eventos**:
  - `criar()`, `solicitar()`, `confirmar()`, `cancelar()`
  - `remarcar()`, `iniciar()`, `finalizar()`, `avaliar()`

### 1.2 Diagrama de Estados - Usuário

Este diagrama mapeia os estados de um usuário no sistema, desde o cadastro até possível exclusão.

#### Estados Principais com Subestados:

**Estado Composto: Ativo**
- Subestado **Cliente**: Acesso limitado aos próprios agendamentos
- Subestado **Barbeiro**: Acesso à agenda e clientes
- Subestado **Gerente**: Acesso total ao sistema

#### Elementos UML Implementados:
- **Ações de Entrada**:
  - `entry: criarSessao()` no estado Ativo
  - `entry: gerarTokenAtivacao()` em PendenteAtivacao
  - `entry: verificarCredenciais()` em Autenticando

- **Ações de Saída**:
  - `exit: salvarAtividades()` ao sair de Ativo
  - `exit: limparToken()` ao sair de PendenteAtivacao
  - `exit: registrarDesbloqueio()` ao sair de Bloqueado

- **Condições de Guarda**:
  - `[tokenValido && !expirado]` para ativação
  - `[credenciaisValidas && contaAtiva]` para autenticação
  - `[tentativas > 5]` para bloqueio
  - `[tempo > 30min]` para suspensão por inatividade

---

## 2. DIAGRAMAS DE ATIVIDADES

### 2.1 Processo Completo de Agendamento

**Granularidade**: Caso de Uso completo
**Atores**: Cliente, Sistema, Barbeiro, Gerente

#### Construções de Paralelismo Implementadas:
```
fork
  :Buscar barbeiros cadastrados;
fork again
  :Verificar horários disponíveis;
fork again
  :Carregar tabela de preços;
end fork
```

#### Condições Implementadas:
- Verificação de credenciais válidas
- Disponibilidade de barbeiro
- Validações de conflito de agenda
- Confirmação de agendamento

#### Regras de Negócio Representadas:
- Reserva temporária de 5 minutos
- Envio de lembretes (24h, 2h, 30min antes)
- Política de no-show
- Solicitação de avaliação pós-atendimento

### 2.2 Processo de Login e Autenticação

**Granularidade**: Nível de método detalhado
**Componentes**: Usuário, Sistema Frontend, Sistema Backend, Banco de Dados

#### Paralelismo na Validação de Segurança:
```
fork
  :Verificar rate limiting;
fork again
  :Validar origem da requisição;
fork again
  :Verificar blacklist de IPs;
end fork
```

#### Condições e Regras de Negócio:
- Máximo 5 tentativas em 15 minutos
- Diferentes fluxos por tipo de perfil
- Geração de token JWT com refresh token
- Bloqueio temporário por tentativas excessivas

### 2.3 Gestão de Barbeiros

**Granularidade**: Processo de negócio completo
**Ator Principal**: Gerente

#### Atividades Paralelas:
```
fork
  :Buscar lista de barbeiros ativos;
fork again
  :Buscar barbeiros inativos;
fork again
  :Carregar estatísticas gerais;
fork again
  :Verificar solicitações pendentes;
end fork
```

#### Subprocessos Detalhados:
- Cadastro de novo barbeiro com validações
- Edição com verificação de impactos
- Gestão de agenda e bloqueios
- Avaliação de desempenho com métricas
- Processo de desativação/demissão

### 2.4 Confirmação de Agendamento (Nível Método)

**Granularidade**: Especificação de método `confirmarAgendamento()`
**Detalhamento**: Nível de implementação

#### Processos Paralelos:
```
fork
  :enviarEmail();
fork again
  :enviarSMS();
fork again
  :enviarPush();
fork again
  :criarNotificacaoInterna();
end fork
```

#### Detalhes Técnicos:
- Queries SQL específicas
- Tratamento de transações
- Geração de código de confirmação
- Registro de auditoria
- Tratamento de exceções

### 2.5 Cancelamento com Política de Multas

**Granularidade**: Regra de negócio complexa
**Foco**: Política de cancelamento

#### Regras de Negócio Implementadas:
- **Mais de 24h**: Sem multa
- **Entre 2h e 24h**: Multa de 30%
- **Menos de 2h**: Multa de 50%
- **Não comparecimento**: Multa de 100%

#### Processos Paralelos:
- Atualização de registros
- Processamento de reembolso/crédito
- Envio de notificações múltiplas
- Verificação de lista de espera

---

## 3. DIAGRAMA DE NAVEGAÇÃO DE TELAS

### Estrutura de Navegação

#### Ponto de Entrada:
- **Tela de Login**: Autenticação única para todos os perfis

#### Dashboards por Perfil:
1. **Dashboard Cliente**
   - Acesso: Meus agendamentos, Novo agendamento, Perfil
   
2. **Dashboard Barbeiro**
   - Acesso: Agenda pessoal, Clientes, Financeiro, Avaliações
   
3. **Dashboard Gerente**
   - Acesso: Todas as funcionalidades do sistema

#### Módulos Principais:
- Agendamentos
- Clientes
- Barbeiros
- Serviços
- Relatórios
- Financeiro
- Configurações

#### Características da Navegação:
- Navegação contextual baseada em perfil
- Retorno sempre disponível
- Logout acessível de qualquer tela
- Fluxos otimizados por tipo de usuário

---

## 4. PROTÓTIPO DE TELAS

### Telas Principais Implementadas:

#### 4.1 Tela de Login
**Componentes**:
- Seleção de perfil (Cliente/Barbeiro/Gerente)
- Campos de email e senha
- Link para recuperação de senha
- Exibição de credenciais demo

#### 4.2 Dashboard
**Seções por Perfil**:
- **Cliente**: Cards de próximos agendamentos, ações rápidas
- **Barbeiro**: Agenda do dia, estatísticas pessoais
- **Gerente**: Métricas gerais, gráficos, alertas

#### 4.3 Tela de Agendamentos
**Funcionalidades**:
- Lista com cards visuais
- Filtros por status e data
- Ações contextuais (confirmar, cancelar, remarcar)
- Indicadores visuais de status

#### 4.4 Novo Agendamento
**Fluxo de Entrada**:
1. Seleção de cliente (se não for cliente logado)
2. Escolha do serviço
3. Seleção do barbeiro (filtrado por especialidade)
4. Escolha de data e horário
5. Resumo e confirmação

**Validações em Tempo Real**:
- Barbeiros disponíveis para o serviço
- Horários livres na agenda
- Cálculo automático de valor

---

## 5. ITENS DE CRIATIVIDADE E INOVAÇÃO

### 5.1 Inovações no Projeto (Documento)

#### Diagramas de Estados Avançados:
- **Subestados para perfis de usuário**: Implementação de estados compostos mostrando diferentes comportamentos por tipo de usuário
- **Ações detalhadas de entrada/saída**: Especificação completa de métodos executados em cada transição
- **Condições de guarda complexas**: Múltiplas validações em uma única transição

#### Diagramas de Atividades Multi-nível:
- **Granularidade variada**: Desde casos de uso até implementação de métodos
- **Paralelismo extensivo**: Uso intensivo de fork/join para operações simultâneas
- **Swimlanes detalhadas**: Separação clara de responsabilidades por ator/sistema

### 5.2 Inovações no Produto (Sistema)

#### Sistema de Notificações Inteligente:
- **Multi-canal**: Email, SMS, Push e notificações internas simultâneas
- **Lembretes escalonados**: 24h, 2h e 30min antes do agendamento
- **Lista de espera automática**: Notifica clientes quando horários são liberados

#### Política de Cancelamento Flexível:
- **Multas progressivas**: Sistema justo baseado em antecedência
- **Múltiplas opções de reembolso**: Crédito, devolução ou vale
- **Exceções inteligentes**: Reconhece emergências médicas e falhas do sistema

#### Gestão Avançada de Agenda:
- **Reserva temporária**: 5 minutos para evitar conflitos durante agendamento
- **Bloqueios inteligentes**: Sistema calcula slots de 15 minutos automaticamente
- **Redistribuição automática**: Sugere realocação quando barbeiro fica indisponível

#### Sistema de Métricas e Performance:
- **Dashboard em tempo real**: Atualização instantânea de métricas
- **Análise preditiva**: Identifica padrões de cancelamento
- **Ranking de barbeiros**: Gamificação para incentivar performance

#### Segurança e Auditoria:
- **Rate limiting inteligente**: Proteção contra ataques
- **Auditoria completa**: Log detalhado de todas as ações
- **Sessões com refresh token**: Segurança sem comprometer experiência

#### UX/UI Moderno:
- **Interface responsiva**: Adaptada para todos dispositivos
- **Cards visuais**: Informação organizada e acessível
- **Feedback visual imediato**: Notificações e animações contextuais
- **Modo escuro**: Opção de tema para conforto visual

### 5.3 Diferenciais Técnicos

#### Arquitetura Escalável:
- **Separação Frontend/Backend**: Permite evolução independente
- **Transações ACID**: Garantia de consistência de dados
- **Cache inteligente**: Otimização de performance

#### Integração de Serviços:
- **APIs externas**: SMS (Twilio), Push (Firebase), Pagamentos
- **Webhooks**: Notificações em tempo real
- **Backup automático**: Segurança de dados

---

## 6. CONCLUSÃO

Este projeto demonstra uma abordagem completa e profissional para modelagem de sistemas, utilizando:

1. **UML Avançado**: Todos os diagramas seguem rigorosamente a notação UML 2.5
2. **Múltiplas Perspectivas**: Visão estática (estados) e dinâmica (atividades)
3. **Granularidade Variada**: Desde visão macro até implementação de métodos
4. **Inovação Constante**: Funcionalidades que agregam valor real ao negócio
5. **Foco no Usuário**: UX pensada para diferentes perfis e necessidades

O sistema proposto não apenas atende aos requisitos básicos de um sistema de agendamento, mas adiciona camadas de inteligência, automação e conveniência que o destacam no mercado.

---

## 7. FERRAMENTAS UTILIZADAS

- **Modelagem UML**: PlantUML
- **Prototipação**: React.js com componentes customizados
- **Documentação**: Markdown com sintaxe estendida
- **Versionamento**: Git com commits semânticos

---

*Documento gerado para o curso de Bacharelado em Ciência da Computação - BCC*
*Disciplina: Modelos de Sistemas Computacionais*

