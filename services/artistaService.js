const mysql = require('../mysql').pool;
const helperArtistas = require('../Helper/artistasHelper')
function GetAllArtista(req,res,next){
    mysql.getConnection((erros,conn) => {
        if(erros){return res.status(500).send({error:erros})}
        conn.query(
            'SELECT * FROM Artista',
            (erros,resultado,field) => {
                if(erros){return res.status(500).send({error:erros})}
                return res.status(200).send({response:resultado})
            }
        )
        
    })
}

function GetIdArtista(req,res,next){
    mysql.getConnection((erros,conn) => {
        if(erros){return res.status(500).send({error:erros})}
        conn.query(
            'SELECT * FROM Artista WHERE idArtista = ?',[req.params.idArtista],
            (erros,resultado,field) => {
                if(erros){return res.status(500).send({error:erros})}   
                return res.status(200).send({response:resultado})
            }
        )
        
    })
}

function PostArtista(req,res,next){
    mysql.getConnection((erros,conn) => {
        if(erros){return res.status(500).send({error:erros})}
        conn.query(
            'INSERT INTO Artista (nome,dataCriacao,path) VALUES (?,?,?) ',[req.body.nome, new Date(), `/${req.body.nome}`],
            (erros,resultado,field) => {
                if(erros){return res.status(500).send({error:erros})}
                helperArtistas.CriaPastaArtista(`/${req.body.nome}`)
                return res.status(200).send({response:resultado})
                
            }
            
        )
        
    })
    
}
exports.GetAllArtista = GetAllArtista;
exports.GetIdArtista = GetIdArtista;
exports.PostArtista = PostArtista;