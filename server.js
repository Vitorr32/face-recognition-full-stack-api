const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
});

app.get('/', (req,res)=>{
    res.json('Welcome!');
});

app.post('/signin',(req,res) =>{ signin.signinAuthentication(req, res, db, bcrypt)});

app.post('/register',(req,res) =>{ register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', auth.requireAuth ,(req,res)=>{ profile.handleProfileGet(req, res, db)});
app.post('/profile/:id', auth.requireAuth ,(req,res)=>{ profile.handleProfileUpdate(req, res, db)});
app.put('/image', auth.requireAuth,(req,res) =>{ image.handleImage(req, res, db)});
app.post('/imageurl', auth.requireAuth,(req,res) =>{ image.callApi(req, res)});

app.listen(process.env.PORT ? process.env.PORT : 3000, () => {
    console.log(`app is running on port ${process.env.PORT ? process.env.PORT : 3000}`);
});