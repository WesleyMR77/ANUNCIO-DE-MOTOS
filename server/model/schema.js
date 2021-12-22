const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    nome: {
        type : String,
        required: true        
    },
    preco: {
        type : String,
        required: true        
    },
    telefone: {
        type : String,
        required: true        
    },
    descricao: {
        type : String,
        required: true        
    },
    filename : {
        type : String,
        unique : true,
        required: true
    },
    contentType : {
        type: String,
        required : true
    },
    imageBase64 : {
        type : String,
        required: true
    }
})

module.exports = UploadModel = mongoose.model('uploads', uploadSchema);