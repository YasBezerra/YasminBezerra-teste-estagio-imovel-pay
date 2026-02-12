import React, { useEffect, useState } from 'react';
import './CobrancaList.scss';
import { listarCobrancas, deletarCobranca } from '../../services/api';

const CobrancaList = ({ onEditar }) => {
  const [cobrancas, setCobrancas] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  // Função para buscar todas as cobranças do backend
  const fetchCobrancas = async () => {
    const data = await listarCobrancas();
    setCobrancas(data);
  };

  useEffect(() => {
    fetchCobrancas();
  }, []);

  // Filtra as cobranças pelo nome e status selecionado
  const cobrancasFiltradas = cobrancas.filter(c => {
    const nomeMatch = c.nome_cliente.toLowerCase().includes(filtroNome.toLowerCase());
    const statusMatch = filtroStatus ? c.status === filtroStatus : true;
    return nomeMatch && statusMatch;
  });

  // Deleta uma cobrança e atualiza a lista
  const handleDelete = async (id) => {
    await deletarCobranca(id);
    fetchCobrancas();
  };

  // Atualiza o status da cobrança
  const handleStatusChange = async (id, status) => {
    await fetch(`/cobrancas/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchCobrancas();
  };

  return (
    <div className="cobranca-list-container">
      {/* Filtros de pesquisa */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          className="filtro-input"
        />
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="filtro-input"
        >
          <option value="">Todos</option>
          <option value="PENDENTE">PENDENTE</option>
          <option value="PAGO">PAGO</option>
        </select>
      </div>

      {/* Tabela de cobranças */}
      <table className="cobranca-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cobrancasFiltradas.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nome_cliente}</td>
              <td>R$ {c.valor}</td>
              <td>{c.status}</td>
              <td className="acoes">
                {/* Linha de status em cima */}
                <div className="linha-status">
                  <button
                    className={`status-button status-pendente ${c.status === 'PENDENTE' ? 'active' : ''}`}
                    onClick={() => handleStatusChange(c.id, 'PENDENTE')}
                  >
                    PENDENTE
                  </button>
                  <button
                    className={`status-button status-pago ${c.status === 'PAGO' ? 'active' : ''}`}
                    onClick={() => handleStatusChange(c.id, 'PAGO')}
                  >
                    PAGO
                  </button>
                </div>

                {/* Linha de ações embaixo */}
                <div className="linha-acoes">
                  <button
                    className="edit-btn"
                    onClick={() => onEditar(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(c.id)}
                  >
                    Deletar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CobrancaList;
