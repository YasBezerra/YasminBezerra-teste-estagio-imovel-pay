const express = require('express');
const router = express.Router();
const db = require('../db'); 

// POST /cobrancas — cria uma nova cobrança
router.post('/', (req, res) => {
    const { nome_cliente, valor } = req.body;

    if (!nome_cliente || !valor) {
        return res.status(400).json({ error: 'nome_cliente e valor são obrigatórios' });
    }

    const sql = 'INSERT INTO cobrancas (nome_cliente, valor) VALUES (?, ?)';
    db.query(sql, [nome_cliente, valor], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, nome_cliente, valor });
    });
});

// GET /cobrancas — lista todas as cobranças
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM cobrancas';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// PUT /cobrancas/:id — atualiza uma cobrança
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome_cliente, valor } = req.body;

    if (!nome_cliente || !valor) {
        return res.status(400).json({ error: 'nome_cliente e valor são obrigatórios' });
    }

    const sql = 'UPDATE cobrancas SET nome_cliente = ?, valor = ? WHERE id = ?';

    db.query(sql, [nome_cliente, valor, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cobrança não encontrada' });
        }

        res.json({ message: 'Cobrança atualizada com sucesso' });
    });
});

// DELETE /cobrancas/:id — deleta uma cobrança
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM cobrancas WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cobrança não encontrada' });
        }

        res.json({ message: 'Cobrança deletada com sucesso' });
    });
});

// PATCH /cobrancas/:id/status — atualiza o status da cobrança
router.patch('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'O status é obrigatório' });
    }

    const sql = 'UPDATE cobrancas SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cobrança não encontrada' });
        }

        res.json({ message: `Status da cobrança atualizado para "${status}"` });
    });
});

module.exports = router;
