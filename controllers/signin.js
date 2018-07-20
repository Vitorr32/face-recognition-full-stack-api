const jwt = require('jsonwebtoken');
const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_URI);

const checkCredentials = (req, res, db, bcrypt) =>{
    const {email , password} = req.body;

    if(!email || !password){
        return Promise.reject('One of the fields is empty!');
    }

    return db.select('email','hash').from('login')
        .where('email', '=' , email)
        .then(data =>{
            const valid = bcrypt.compareSync(password, data[0].hash);
            if(valid){
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(users => user[0])
                    .catch(err => Promise.reject('Unable to return the user'))
            }
            else{
                Promise.reject('Wrong credentials')
            }
    })
    .catch(err => Promise.reject('Unable to connect to the database'));
}

const getAuthTokenId = (req, res) =>{
    const { authorization} = req.headers;
    return redisClient.get(authorization, (err, reply ) =>{
        if(err || !reply){
            return res.status(400).json('bad token')
        }
        return res.json({id: reply});
    });
}

const signToken = (email) =>{
    const jwtPayload = {email};    
    return jwt.sign(jwtPayload, process.env.JWT_KEY, {expiresIn : '2 days'}); 
}

const setToken = (token, id) =>{
    return Promise.resolve(redisClient.set(token, id))
}

const createSessions = (user) =>{
    //JWT Token
    const {email, id} = user;
    const token = signToken(email);
    return setToken(token, id)
        .then( () => {
            return {sucess : true, userId: id, token};
        })
        .catch( err => console.log(err));
}


const signinAuthentication = (db, bcrypt) => (req , res) => {
    const { authorization } = req.headers;
    return authorization ? getAuthTokenId(req, res) : 
        checkCredentials(db, bcrypt, req, res) 
        .then(user => {
            user.id && user.email 
            ? createSessions(user)
            : Promise.reject('Wrong Credentials')
        })
        .then(session => res.json(session))
        .catch(err => res.status(400).json(err))
}

module.exports = {
    signinAuthentication: signinAuthentication,
    redisClient: redisClient,
}