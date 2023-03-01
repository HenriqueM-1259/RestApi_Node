const fs = require('fs');
const dir = './Artistas'
function CriaPastaArtista(diretorio){
    if (!fs.existsSync(diretorio)){
        //Efetua a criação do diretório
        fs.mkdirSync(dir + diretorio);
    }
}
function CriaPastaAlbumArtista(diretorio){
    console.log(diretorio)
    if (!fs.existsSync(dir + diretorio)){
        //Efetua a criação do diretório
        fs.mkdirSync(dir + diretorio);
    }
}

exports.CriaPastaArtista = CriaPastaArtista;
exports.CriaPastaAlbumArtista = CriaPastaAlbumArtista;