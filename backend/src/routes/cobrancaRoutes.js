const express = require('express');
const router = express.Router();
const db = require('../db'); 

// POST /cobrancas
router.post('/', (req, res) => {
    const { nome_cliente, descricao, valor, data_vencimento } = req.body;

    if (!nome_cliente || !valor || !data_vencimento) {
        return res.status(400).json({ 
            error: 'nome_cliente, valor e data_vencimento são obrigatórios' 
        });
    }

    const sql = `
        INSERT INTO cobrancas 
        (nome_cliente, descricao, valor, data_vencimento, status) 
        VALUES (?, ?, ?, ?, 'PENDENTE')
    `;

    db.query(sql, [nome_cliente, descricao, valor, data_vencimento], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            id: result.insertId,
            nome_cliente,
            descricao,
            valor,
            status: 'PENDENTE',
            data_vencimento
        });
    });
});

// GET /cobrancas
router.get('/', (req, res) => {

    // Atualiza cobranças vencidas automaticamente
    const updateSql = `
        UPDATE cobrancas
        SET status = 'ATRASADA'
        WHERE status IN ('PENDENTE')
        AND data_vencimento < CURDATE()
    `;

    db.query(updateSql, (updateErr) => {
        if (updateErr) {
            return res.status(500).json({ error: updateErr.message });
        }

        const selectSql = `
            SELECT * 
            FROM cobrancas
            ORDER BY data_vencimento ASC
        `;

        db.query(selectSql, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json(results);
        });
    });
});


// PUT /cobrancas/:id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome_cliente, descricao, valor, data_vencimento } = req.body;

    if (!nome_cliente || !valor || !data_vencimento) {
        return res.status(400).json({ 
            error: 'nome_cliente, valor e data_vencimento são obrigatórios' 
        });
    }

    const sql = `
        UPDATE cobrancas 
        SET nome_cliente = ?, 
            descricao = ?, 
            valor = ?, 
            data_vencimento = ?
        WHERE id = ?
    `;

    db.query(sql, [nome_cliente, descricao, valor, data_vencimento, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cobrança não encontrada' });
        }

        res.json({ message: 'Cobrança atualizada com sucesso' });
    });
});


// DELETE /cobrancas/:id
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

//  PATCH /cobrancas/:id/status
router.patch('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const statusValidos = ['PENDENTE', 'PAGO', 'ATRASADA'];

    if (!status || !statusValidos.includes(status)) {
        return res.status(400).json({ 
            error: 'Status inválido. Use PENDENTE, PAGO ou ATRASADA.' 
        });
    }

    const sql = 'UPDATE cobrancas SET status = ? WHERE id = ?';

    db.query(sql, [status, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cobrança não encontrada' });
        }

        res.json({ message: `Status atualizado para "${status}"` });
    });
});

module.exports = router;
