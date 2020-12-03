const imagenService = require('../services/imagenService');
const ReqFieldException = require('../exceptions/ReqFieldException');
const ExceptionGeneral = require('../exceptions/ExceptionGeneral');

exports.cargarImagen = async (req, res) => {
    if (!req.body.rutaImagen) {
        throw new ReqFieldException('rutaImagen');
    }
    if (!req.body.nombreImagen) {
        throw new ReqFieldException('nombreImagen');
    }

    let urlAWS = await imagenService.uploadImagen(
        req.body.rutaImagen,
        req.body.nombreImagen
    );
    req.body.urlAWS = urlAWS.Location;
    console.log(req.body);
    let imagen = await imagenService.cargarImagen(req.body);
    res.status(200).send(imagen);
};

exports.listarImagenes = async (req, res) => {
    let imagenes = await imagenService.listarImagenes();
    if (!imagenes) {
        throw new ExceptionGeneral('No hay imagenes', 401);
    }
    res.status(200).send(imagenes);
};
