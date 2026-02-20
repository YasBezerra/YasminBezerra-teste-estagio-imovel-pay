# Lista de Cobranças

Esta aplicação é um sistema completo para gerenciamento de cobranças, desenvolvido como parte de um desafio técnico. Permite ao usuário criar, listar, editar e deletar cobranças, além de atualizar o status de cada cobrança (PENDENTE ou PAGO) de forma rápida e intuitiva.

O backend foi construído utilizando Node.js, Express e MySQL, organizado em camadas (routes → controller → service → banco de dados), garantindo manutenção fácil, escalabilidade e separação clara de responsabilidades.

O frontend foi desenvolvido em React com SCSS, oferecendo uma interface responsiva e interativa, incluindo filtros por nome do cliente e status, botões de ação e atualização de status direto na tabela. A aplicação também utiliza variáveis de ambiente para proteger credenciais sensíveis, como a senha do banco de dados.

Durante o desenvolvimento, o projeto proporcionou aprendizado prático sobre: configuração de rotas no Express, diferenças entre GET, PUT e PATCH, debug de variáveis de ambiente, organização em camadas, e boas práticas de segurança no versionamento de código.

No geral, o sistema simula um painel de cobranças real, permitindo testar funcionalidades comuns em aplicações corporativas de gestão financeira e demonstrando boas práticas de desenvolvimento frontend e backend.

---

## Funcionalidades

- Listar todas as cobranças do banco de dados
- Criar novas cobranças
- Editar cobranças existentes
- Deletar cobranças
- Atualizar status de cobrança (PENDENTE / PAGO / ATRASADA)
- Filtrar por nome do cliente e status
- Interface responsiva em React com SCSS
- Organização do backend em camadas:
  - `routes` → define endpoints
  - `controller` → recebe requisições e chama o service
  - `service` → lógica de negócio e comunicação com o banco
- Uso de variáveis de ambiente para manter senhas e dados sensíveis seguros

---

## Tecnologias

- Backend: Node.js, Express, MySQL, dotenv  
- Frontend: React, SCSS  
- Ferramentas auxiliares: Vite (frontend), npm  

---

## Problemas enfrentados e aprendizados

Durante o desenvolvimento, enfrentei diversos desafios que foram importantes para aprendizado:

1. Rotas do Express
   - Erros como `Cannot GET/PUT` apareceram por falta de `app.use('/cobrancas', routes)` ou configuração incorreta de endpoints.
   - Aprendi a organizar rotas de forma clara e a debugar passo a passo.

2. Conflito de porta
   - `EADDRINUSE` apareceu quando a porta já estava em uso.
   - Resolvido garantindo que o servidor fosse encerrado corretamente antes de rodar novamente.

3. Diferença entre GET, PUT e PATCH
   - Entendi que `PATCH` é ideal para atualizar parcialmente um registro (ex: status de cobrança), enquanto `PUT` substitui todo o registro.

4. Segurança das credenciais
   - Inicialmente, a senha do MySQL estava no código.
   - Aprendi a usar dotenv e `.env` para manter senhas fora do GitHub.

5. Debug de variáveis de ambiente
   - Erro `Access denied for user ''@'localhost'` mostrou que o Node não estava lendo as variáveis.
   - Resolvido garantindo `.env` na raiz, sem espaços extras, e chamando `require('dotenv').config()` antes de usar as variáveis.

6. Organização em camadas
   - Aprendi a separar responsabilidades: routes → controller → service → banco, facilitando manutenção e escalabilidade.

---

## Instalação

* Clonar o repositório e entrar na pasta do backend
git clone https://github.com/seu-usuario/desafioImovelPay.git
cd desafioImovelPay/backend

* Instalar dependências do backend

  - npm install
  - npm install express
  - npm install mysql2
  - npm install dotenv
 
* Configuração do Banco de Dados

## 🗄️ Banco de Dados

Execute o script abaixo no MySQL:

```sql
-- Criar banco se não existir
CREATE DATABASE IF NOT EXISTS desafio;
USE desafio;

DROP TABLE IF EXISTS cobrancas;

CREATE TABLE cobrancas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(255) NOT NULL,
    descricao TEXT,
    valor DECIMAL(10,2) NOT NULL,
    status ENUM('PENDENTE', 'PAGO', 'ATRASADA') NOT NULL DEFAULT 'PENDENTE',
    data_vencimento DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```



* Criar o arquivo .env na raiz do backend com suas credenciais do MySQL
* Exemplo de conteúdo do .env:
  - DB_HOST=localhost
  - DB_USER=root
  - DB_PASSWORD=suaSenhaAqui
  - DB_NAME=nomeDoBanco
  - DB_PORT=3306
  - PORT=3000

* Executar o backend
  - node app.js

* Configurar e executar o frontend
  - cd ../frontend
  - npm install
  - npm install sass
  - npm run dev
 
<details>
  <summary>Visualizar imagens do Lista de Cobranças</summary>
  
  ![Formulário de Cobranças](https://github.com/user-attachments/assets/ae89c712-d8a1-45af-965e-85013d3e820e)

</details>
