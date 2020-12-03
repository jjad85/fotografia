const mongoose = require('mongoose');

let imagenScheme = new mongoose.Schema({
    rutaImagen: { type: String, required: true },
    nombreImagen: { type: String, required: true },
    urlAWS: { type: String, required: true },
    altoO: { type: String },
    anchoO: { type: String },
    altoN: { type: String },
    anchoN: { type: String }
});

mongoose.model('imagen', imagenScheme);
module.exports = mongoose.model('imagen');
