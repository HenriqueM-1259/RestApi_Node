const mysql = require('../mysql').pool;
const helperArtistas = require('../Helper/artistasHelper')


function GetAllMusicaAlbum(req,res,field){
    mysql.getConnection((erros,conn) => {
        if(erros){return res.status(500).send({error:erros})}
        conn.query(
            'SELECT * FROM Musica WHERE Album_idAlbum = ?',[req.params.idAlbum],
            (erros,resultado,field) => {
                conn.release();
                if(erros){return res.status(500).send({error:erros})}
                return res.status(200).send({response:resultado})
            }
        )
    })
}

function PostMusica(req,res,field,upload){
    mysql.getConnection((erros,conn) => {
        if(erros){return res.status(500).send({error:erros})}
        conn.query(
            'INSERT INTO Musica (nome,decricao,path,dataCriada,Album_idAlbum,Album_Artista_idArtista) VALUES  (?,?,?,?,?,?)',

            [req.body.nome,
            req.body.descricao,
            `/${req.body.nome}`,
            new Date(), 
            req.body.idAlbum,
            req.body.idArtista],

            (erros,resultado,field) => {
                conn.release();
                if(erros){return res.status(500).send({error:erros})}
                return res.status(200).send({response:resultado})
            }
        )
    })
}
exports.GetAllMusicaAlbum = GetAllMusicaAlbum;
exports.PostMusica = PostMusica;