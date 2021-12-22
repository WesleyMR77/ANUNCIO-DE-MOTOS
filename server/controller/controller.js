const UploadModel = require('../model/schema');
const fs = require('fs');



exports.home = async (req, res) => {
    const all_images = await UploadModel.find()
    res.render('main', { images : all_images });
}

exports.uploads = (req, res , next) => {
    const files = req.files;
    let nome = req.body.nome;
    let preco = parseFloat(req.body.preco)
    let telefone = req.body.telefone;
    let descricao = req.body.descricao;

    if(!files){
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }

    let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64')
    })

    let result = imgArray.map((src, index) => {

        let finalImg = {
            nome: nome,
            preco: preco,
            telefone: telefone,
            descricao: descricao,
            filename : files[index].originalname,
            contentType : files[index].mimetype,
            imageBase64 : src
        }

        let newUpload = new UploadModel(finalImg);

        return newUpload
                .save()
                .then(() => {
                    return { msg : `${files[index].originalname} Salvo com sucesso!`}
                })
                .catch(error =>{
                    if(error){
                        if(error.name === 'MongoError' && error.code === 11000){
                            return Promise.reject({ error : `Arquivo duplicado ${files[index].originalname}. O arquivo já existe! `});
                        }
                        return Promise.reject({ error : error.message || `Não é possivel salvar ${files[index].originalname} Está faltando`})
                    }
                })
    });

    Promise.all(result)
        .then( msg => {
                // res.json(msg);
            res.redirect('/')
        })
        .catch(err =>{
            res.json(err);
        })
}

