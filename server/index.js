const express = require('express');
const app = express();

app.get('/calcular/:num1/:operacion/:num2', (req, res) => {
    const num1 = parseFloat(req.params.num1);
    const num2 = parseFloat(req.params.num2);
    const operacion = req.params.operacion;
    let resultado;

    switch (operacion) {
        case 'suma':
            resultado = num1 + num2;
            break;
        case 'resta':
            resultado = num1 - num2;
            break;
        case 'multiplicacion':
            resultado = num1 * num2;
            break;
        case 'division':
            if (num2 === 0) {
                return res.status(400).json({ error: 'No se puede dividir por cero' });
            }
            resultado = num1 / num2;
            break;
        default:
            return res.status(400).json({ error: 'Operación no válida' });
    }

    res.json({ resultado });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en localhost');
});