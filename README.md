# 📦 API de Pedidos — Desafio

API para gerenciamento de pedidos.

---

## ⚙️ Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- MongoDB rodando localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/FuscaRetratil/api-test.git
cd api-test
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:
```
MONGO_URI=mongodb://localhost:27017/jitterbit-orders
PORT=3000
```

### 4. Iniciar o servidor
```bash
node index.js
```

Saída esperada:
```
Servidor rodando na porta 3000
Conectado ao MongoDB!
```
---

## 🔁 Mapeamento de campos

A API recebe os dados no formato original e os transforma antes de salvar no banco:

| Campo recebido (request) | Campo salvo (banco) |
|--------------------------|----------------------|
| numeroPedido             | orderId              |
| valorTotal               | value                |
| dataCriacao              | creationDate         |
| items[].idItem           | items[].productId    |
| items[].quantidadeItem   | items[].quantity     |
| items[].valorItem        | items[].price        |

---

## 📋 Endpoints

### ✅ POST `/order` — Criar pedido

```bash
curl -X POST http://localhost:3000/order \
-H "Content-Type: application/json" \
-d '{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}'
```

**Resposta `201 Created`:**
```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```
---

### ✅ GET `/order/:orderId` — Buscar pedido por número

```bash
curl http://localhost:3000/order/v10089015vdb-01
```

**Resposta `200 OK`** — retorna o pedido  
**Resposta `404 Not Found`** — pedido não existe

---

### GET `/order/list` — Listar todos os pedidos

```bash
curl http://localhost:3000/order/list
```

**Resposta `200 OK`** — retorna array com todos os pedidos

---

### PUT `/order/:orderId` — Atualizar pedido

```bash
curl -X PUT http://localhost:3000/order/v10089015vdb-01 \
-H "Content-Type: application/json" \
-d '{"valorTotal": 15000}'
```

**Resposta `200 OK`** — retorna pedido atualizado  
**Resposta `404 Not Found`** — pedido não existe

---

### DELETE `/order/:orderId` — Deletar pedido

```bash
curl -X DELETE http://localhost:3000/order/v10089015vdb-01
```

**Resposta `200 OK`** — pedido deletado com sucesso  
**Resposta `404 Not Found`** — pedido não existe

---

## 🗄️ Estrutura do banco de dados (MongoDB)

```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

---