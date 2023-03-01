const express = require('express');
const router = express.Router();
const ArtistaService = require('../services/artistaService');

router.get('/',(req,res,next) => {
    ArtistaService.GetAllArtista(req,res,next);
})
router.get('/:idArtista',(req,res,next) => {
   
    ArtistaService.GetIdArtista(req,res,next);
})
router.post('/',(req,res,next) => {
    ArtistaService.PostArtista(req,res,next);
})
module.exports = router