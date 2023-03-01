const fs = require('fs');
const dir = './Artistas'
function CriaPastaArtista(diretorio){
    if (!fs.existsSync(diretorio)){
        //Efetua a criação do diretório
        fs.mkdirSync(dir + diretorio);
    }
}

exports.CriaPastaArtista = CriaPastaArtista;