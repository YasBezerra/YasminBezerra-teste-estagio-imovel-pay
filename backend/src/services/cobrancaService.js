const db = require('../db');

const listar = () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM cobrancas', (err, results) => err ? reject(err) : resolve(results));
});

const criar = ({ nome_cliente, valor }) => new Promise((resolve, reject) => {
    db.query('INSERT INTO cobrancas (nome_cliente, valor) VALUES (?, ?)', [nome_cliente, valor], (err, results) => {
        if(err) return reject(err);
        resolve({ id: results.insertId, nome_cliente, valor });
    });
});

module.exports = { listar, criar };
