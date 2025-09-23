# 🚀 Guia de Deploy com Vercel para Projetos do Bolt.DIY

## 📋 Visão Geral

Este guia mostra como fazer deploy dos projetos criados no Bolt.DIY para a Vercel. Como o Bolt.DIY gera código localmente em `/home/project/` (dentro do WebContainer), você precisa exportar e fazer deploy manualmente.

## 🔄 Processo de Deploy (2 Métodos)

### Método 1: Deploy Manual via Vercel CLI

#### 1. Instale o Vercel CLI globalmente
```bash
npm install -g vercel
```

#### 2. Faça login na Vercel
```bash
vercel login
```
Digite seu email e confirme no navegador.

#### 3. Baixe o Projeto do Bolt.DIY
No Bolt.DIY (http://localhost:5173):
1. Clique no botão **"Download"** no canto superior direito
2. Isso baixará um ZIP com todos os arquivos do projeto
3. Extraia o ZIP em uma pasta local

#### 4. Deploy para Vercel
Na pasta extraída, execute:
```bash
cd pasta-do-projeto-extraido
vercel
```

Siga os prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Selecione sua conta
- **Link to existing project?** → No (primeiro deploy) ou Yes (updates)
- **Project name?** → Nome do seu projeto
- **Directory?** → ./ (diretório atual)
- **Override settings?** → No (geralmente)

### Método 2: Deploy via GitHub + Vercel

#### 1. Baixe o Projeto do Bolt.DIY
- Clique em **"Download"** no Bolt.DIY
- Extraia o ZIP localmente

#### 2. Crie um Repositório no GitHub
```bash
cd pasta-do-projeto-extraido
git init
git add .
git commit -m "Initial commit from Bolt.DIY"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

#### 3. Conecte com Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Add New Project"**
3. Importe o repositório do GitHub
4. Configure as settings (geralmente detecta automaticamente)
5. Clique em **"Deploy"**

## ⚙️ Configurações Específicas por Framework

### Next.js
```json
// vercel.json (opcional)
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### React (Vite)
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### React (Create React App)
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm start",
  "installCommand": "npm install"
}
```

### Vue.js
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## 🔐 Variáveis de Ambiente

### 1. No Bolt.DIY
Se seu projeto usa variáveis de ambiente (arquivo `.env`):
- Baixe o projeto incluindo o `.env`
- **IMPORTANTE**: Não commite `.env` para o GitHub!

### 2. Na Vercel
1. Vá em **Settings → Environment Variables**
2. Adicione cada variável manualmente:
   ```
   VITE_API_KEY=seu-valor-aqui
   NEXT_PUBLIC_API_URL=https://api.exemplo.com
   DATABASE_URL=sua-connection-string
   ```

### 3. Tipos de Variáveis
- **Development**: Apenas em desenvolvimento
- **Preview**: Em branches de preview
- **Production**: Em produção

## 📦 Estrutura de Arquivos Necessária

Certifique-se que seu projeto tem:
```
projeto/
├── package.json         # ✅ Obrigatório
├── package-lock.json    # ✅ Recomendado
├── .gitignore          # ✅ Recomendado
├── README.md           # ✅ Recomendado
├── vercel.json         # ⚙️ Opcional (configurações customizadas)
└── src/ ou app/        # 📁 Código fonte
```

## 🔄 Atualizando um Deploy Existente

### Via CLI
```bash
cd pasta-do-projeto
vercel --prod
```

### Via GitHub
```bash
git add .
git commit -m "Update from Bolt.DIY"
git push
```
(Vercel fará deploy automaticamente)

## 🛠️ Troubleshooting

### Erro: "Build failed"
**Solução**: Verifique no Bolt.DIY se o projeto está buildando corretamente:
```bash
npm run build
```

### Erro: "Module not found"
**Solução**: Certifique-se que todas as dependências estão no `package.json`:
```bash
npm install
npm run build
```

### Erro: "Environment variables not defined"
**Solução**: Adicione as variáveis em Settings → Environment Variables na Vercel

### Erro: "404 on routes" (SPA)
**Solução**: Para SPAs (React, Vue), adicione `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## 🎯 Comandos Úteis da Vercel CLI

```bash
# Deploy para produção
vercel --prod

# Deploy para preview
vercel

# Ver logs
vercel logs

# Listar deployments
vercel ls

# Remover deployment
vercel rm [deployment-url]

# Configurar domínio customizado
vercel domains add seu-dominio.com

# Ver variáveis de ambiente
vercel env ls

# Adicionar variável de ambiente
vercel env add VARIAVEL_NOME
```

## 🔗 Integrações Adicionais

### Domínio Customizado
1. Em Vercel Dashboard → Settings → Domains
2. Add Domain → Digite seu domínio
3. Configure DNS conforme instruções

### Analytics
1. Em Vercel Dashboard → Analytics
2. Enable Analytics (pode ter custo)

### Speed Insights
1. Em Vercel Dashboard → Speed Insights
2. Enable para monitorar performance

## 📚 Recursos Adicionais

- [Documentação Oficial Vercel](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Framework Presets](https://vercel.com/docs/frameworks)
- [Environment Variables](https://vercel.com/docs/environment-variables)

## 💡 Dicas Pro

1. **Use Preview Deployments**: Cada PR no GitHub cria um preview
2. **Configure Proteção de Branch**: Impeça deploy direto na main
3. **Use Vercel Functions**: Para APIs serverless
4. **Configure Cache Headers**: Para melhor performance
5. **Use ISR (Next.js)**: Incremental Static Regeneration para sites dinâmicos

## 🚨 Segurança

- **NUNCA** commite `.env` com secrets para o GitHub
- Use **Environment Variables** da Vercel para secrets
- Configure **CORS** adequadamente para APIs
- Use **HTTPS** sempre (Vercel faz isso automaticamente)
- Revise **Build Logs** para não expor informações sensíveis

---

**Nota**: Este guia assume que você tem uma conta Vercel (gratuita em vercel.com). O plano gratuito é suficiente para a maioria dos projetos pessoais e pequenos.