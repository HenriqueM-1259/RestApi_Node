const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).send({
        mensagem: "Usando Get Dentro da rota pedido"
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).send({
        mensagem: "Usando post dentro da rota pedidos"
    })
})

router.get('/:id_pedido', (req,res,next) => {

    const id = req.params.id_produto
    if(id == ""){
        res.status(200).send({
            mendagem: "Id nullo",
            id: id
            })
    }else{
        res.status(200).send({
            mendagem: "Retorna um pedido com id",
            id: id
            })
    }
    
})

router.delete('/',(req,res,next) => {
    res.status(200).send({
        mensagem: "USando o DELETE dentro da rota de pedido"
    })
})

module.exports = router