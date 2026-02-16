import React, { useEffect, useState } from 'react';
import './CobrancaList.scss';
import { 
  listarCobrancas, 
  deletarCobranca,
  atualizarStatus  
} from '../../services/api';

const CobrancaList = ({ onEditar }) => {
  const [cobrancas, setCobrancas] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  // Busca todas as cobranças do backend
  const fetchCobrancas = async () => {
    const data = await listarCobrancas();
    setCobrancas(data);
  };

  useEffect(() => {
    fetchCobrancas();
  }, []);

  // Filtra pelo nome e status
  const cobrancasFiltradas = cobrancas.filter(c => {
    const nomeMatch = c.nome_cliente
      .toLowerCase()
      .includes(filtroNome.toLowerCase());

    const statusMatch = filtroStatus 
      ? c.status === filtroStatus 
      : true;

    return nomeMatch && statusMatch;
  });

  // Deleta uma cobrança
  const handleDelete = async (id) => {
    await deletarCobranca(id);
    fetchCobrancas();
  };

  // Atualiza status usando api.js
  const handleStatusChange = async (id, status) => {
    await atualizarStatus(id, status);
    fetchCobrancas();
  };

  return (
    <div className="cobranca-list-container">

      {/* Filtros */}
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

      {/* Tabela */}
      <table className="cobranca-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Descrição</th> {/* 👈 NOVO */}
            <th>Valor</th>
            <th>Vencimento</th> {/* 👈 NOVO */}
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {cobrancasFiltradas.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>

              <td>{c.nome_cliente}</td>

              {/* Descrição */}
              <td>{c.descricao}</td>

              {/* Valor formatado */}
              <td>
                R$ {Number(c.valor).toFixed(2)}
              </td>

              {/* Data formatada para padrão BR */}
              <td>
                {c.data_vencimento 
                  ? new Date(c.data_vencimento)
                      .toLocaleDateString("pt-BR")
                  : "-"
                }
              </td>

              <td>{c.status}</td>

              <td className="acoes">

                {/* Botões de status */}
                <div className="linha-status">
                  <button
                    className={`status-button status-pendente ${
                      c.status === 'PENDENTE' ? 'active' : ''
                    }`}
                    onClick={() => handleStatusChange(c.id, 'PENDENTE')}
                  >
                    PENDENTE
                  </button>

                  <button
                    className={`status-button status-pago ${
                      c.status === 'PAGO' ? 'active' : ''
                    }`}
                    onClick={() => handleStatusChange(c.id, 'PAGO')}
                  >
                    PAGO
                  </button>
                </div>

                {/* Editar / Deletar */}
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
