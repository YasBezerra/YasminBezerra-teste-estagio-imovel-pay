const db = require('../db');

exports.criar = (req, res) => {
    const { nome_cliente, valor } = req.body;
    db.query(
        'INSERT INTO cobrancas (nome_cliente, valor) VALUES (?, ?)',
        [nome_cliente, valor],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, nome_cliente, valor });
        }
    );
};

exports.listar = (req, res) => {
    db.query('SELECT * FROM cobrancas', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
