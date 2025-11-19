# Script para configurar Git e fazer push para GitHub
# Execute este script na pasta do projeto

$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectPath

Write-Host "Configurando Git no diretório: $projectPath" -ForegroundColor Green

# Verificar se já existe .git
if (Test-Path .git) {
    Write-Host "Repositório Git já existe" -ForegroundColor Yellow
} else {
    Write-Host "Inicializando repositório Git..." -ForegroundColor Cyan
    git init
}

# Adicionar remote
Write-Host "Configurando remote do GitHub..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin https://github.com/Neskrux/modelagem.git

# Adicionar arquivos
Write-Host "Adicionando arquivos ao Git..." -ForegroundColor Cyan
git add .gitignore
git add README.md
git add package.json
git add public/
git add src/

# Commit
Write-Host "Fazendo commit..." -ForegroundColor Cyan
git commit -m "Initial commit: Sistema de Agendamento de Barbearia"

# Renomear branch
git branch -M main

# Push
Write-Host "Enviando para o GitHub..." -ForegroundColor Cyan
Write-Host "Você precisará autenticar no GitHub" -ForegroundColor Yellow
git push -u origin main

Write-Host "Concluído!" -ForegroundColor Green
