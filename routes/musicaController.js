const express = require('express');
const router = express.Router();
const MusicaService = require('../services/musicaService')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.trim())
    }
  });
const upload = multer({ storage: storage });

router.get('/:idAlbum',(req,res,next) => {
    MusicaService.GetAllMusicaAlbum(req,res,next)
})
router.get('/',(req,res,next) => {
   
})
router.post('/',upload.single('mp3'),(req,res,next) => {
    console.log(req.file)
    MusicaService.PostMusica(req,res,next)
})

module.exports = router