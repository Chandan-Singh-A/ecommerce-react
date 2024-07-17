require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt');
const session = require("express-session");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"_"+Date.now()+".jpg");
    }
});

const upload = multer({ storage: storage });

app.use(express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));
app.use(session({
    secret: 'Secret Shopping',
    saveUninitialized: false,
    resave:false,
    cookie: {
        path: '/',
        domain: 'localhost',
        httpOnly: true,
    }
}));
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});


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

//seller verification

app.post("/sellersignup", verification.sellersignup);
app.post("/sellerlogin", verification.sellerlogin);


//homepage
const homepage = require("./controllers/homepage");

app.get("/loadproducts/:first/:second", homepage.loadproducts);
app.get("/getproductscount",homepage.getproductscount);
app.post("/addtocart", homepage.addtocart);

//cartpage
const cartpage=require("./controllers/cartpage");

app.get("/loadcart",cartpage.loadcart)
app.put("/updatecart/:id/:op",cartpage.updatecart)


//seller
const seller=require("./controllers/seller")
app.post("/addproducts", upload.single("pimage"), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    seller.addProduct(req, res);
});
app.get("/sellerproducts",seller.sellerproducts)
app.delete("/deleteproduct/:id",seller.deleteproduct)
app.post("/updateproduct",seller.updateproduct)

//admin
const admin=require("./controllers/admin")
app.get("/users",admin.users)
app.get("/sellers",admin.sellers)
app.delete("/removeuser",admin.removeuser)
app.get("/productreq",admin.productreq)
app.put("/productrequpdation",admin.productrequpdation)

//auth

app.get("/auth", (req, res) => {
    console.log(3,req.session);
    if (req.session.login) {
        res.status(200).json({data:req.session});
    } else {
        res.status(401).json({error:"Unauthorised access"});
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