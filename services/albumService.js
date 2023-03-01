const mysql = require('../mysql').pool;
const helperArtistas = require('../Helper/artistasHelper')
function GetAllAlbumArtistas(req,res,next){
    mysql.getConnection((erros,conn) => {
        
        if(erros){return res.status(500).send({error:erros})}
        conn.query(
            'SELECT * FROM Album WHERE Artista_idArtista = ?',
            [req.params.idArtista],
            (erros,resultado,field) => {
                conn.release();
                if(erros){return res.status(500).send({error:erros})}
                return res.status(200).send({response:resultado})
            }
        )
        
    })
}

function PostAlbum(req,res,next){
    var pathAlbumArtista = "";
    mysql.getConnection((erros,conn) => {
        if(erros){return res.status(500).send({error:erros})}
         conn.query(
            'SELECT path FROM Artista WHERE idArtista = ?',[req.body.idArtista],   
            (erros,result,field) => {
                pathAlbumArtista = result[0].path;
            
            }
            
        )
        
    })
    mysql.getConnection((erros,conn) => {
        if(erros){return res.status(500).send({error:erros})}
        conn.query(
            'INSERT INTO Album (nome,descricao,dataCriacao,path,Artista_idArtista) VALUES (?,?,?,?,?) ',
            [req.body.nome,req.body.descricao, new Date(), `/${req.body.nome}`, req.body.idArtista],
            (erros,result,field) => {
                conn.release();
                if(erros){return res.status(500).send({error:erros})}  
                helperArtistas.CriaPastaAlbumArtista(`${pathAlbumArtista}/${req.body.nome}`)           
                return res.status(200).send({response:result})
                
            }
            
        )
        
    })
    
   
}
exports.PostAlbum = PostAlbum;
exports.GetAllAlbumArtistas = GetAllAlbumArtistas;