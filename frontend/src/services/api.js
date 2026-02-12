// Base URL da API
const API_URL = '/cobrancas'; // O Vite vai redirecionar para http://localhost:3000 pelo proxy

// Função para listar todas as cobranças
export const listarCobrancas = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

// Função para criar uma nova cobrança
export const criarCobranca = async (cobranca) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cobranca) // envia nome_cliente e valor
  });
  return res.json();
};

// Função para atualizar uma cobrança (nome e valor)
export const atualizarCobranca = async (id, cobranca) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cobranca)
  });
  return res.json();
};

// Função para deletar uma cobrança
export const deletarCobranca = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return res.json();
};

// Função para atualizar o status da cobrança (PENDENTE <-> PAGO)
export const atualizarStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  return res.json();
};
