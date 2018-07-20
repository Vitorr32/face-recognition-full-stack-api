const handleProfileGet = (req, res, db) => {
    const {id} = req.params;

    db.select('*').from('users').where({id})
        .then(user => { 
            user.length ? res.json(user[0]) : res.status(404).json(`Unknown Profile`)        
        })
        .catch(err => res.status(404).json(`Error getting user`));
}

const handleProfileUpdate = (req, res, db) =>{
    const {id} = req.params;
    const {name, age, pet} = req.body.formInput;
    db('users')
        .where({ id })
        .update({ name, age, pet })
        .then(resp => {
            if(resp){
                res.json("sucess");
            }
            else{
                res.status(400).json("Unable do Update")
            }
        })
        .catch(err => res.status(400).json("Error during update operation"))
}


module.exports = {
    handleProfileGet,
    handleProfileUpdate
}