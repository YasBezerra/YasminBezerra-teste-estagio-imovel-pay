import React, { useEffect, useState } from 'react';
import './CobrancaForm.scss';
import { criarCobranca, atualizarCobranca } from '../../services/api';

const CobrancaForm = ({ cobrancaEditar, onSubmitSucesso }) => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');

  // Quando uma cobrança é enviada para edição, preenche os campos
  useEffect(() => {
    if (cobrancaEditar) {
      setNome(cobrancaEditar.nome_cliente);
      setValor(cobrancaEditar.valor);
    }
  }, [cobrancaEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cobrancaEditar) {
      await atualizarCobranca(cobrancaEditar.id, { nome_cliente: nome, valor });
    } else {
      await criarCobranca({ nome_cliente: nome, valor });
    }
    setNome('');
    setValor('');
    onSubmitSucesso(); // atualiza lista
  };

  return (
    <form className="cobranca-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do cliente"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        required
      />
      <button type="submit">{cobrancaEditar ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
};

export default CobrancaForm;
