const express = require('express');
const app = express();
const rotaProdutos = require('./routes/produtos')
const rotaPedidos = require('./routes/pedidos')
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

app.use('/teste',(req,res,next) => {

   return res.status(200).send({
    mensagem: "ok"
   });
});

module.exports = app;