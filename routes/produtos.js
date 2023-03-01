const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/',(req,res,next) => {
    mysql.getConnection((erros,conn) => {
        if(erros){return res.status(500).send({error:erros})}
        conn.query(
            'SELECT * FROM Produtos',
            (erros,resultado,field) => {
                if(erros){return res.status(500).send({error:erros})}
                return res.status(200).send({response:resultado})
            }
        )
        
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
router.patch('/',(req,res,next)=>{
    mysql.getConnection((error,conn) => {
        debugger
        console.log(conn)
        conn.query(
            'UPDATE Produtos SET Nome = ? ,Preco = ? where idProdutos = ?',
            [req.body.nome, req.body.preco, req.body.id_produto],
            (error,resultado,field) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        erros:error,
                        response: null,
                    })
                }

                return res.status(202).send({
                    mensagem: "Produto Alterado com sucesso",
                    Id_produto : resultado
                })
            })
        
    })
})
router.get('/:id_produto', (req,res,next) => {
      mysql.getConnection((error,conn) => {
        conn.query('SELECT * FROM Produtos WHERE idProdutos = ?',[req.params.id_produto],
        (error,resultado,field) => {
            if(error) {return res.status(500).send({error:error})}
            return res.status(200).send({response:resultado})
        })
    })
    
})

router.delete('/',(req,res,next) => {
    mysql.getConnection((error,conn) => {
        debugger
        console.log(conn)
        conn.query(
            'DELETE FROM Produtos where idProdutos = ?',
            [req.body.id_produto],
            (error,resultado,field) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        erros:error,
                        response: null,
                    })
                }

                return res.status(202).send({
                    mensagem: "Produto deletado com sucesso",
                    Id_produto : resultado
                })
            })
        
    })
})

module.exports = router