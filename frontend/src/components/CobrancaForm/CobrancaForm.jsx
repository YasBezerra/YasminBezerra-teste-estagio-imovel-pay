import React, { useEffect, useState } from 'react';
import './CobrancaForm.scss';
import { criarCobranca, atualizarCobranca } from '../../services/api';

const CobrancaForm = ({ cobrancaEditar, onSubmitSucesso }) => {

  // Estados do formulário
  // Cada campo da cobrança tem seu próprio estado
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');

  // useEffect
  // Quando uma cobrança é selecionada para edição,
  // preenche automaticamente os campos do formulário
  useEffect(() => {
    if (cobrancaEditar) {
      setNome(cobrancaEditar.nome_cliente);
      setDescricao(cobrancaEditar.descricao || '');
      setValor(cobrancaEditar.valor);

      // Ajuste para o formato do input type="date"
      // O backend pode retornar algo como: 2026-02-20T00:00:00.000Z
      // Então pegamos apenas a parte YYYY-MM-DD
      setDataVencimento(
        cobrancaEditar.data_vencimento
          ? cobrancaEditar.data_vencimento.split('T')[0]
          : ''
      );
    }
  }, [cobrancaEditar]);

  // Função chamada quando o formulário é enviado
  const handleSubmit = async (e) => {
    e.preventDefault(); // impede reload da página

    // Monta o objeto que será enviado para o backend
    const dados = {
      nome_cliente: nome,
      descricao,
      valor,
      data_vencimento: dataVencimento
    };

    // Se estiver editando, chama a função de atualizar
    if (cobrancaEditar) {
      await atualizarCobranca(cobrancaEditar.id, dados);
    } 
    // Caso contrário, cria uma nova cobrança
    else {
      await criarCobranca(dados);
    }

    // Limpa os campos após envio
    setNome('');
    setDescricao('');
    setValor('');
    setDataVencimento('');

    // Atualiza a lista no componente pai
    onSubmitSucesso();
  };

  return (
    <form className="cobranca-form" onSubmit={handleSubmit}>

      {/* Campo nome do cliente */}
      <input
        type="text"
        placeholder="Nome do cliente"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      {/* Campo descrição */}
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      {/* Campo valor */}
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        required
      />

      {/* Campo data de vencimento */}
      <input
        type="date"
        value={dataVencimento}
        onChange={(e) => setDataVencimento(e.target.value)}
        required
      />

      {/* Botão muda texto se estiver editando */}
      <button type="submit">
        {cobrancaEditar ? 'Atualizar' : 'Adicionar'}
      </button>

    </form>
  );
};

export default CobrancaForm;
