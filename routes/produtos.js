const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/',(req,res,next) => {
    mysql.getConnection((erros,conn) => {
        conn.query("SELECT * FROM Produtos"),[],
        (error,resultado,field) => {
            conn.release();
            if(error){
                return res.status(500).send({
                    erros: error,
                    response:null
                })
            }
            return res.status(200).send({
                response:resultado
            })

        }
    })
    
})

router.post('/',(req,res,next)=>{
    mysql.getConnection((error,conn) => {
        debugger
        console.log(conn)
        conn.query(
            'INSERT INTO Produtos (nome,preco) VALUES (?,?)',
            [req.body.nome,req.body.preco],
            (error,resultado,field) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        erros:error,
                        response: null,
                    })
                }

                return res.status(201).send({
                    mensagem: "Produto Inserido com sucesso",
                    Id_produto : resultado.insertId
                })
            })
        
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