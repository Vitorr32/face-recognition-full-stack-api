const handleRegister = (req,res, db, bcrypt) =>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json('One of the fields is empty!');
    }

    const passhash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            email: email,
            hash : passhash
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            return trx('users')
                .returning('*')
                .insert({        
                    email : loginEmail[0],
                    name: name,
                    joined : new Date()
                })
                .then(response => {
                    res.json(response[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })    
    .catch(err => res.status(400).json(`Unable to Register`));
};

module.exports = {
    handleRegister : handleRegister,
}