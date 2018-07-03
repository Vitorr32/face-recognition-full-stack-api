const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123',
      database : 'smart-brain'
    }
});


app.get('/', (req,res)=>{

});

app.post('/signin',(req,res) =>{ signin.handleSignin(req, res, db, bcrypt)});

app.post('/register',(req,res) =>{ register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id',(req,res)=>{ profile.handleProfileGet(req, res, db)});

app.put('/image',(req,res) =>{ image.handleImage(req, res, db)});

app.post('/imageurl',(req,res) =>{ image.callApi(req, res)});

app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});