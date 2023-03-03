const express = require('express');
const router = express.Router();
const AlbumService = require('../services/albumService');

router.get('/:idArtista',(req,res,next) => {
    AlbumService.GetAllAlbumArtistas(req,res,next);
})
router.get('/',(req,res,next) => {
    AlbumService.GetAllAlbum(req,res,next);
})
router.post('/',(req,res,next) => {
    AlbumService.PostAlbum(req,res,next);
    
})

module.exports = router