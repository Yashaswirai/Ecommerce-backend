const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/mongoose-connection');
require("dotenv").config();
const userRouter = require('./routes/userRoutes');
const ownerRouter = require('./routes/ownerRoutes');
const productRouter = require('./routes/productRoutes');
const indexRouter = require('./routes/index');
const expressSession = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const http = require('http').Server(app);


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());

app.use('/user',userRouter);
app.use('/owner',ownerRouter);
app.use('/product',productRouter);
app.use('/',indexRouter);

http.listen(3000)