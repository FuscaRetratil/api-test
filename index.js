require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado!"))
    .catch(err => console.error('Erro', err));

app.listen(PORT, () => {
    console.log("Servidor rodando")
})


const Order = require('./Order');

app.post('/order', async (req, res) => {
    try {
        const pedido = req.body;
        if(!pedido.numeroPedido || !pedido.valorTotal || !pedido.dataCriacao || !pedido.items) {
            return res.status(400).json({ error: 'Campos obrigatórios'});
        }
        const pedidoMapeado = {
            orderId: pedido.numeroPedido,
            value: pedido.valorTotal,
            creationDate: new Date(pedido.dataCriacao),
            items: pedido.items.map(item => ({
                productId: Number(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };
        const newOrder = new Order(pedidoMapeado);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.get('/order/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const pedidos = await Order.findOne({ orderId });
        if(!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado'})
        }
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar pedidos", erro: error.message });
    }
})

app.get('order/list', async (req, res) => {
    try {
        const pedidos = await Order.find();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

app.put('/order/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const atualizar = req.body;
        
        const dadosAtualizados =  {};
        const pedidoAtualizado = await Order.findOneAndUpdate(
            { orderId },
            dadosAtualizados,
            { new: true, runValidators: true }
        );
        if(!pedidoAtualizado) {
            return res.status(404).json({ error: 'Pedido não encotrado'})
        }
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

app.delete('/order/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const pedidoDeletado = await Order.findOneAndDelete({ orderId });

        res.status(200).json({ mensagem: `Pedido deletado com sucesso.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})