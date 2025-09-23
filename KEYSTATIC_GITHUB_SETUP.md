# Configuração do Keystatic com GitHub

## Passo a Passo Completo

### 1. Criar Personal Access Token (PAT) no GitHub

1. **Acesse as configurações do GitHub:**
   - Vá para https://github.com
   - Clique no seu avatar no canto superior direito
   - Selecione **Settings** (Configurações)

2. **Navegue até Developer Settings:**
   - No menu lateral esquerdo, role até o final
   - Clique em **Developer settings**

3. **Crie um novo token:**
   - Clique em **Personal access tokens**
   - Selecione **Tokens (classic)**
   - Clique em **Generate new token**
   - Escolha **Generate new token (classic)**

4. **Configure o token:**
   - **Note:** Digite um nome descritivo (ex: "Keystatic Proposals")
   - **Expiration:** Escolha a validade (recomendo 90 dias ou "No expiration")
   - **Scopes:** Marque as seguintes permissões:
     - ✅ **repo** (acesso total aos repositórios privados)
       - Isso automaticamente marca: repo:status, repo_deployment, public_repo, repo:invite

5. **Gere e copie o token:**
   - Clique em **Generate token** no final da página
   - ⚠️ **IMPORTANTE:** Copie o token imediatamente (começa com `ghp_`)
   - Você não poderá ver este token novamente!

### 2. Configurar Variáveis de Ambiente

Abra o arquivo `.env.local` e atualize:

```env
# Token do GitHub (cole o token que você acabou de criar)
KEYSTATIC_GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Mude para usar GitHub ao invés de local
KEYSTATIC_STORAGE="github"

# Suas informações do GitHub
NEXT_PUBLIC_GITHUB_OWNER="seu-usuario-github"
NEXT_PUBLIC_GITHUB_REPO="nome-do-seu-repositorio"
```

**Exemplo real:**
```env
KEYSTATIC_GITHUB_TOKEN="ghp_ABcd1234EFgh5678IJkl9012MNop3456QRst"
KEYSTATIC_STORAGE="github"
NEXT_PUBLIC_GITHUB_OWNER="lucianosantos"
NEXT_PUBLIC_GITHUB_REPO="betanobackup"
```

### 3. Preparar o Repositório

1. **Certifique-se de que o repositório existe no GitHub:**
   - Se não existir, crie em: https://github.com/new
   - Pode ser público ou privado

2. **Faça o commit inicial (se necessário):**
   ```bash
   git add .
   git commit -m "Add Keystatic configuration"
   git push origin main
   ```

### 4. Estrutura de Pastas (será criada automaticamente)

Quando você criar o primeiro conteúdo, o Keystatic criará:
```
/content
  /proposals      → Propostas
  /templates      → Templates de propostas
```

### 5. Testar a Configuração

1. **Reinicie o servidor de desenvolvimento:**
   ```bash
   # Pare o servidor (Ctrl+C)
   # Inicie novamente
   npm run dev
   ```

2. **Acesse o Keystatic Admin:**
   - Abra: http://localhost:3000/admin/keystatic

3. **Teste criando um template:**
   - Clique em "Proposal Templates"
   - Clique em "Create entry"
   - Preencha os campos
   - Clique em "Save"

4. **Verifique no GitHub:**
   - Vá para seu repositório no GitHub
   - Você deve ver uma nova pasta `/content` com os arquivos

### 6. Configuração OAuth do GitHub (Opcional - Para produção)

Para produção, é melhor usar OAuth ao invés de PAT:

1. **Crie um GitHub App:**
   - Vá para: https://github.com/settings/apps
   - Clique em "New GitHub App"
   - Configure:
     - **App name:** "Keystatic Proposals"
     - **Homepage URL:** https://seu-dominio.com
     - **Callback URL:** https://seu-dominio.com/api/keystatic/github/oauth/callback
     - **Webhook:** Desmarque "Active"
     - **Permissions:**
       - Repository permissions:
         - Contents: Read & Write
         - Metadata: Read
     - **Where can this GitHub App be installed:** Only on this account

2. **Após criar o app:**
   - Copie o **Client ID**
   - Gere e copie um **Client Secret**

3. **Configure no Vercel:**
   ```env
   KEYSTATIC_GITHUB_CLIENT_ID="Iv1.xxxxxxxxxx"
   KEYSTATIC_GITHUB_CLIENT_SECRET="xxxxxxxxxx"
   ```

### 7. Troubleshooting

#### Erro: "Authentication failed"
- Verifique se o token está correto
- Confirme que o token tem permissão `repo`
- Verifique se o token não expirou

#### Erro: "Repository not found"
- Confirme o nome do usuário e repositório
- Verifique se o repositório existe
- Se for privado, confirme que o token tem acesso

#### Erro: "Permission denied"
- O token precisa da permissão completa `repo`
- Verifique se você tem permissão de escrita no repositório

#### Conteúdo não aparece no GitHub
- Verifique se `KEYSTATIC_STORAGE="github"` (não "local")
- Confirme que todas as variáveis estão configuradas
- Tente fazer um hard refresh (Ctrl+Shift+R)

### 8. Migração de Local para GitHub

Se você começou com armazenamento local:

1. **Copie o conteúdo local:**
   - A pasta `/content` local contém seus arquivos

2. **Mude para GitHub:**
   - Atualize `.env.local` com `KEYSTATIC_STORAGE="github"`
   - Configure o token e informações do repo

3. **Commite o conteúdo:**
   ```bash
   git add content/
   git commit -m "Add local content to GitHub"
   git push
   ```

### 9. Segurança

⚠️ **NUNCA commite o arquivo `.env.local`!**

Certifique-se de que `.gitignore` contém:
```
.env.local
.env*.local
```

**Para produção (Vercel):**
- Adicione as variáveis de ambiente no dashboard do Vercel
- Settings → Environment Variables
- Adicione cada variável individualmente

### 10. Fluxo de Trabalho

Com GitHub configurado:

1. **Criar conteúdo:**
   - Use o Keystatic admin em `/admin/keystatic`
   - Cada save cria um commit no GitHub

2. **Editar conteúdo:**
   - Mudanças são salvas diretamente no GitHub
   - Histórico completo no Git

3. **Colaboração:**
   - Múltiplos usuários podem editar (com seus próprios tokens)
   - Use branches para revisão se necessário

### Exemplo Completo de `.env.local`

```env
# Neon Database
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Keystatic GitHub
KEYSTATIC_GITHUB_TOKEN="ghp_ABcd1234EFgh5678IJkl9012MNop3456QRst"
KEYSTATIC_STORAGE="github"
NEXT_PUBLIC_GITHUB_OWNER="lucianosantos"
NEXT_PUBLIC_GITHUB_REPO="betanobackup"

# App Config
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### Links Úteis

- [Criar PAT no GitHub](https://github.com/settings/tokens/new)
- [Documentação Keystatic](https://keystatic.com/docs)
- [GitHub Apps](https://github.com/settings/apps)