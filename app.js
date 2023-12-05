const express = require('express')
const userRouter = require('./Routes/userRouter')
const postRouter = require('./Routes/postRouter')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');




// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/user',userRouter)
app.use('/post',postRouter)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))