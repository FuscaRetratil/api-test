require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json);

const PORT = 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado!"))
    .catch(err => console.error('Erro', err));

app.listen(PORT, () => {
    console.log("Servidor rodando")
})


const Order = require('./Order');

app.post('/orders', async (req, res) => {
    try {
        const pedido = req.body;
        const pedidoMapeado = {
            orderId: pedido.numeroPedido,
            value: pedido.valorTotal,
            creationDate: new Date(pedido.dataCriacao),
            items: pedido.items.map(item => ({
                productid: Number(item.idItem),
                quantify: item.quantidadeItem,
                price: item.valorItem
            }))
        };
        const newOrder = new Order(orderData);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.get('/orders', async (req, res) => {
    try {
        const pedidos = await Order.find();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar pedidos", erro: error.message });
    }
})