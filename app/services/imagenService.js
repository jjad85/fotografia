const imagenModel = require('../models/imagenModels');
const fs = require('fs');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
const config = require('../configs/config.js');

const s3 = new AWS.S3({
    accessKeyId: config.AWSID,
    secretAccessKey: config.AWSSECRET
});

exports.uploadImagen = async (rutaImagen, nombreImagen) => {
    const fileContent = fs.readFileSync(rutaImagen);
    const params = {
        Bucket: config.BUCKET_NAME,
        Key: nombreImagen,
        Body: fileContent
    };

    let a = await s3
        .upload(params, function (err, data) {
            if (err) {
                throw err;
            }
        })
        .promise();
    return a;
};

exports.cargarImagen = async (imagen) => {
    let addResult = await imagenModel.create(imagen);
    await this.obtenerTamanoImagen(imagen.rutaImagen);
    return addResult;
};

exports.listarImagenes = async () => {
    let imagenes = await imagenModel.find();
    return imagenes;
};

exports.obtenerTamanoImagen = async (imagen) => {
    var sizeOf = require('image-size');
    var dimensions = sizeOf(imagen);
    console.log(dimensions);
};
