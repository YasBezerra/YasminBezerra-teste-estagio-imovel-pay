const express = require('express');
const app = express();
const cobrancasRoutes = require('./src/routes/cobrancaRoutes');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor principal funcionando');
});

// REMOVE o middleware de log temporariamente

app.use('/cobrancas', cobrancasRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
