const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());

app.post('/calcular_valor_futuro', (req, res) => {
    try {
        const { capital_inicial, taxa_juros, tempo } = req.body;

        //J = C × i × t
        //J = juros simples; C = capital inicial; i = taxa de juros; t = tempo da aplicação.

        const valor_futuro = (capital_inicial * (1 + (taxa_juros / 100) * tempo)).toFixed(2);
        res.json({ valor_futuro });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
