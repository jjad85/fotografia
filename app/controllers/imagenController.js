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

exports.subirArchivo = async (req, res, next) => {
    const archivo = req.files.archivo;
    const fileName = archivo.name;
    const path = __dirname + '/../uploads/' + fileName;

    archivo.mv(path, (error) => {
        if (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ status: 'error', message: error }));
            return;
        }
        return res.status(200).send({
            status: 'success',
            path: __dirname + '\\uploads\\' + fileName
        });
    });
};
