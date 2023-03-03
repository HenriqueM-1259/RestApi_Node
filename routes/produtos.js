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
                console.log(resultado)
                const response = {
                    
                    quantidade: resultado.length,
                    produtos: resultado.map(prod => {
                        return {
                            id_produto: prod.idProdutos,
                            nome: prod.Nome,
                            preco: prod.Preco,
                            request: {
                                Tipo: 'Get',
                                descricao: "Retorna todos os produtos",
                                url: "/produtos/" + prod.idProdutos
                            }
                        }
                    })
                }
                return res.status(200).send({response})
            }
        )
        
    })
    
})

router.post('/',(req,res,next)=>{
    console.log(req.file);
    mysql.getConnection((error,conn) => {
        debugger
        console.log(conn)
        conn.query(
            'INSERT INTO Produtos (nome,preco) VALUES (?,?)',
            [req.body.nome,req.body.preco],
            (error,result,field) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        erros:error,
                        response: null,
                    })
                }
                const response = {
                    mensagem: 'Produto criado com sucesso',
                    ProdutoCriado: 
                         {
                            id_produto: result.idProdutos,
                            nome: result.Nome,
                            preco: result.Preco,
                            request: {
                                Tipo: 'Post',
                                descricao: "Insere um produto",
                                url: "/produtos/" + result.idProdutos
                            }
                        }
                }
                return res.status(201).send({
                    response
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
            (error,result,field) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        erros:error,
                        response: null,
                    })
                }
                const response = {
                    
                    mensagem: 'Produto Alterado com sucesso',
                    ProdutoAlterado: 
                         {
                            id_produto: req.body.idProdutos,
                            nome: req.body.nome,
                            preco: req.body.preco,
                            request: {
                                Tipo: 'Patch',
                                descricao: "Altera um produto",
                                url: "/produtos/" + result.idProdutos
                            }
                        }
                }
                
                return res.status(202).send({
                    response
                })
            })
        
    })
})
router.get('/:id_produto', (req,res,next) => {
      mysql.getConnection((error,conn) => {
        conn.query('SELECT * FROM Produtos WHERE idProdutos = ?',[req.params.id_produto],
        (error,result,field) => {
            if(error) {return res.status(500).send({error:error})}
            const response = {
                    
                quantidade: result.length,
                produtos: result.map(prod => {
                    return {
                        id_produto: prod.idProdutos,
                        nome: prod.Nome,
                        preco: prod.Preco,
                        request: {
                            Tipo: 'Get',
                            descricao: "Retorna somente o produto do id",
                            url: "/produtos/" + prod.idProdutos
                        }
                    }
                })
            }
            return res.status(200).send({response})
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