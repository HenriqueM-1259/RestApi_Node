function UploadMusica(diretorio){
    
    if (!fs.existsSync(dir + diretorio)){
        
        fs.mkdirSync(dir + diretorio);
    }
}