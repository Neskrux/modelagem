# Instruções para Configurar o Git

Execute os seguintes comandos no terminal, dentro da pasta do projeto:

```bash
# 1. Inicializar o repositório Git (se ainda não foi feito)
git init

# 2. Adicionar o remote do GitHub
git remote add origin https://github.com/Neskrux/modelagem.git

# 3. Adicionar todos os arquivos do projeto
git add .gitignore
git add README.md
git add package.json
git add public/
git add src/

# 4. Fazer o primeiro commit
git commit -m "Initial commit: Sistema de Agendamento de Barbearia"

# 5. Renomear a branch para main (se necessário)
git branch -M main

# 6. Enviar para o GitHub
git push -u origin main
```

**Nota:** Se o repositório já existir no GitHub e tiver conteúdo, você pode precisar usar:
```bash
git push -u origin main --force
```

Mas tenha cuidado com o `--force`, pois ele sobrescreve o histórico remoto.
