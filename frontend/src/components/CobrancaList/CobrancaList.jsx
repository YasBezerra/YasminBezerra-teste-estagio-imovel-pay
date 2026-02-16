import React, { useEffect, useState } from 'react';
import './CobrancaList.scss';
import {
  listarCobrancas,
  deletarCobranca,
  atualizarStatus
} from '../../services/api';

const CobrancaList = ({ onEditar }) => {
  // 🔹 Estado principal que guarda as cobranças vindas do backend
  const [cobrancas, setCobrancas] = useState([]);

  // 🔹 Estados dos filtros
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  // 🔹 Estado para controlar carregamento
  const [loading, setLoading] = useState(true);

  // 🔥 Busca todas as cobranças do backend (versão segura)
  const fetchCobrancas = async () => {
    try {
      setLoading(true); // ativa loading

      const data = await listarCobrancas();

      // ✅ Garante que sempre seja um array
      if (Array.isArray(data)) {
        setCobrancas(data);
      } else {
        console.error('Resposta inesperada do backend:', data);
        setCobrancas([]);
      }

    } catch (error) {
      console.error('Erro ao buscar cobranças:', error);
      setCobrancas([]);
    } finally {
      setLoading(false); // desativa loading
    }
  };

  // 🔹 Executa uma vez quando o componente carrega
  useEffect(() => {
    fetchCobrancas();
  }, []);

  // 🔒 Proteção extra:
  // Se por algum motivo cobrancas não for array,
  // garantimos que listaSegura seja sempre array
  const listaSegura = Array.isArray(cobrancas) ? cobrancas : [];

  // 🔎 Filtra pelo nome e status
  const cobrancasFiltradas = listaSegura.filter(c => {

    // Proteção caso nome_cliente venha undefined
    const nomeMatch = c.nome_cliente
      ?.toLowerCase()
      .includes(filtroNome.toLowerCase());

    // Se tiver filtro de status, compara.
    // Se não tiver, aceita todos.
    const statusMatch = filtroStatus
      ? c.status === filtroStatus
      : true;

    return nomeMatch && statusMatch;
  });

  // 🗑 Deleta uma cobrança e atualiza a lista
  const handleDelete = async (id) => {
    try {
      await deletarCobranca(id);
      fetchCobrancas(); // recarrega lista
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  // 🔄 Atualiza status usando api.js (PENDENTE <-> PAGO)
  const handleStatusChange = async (id, status) => {
    try {
      await atualizarStatus(id, status);
      fetchCobrancas(); // recarrega lista
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  // 🔄 Enquanto carrega dados
  if (loading) {
    return <p>Carregando cobranças...</p>;
  }

  return (
    <div className="cobranca-list-container">

      {/* 🔎 Filtros */}
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

      {/* 📋 Tabela */}
      <table className="cobranca-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Vencimento</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {cobrancasFiltradas.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>

              <td>{c.nome_cliente}</td>

              {/* Descrição (se não existir mostra "-") */}
              <td>{c.descricao || '-'}</td>

              {/* Valor formatado para padrão brasileiro */}
              <td>
                R$ {Number(c.valor).toFixed(2)}
              </td>

              {/* Data formatada para padrão BR */}
              <td>
                {c.data_vencimento
                  ? new Date(c.data_vencimento).toLocaleDateString("pt-BR")
                  : '-'}
              </td>

              <td>{c.status}</td>

              <td className="acoes">

                {/* 🔄 Botões de status */}
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

                {/* ✏️ Editar / 🗑 Deletar */}
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
