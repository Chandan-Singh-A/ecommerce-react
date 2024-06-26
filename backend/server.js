require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt');

const multer = require("multer");
app.use(express.static("uploads"));
const upload = multer({ dest: 'uploads/' });
app.use(upload.any());


app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

var session = require("express-session");
app.use(session({
    secret: 'Secret Shopping',
    resave: true,
    saveUninitialized: true,
}));

const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "e-commerce",
});

con.connect(function (err) {
    if (err) {
        console.log("sql error", err);
    } else {
        console.log("Mysql Database Connected");
    }
});

const verification = require("./controllers/verification");
//verification

app.post("/signup", verification.signup)

app.get("/verifymail/:id", verification.verifymail)

app.post("/login", verification.login)

app.get("/verifysellermail/:id",verification.verifysellermail)


//homepage
const homepage = require("./controllers/homepage");

app.get("/loadproducts/:first/:second", homepage.loadproducts);
app.get("/getproductscount",homepage.getproductscount);

app.post("/addtocart", homepage.addtocart);

//cartpage
const cartpage=require("./controllers/cartpage");
const sendMail = require('./services/emailService');

app.get("/loadcart",cartpage.loadcart)
app.put("/updatecart/:id/:op",cartpage.updatecart)

//seller verification

app.post("/sellersignup", verification.sellersignup);

app.post("/sellerlogin", verification.sellerlogin);

//seller

//
app.get("/auth", (req, res) => {
    console.log(req.session.login);
    if (req.session.login) {
        res.status(200).send();
    } else {
        res.status(300).send();
    }
})

//logout

app.post("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.status(500).send();
        }else{
            res.status(200).send();
        }
    });
})

app.listen(7700, () => {
    console.log("Server is running on port:7700");
});