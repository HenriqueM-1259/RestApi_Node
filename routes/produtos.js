const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).send({
        mensagem: "Usando Get Dentro da rota produtos"
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).send({
        mensagem: "Usando post dentro da rota produtos"
    })
})

router.get('/:id_produto', (req,res,next) => {

    const id = req.params.id_produto
    if(id == ""){
        res.status(200).send({
            mendagem: "Id nullo",
            id: id
            })
    }else{
        res.status(200).send({
            mendagem: "Retorna um produto com id",
            id: id
            })
    }
    
})

router.patch('/',(req,res,next) => {
    res.status(200).send({
        mensagem: "USando o PATCH dentro da rota de produtos"
    })
})

router.delete('/',(req,res,next) => {
    res.status(200).send({
        mensagem: "USando o DELETE dentro da rota de produtos"
    })
})

module.exports = router