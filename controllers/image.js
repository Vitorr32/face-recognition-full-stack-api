const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'e25d4397564b4d5abbfa90da26bb9c4d'
});
  
const callApi = (req, res) =>{    
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res=>status(400).json('Unable to acess API'))
}


const handleImage = (req, res, db) =>{
    const {id} = req.body;

    db('users').where({id})
        .increment('entries',1)
        .returning('entries')
        .then (entries => {
            res.json(entries);
        })
        .catch(err => res.status(404).json(`Unable to update user`));
}


module.exports = {
    handleImage: handleImage,
    callApi : callApi
}