import React, { useState, useEffect } from "react";
import CobrancaHeader from "./components/CobrancaHeader/CobrancaHeader";
import CobrancaList from "./components/CobrancaList/CobrancaList";
import CobrancaForm from "./components/CobrancaForm/CobrancaForm";
import { listarCobrancas } from "./services/api";
import "./App.scss";

function App() {
  const [cobrancas, setCobrancas] = useState([]);
  const [cobrancaEditar, setCobrancaEditar] = useState(null);

  // Função para buscar todas as cobranças
  const fetchCobrancas = async () => {
    const data = await listarCobrancas();
    setCobrancas(data);
  };

  useEffect(() => {
    fetchCobrancas();
  }, []);

  // Função chamada ao clicar em "Editar" na lista
  const handleEditar = (cobranca) => {
    setCobrancaEditar(cobranca);
  };

  // Função chamada quando o formulário é enviado com sucesso
  const handleSubmitSucesso = () => {
    setCobrancaEditar(null); // limpa edição
    fetchCobrancas();        // atualiza lista
  };

  return (
    <div className="app-container">
      {/* Header */}
      <CobrancaHeader />

      {/* Formulário de criação/edição */}
      <CobrancaForm
        cobrancaEditar={cobrancaEditar}
        onSubmitSucesso={handleSubmitSucesso}
      />

      {/* Lista de cobranças */}
      <CobrancaList
        cobrancas={cobrancas}
        onEditar={handleEditar}
        fetchCobrancas={fetchCobrancas}
      />
    </div>
  );
}

export default App;
