const handleSignin = (req, res, db, bcrypt) =>{
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(400).json('One of the fields is empty!');
    }

    db.select('email','hash').from('login')
        .where('email', '=' , email)
        .then(data =>{
            const valid = bcrypt.compareSync(password, data[0].hash);
            if(valid){
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(users =>{
                        res.json(users[0]);
                    })
                    .catch(err => res.status(400).json('Unable to return the user'))
            }
            else{
                res.status(400).json('Wrong credentials')
            }
    })
    .catch(err => res.status(400).json('Unable to connect to the database'));
}

module.exports = {
    handleSignin: handleSignin,
}