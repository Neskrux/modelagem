# 📋 Guia de Apresentação - Diagramas UML

## 🎯 Estrutura da Apresentação

### 1. INTRODUÇÃO (2-3 minutos)
- **Tema:** Sistema de Agendamento de Barbearia
- **Objetivo:** Apresentar a modelagem UML completa do sistema
- **Ferramentas:** PlantUML, React.js (protótipo)

---

### 2. DIAGRAMAS DE MÁQUINA DE ESTADOS (5-7 minutos)

#### 2.1 Diagrama de Estados - Agendamento
**O que mostrar:**
- ✅ **9 estados principais:** Criado → Pendente → Confirmado → Em Andamento → Concluído → Avaliado
- ✅ **Ações de entrada/saída:** Exemplos: `entry: bloquearHorarioAgenda()`, `exit: liberarRecursos()`
- ✅ **Condições de guarda:** `[barbeiroDisponivel && horarioLivre]`
- ✅ **Eventos:** `confirmar()`, `cancelar()`, `remarcar()`

**Pontos-chave:**
- Ciclo de vida completo do agendamento
- Tratamento de exceções (Cancelado, Não Compareceu)
- Política de cancelamento integrada

#### 2.2 Diagrama de Estados - Usuário
**O que mostrar:**
- ✅ **Estados compostos:** Estado Ativo com subestados (Cliente, Barbeiro, Gerente)
- ✅ **Fluxo de autenticação:** NaoCadastrado → Cadastrando → PendenteAtivacao → Inativo → Ativo
- ✅ **Segurança:** Bloqueio após 5 tentativas, recuperação de senha
- ✅ **Timeouts:** Suspensão por inatividade (30min), expiração de sessão (60min)

**Pontos-chave:**
- Diferentes perfis de usuário com comportamentos distintos
- Segurança e auditoria implementadas

---

### 3. DIAGRAMAS DE ATIVIDADES (10-12 minutos)

#### 3.1 Processo de Agendamento (Caso de Uso)
**O que mostrar:**
- ✅ **4 atores:** Cliente, Sistema, Barbeiro, Gerente
- ✅ **Paralelismo:** Fork/Join para buscar barbeiros, horários e preços simultaneamente
- ✅ **Validações:** Conflitos de agenda, horário de funcionamento
- ✅ **Regras de negócio:** Reserva temporária (5min), lembretes automáticos

**Pontos-chave:**
- Fluxo completo desde login até conclusão
- Processamento paralelo para performance

#### 3.2 Processo de Login (Nível de Método)
**O que mostrar:**
- ✅ **4 componentes:** Usuário, Frontend, Backend, Banco de Dados
- ✅ **Segurança paralela:** Rate limiting, validação de origem, blacklist de IPs
- ✅ **Tokens:** JWT com refresh token
- ✅ **Fluxos condicionais:** Diferentes dashboards por perfil

**Pontos-chave:**
- Detalhamento técnico de implementação
- Múltiplas camadas de segurança

#### 3.3 Gestão de Barbeiros (Processo de Negócio)
**O que mostrar:**
- ✅ **Operações:** Cadastro, Edição, Avaliação, Desativação
- ✅ **Validações paralelas:** CPF, Email, Documentos simultaneamente
- ✅ **Impactos:** Verificação de conflitos ao alterar horários
- ✅ **Métricas:** Análise de desempenho e ranking

**Pontos-chave:**
- Processo administrativo completo
- Gestão de impactos em cascata

#### 3.4 Confirmação de Agendamento (Especificação de Método)
**O que mostrar:**
- ✅ **Nível técnico:** Queries SQL, transações ACID, locks de banco
- ✅ **Notificações paralelas:** Email, SMS, Push simultaneamente
- ✅ **Auditoria:** Log completo de todas as ações
- ✅ **Tratamento de erros:** Rollback, exceções, validações

**Pontos-chave:**
- Granularidade de implementação
- Garantia de consistência de dados

#### 3.5 Cancelamento com Multas (Regra de Negócio)
**O que mostrar:**
- ✅ **Política progressiva:** 
  - Mais de 24h: Sem multa
  - 2h-24h: Multa 30%
  - Menos de 2h: Multa 50%
  - No-show: Multa 100%
- ✅ **Processamento paralelo:** Reembolso, notificações, lista de espera
- ✅ **Múltiplas opções:** Crédito, devolução bancária, vale

**Pontos-chave:**
- Regra de negócio complexa e justa
- Processamento automático inteligente

---

### 4. DIAGRAMA DE NAVEGAÇÃO (2-3 minutos)

**O que mostrar:**
- ✅ **3 dashboards:** Cliente, Barbeiro, Gerente
- ✅ **Navegação contextual:** Fluxos específicos por perfil
- ✅ **Módulos principais:** Agendamentos, Clientes, Barbeiros, Serviços, Relatórios
- ✅ **Acesso controlado:** Cada perfil vê apenas o que tem permissão

**Pontos-chave:**
- UX pensada para diferentes usuários
- Navegação intuitiva e segura

---

### 5. ITENS DE CRIATIVIDADE (3-4 minutos)

#### Inovações no Documento:
- ✅ Diagramas multi-nível (caso de uso até implementação)
- ✅ Subestados hierárquicos para perfis de usuário
- ✅ Paralelismo extensivo em todos os processos

#### Inovações no Produto:
- ✅ **Sistema de notificações multi-canal:** Email, SMS, Push simultâneos
- ✅ **Política de cancelamento inteligente:** Multas progressivas e justas
- ✅ **Reserva temporária anti-conflito:** 5 minutos para evitar problemas
- ✅ **Lista de espera automática:** Notifica quando horário é liberado
- ✅ **Dashboard em tempo real:** Métricas atualizadas instantaneamente
- ✅ **Sistema de métricas e gamificação:** Ranking de barbeiros

---

### 6. CONCLUSÃO (1-2 minutos)

**Resumo:**
- ✅ **8 diagramas UML** completos e detalhados
- ✅ **Todos os requisitos atendidos** e excedidos
- ✅ **Elementos UML avançados** implementados
- ✅ **Inovações** que agregam valor real ao negócio

**Diferenciais:**
- Modelagem profissional e completa
- Foco em usabilidade e segurança
- Soluções inovadoras para problemas reais

---

## 📊 Tempo Total Estimado: 25-30 minutos

## 💡 DICAS PARA APRESENTAÇÃO:

1. **Comece pelo contexto:** Explique o sistema rapidamente
2. **Mostre os diagramas:** Use a página HTML ou imagens exportadas
3. **Destaque elementos UML:** Sempre mencione ações, condições, paralelismo
4. **Conecte com o negócio:** Explique o "porquê" de cada decisão
5. **Enfatize inovações:** Mostre o que torna o trabalho diferenciado
6. **Seja objetivo:** Foque nos pontos principais de cada diagrama

## 🎯 CHECKLIST PRÉ-APRESENTAÇÃO:

- [ ] Abrir `visualizar-diagramas-completo.html` no navegador
- [ ] Testar navegação entre os diagramas
- [ ] Ter backup: imagens PNG exportadas (caso a internet falhe)
- [ ] Revisar documentação completa
- [ ] Preparar exemplos práticos para cada diagrama
- [ ] Cronometrar tempo de apresentação

---

**Boa apresentação! 🚀**

