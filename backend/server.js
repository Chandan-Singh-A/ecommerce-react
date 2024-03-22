const express = require('express');
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: "http://localhost:5173"
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
    database: "ecommerce",
});

con.connect(function (err) {
    if (err) {
        console.log("sql error", err);
    } else {
        console.log("Mysql Database Connected");
    }
});

const mail = require("./mail");

app.post("/signup", (req, res) => {
    let ob = {
        name: "Chandan",
        email: req.body.email,
        id: Math.random(),
        isverified: false
    }

    let plaintextPassword = req.body.pass;
    let saltRounds = 10;

    try {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashedPassword = bcrypt.hashSync(plaintextPassword, salt);
        console.log("Hashed password:", hashedPassword);
        ob.pass = hashedPassword;
    } catch (err) {
        console.error(err);
    }

    checkuniqueuser(ob)
        .then((result) => {
            if (result.length === 0) {
                let body = `<p><a href='http://localhost:7700/verifymail/${ob.id}'>click here</a> to verify</p>`;
                mail(req.body.email, req.body.name, body, 'E-Commerce Site Verification Mail');
                console.log("ob before db", ob);
                saveuserdb(ob)
                    .then((result) => {
                        res.status(200).send();
                    }).catch((err) => {
                        console.log(err);
                        res.status(404);
                    });
            } else {
                res.status(300).send();
            }
        }).catch((err) => {
            console.log(err);
            res.status(404);
        });
});

app.get("/verifymail/:id", (req, res) => {
    verifymail(req.params.id)
    .then((result) => {
        res.status(200).send();
    }).catch((err) => {
        console.log(err);
    });
})

function verifymail(id){
    return new Promise((resolve,reject)=>{
        con.query(`update users set isverified=1 where id=${id};`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

function checkuniqueuser(ob) {
    return new Promise((resolve, reject) => {
        con.query(`select * from users where email='${ob.email}'`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function saveuserdb(ob) {
    return new Promise((resolve, reject) => {
        con.query(`insert into users values('${ob.name}','${ob.email}','${ob.pass}',${ob.isverified},${ob.id})`, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

app.post("/login", (req, res) => {
    let ob = {
        email: req.body.email,
    }

    let plaintextPassword = req.body.pass;
    let saltRounds = 10;

    try {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashedPassword = bcrypt.hashSync(plaintextPassword, salt);
        console.log("Hashed password:", hashedPassword);
        ob.pass = hashedPassword;
    } catch (err) {
        console.error(err);
    }

    checkuser(ob)
        .then((result) => {
            if (result.length !== 0) {
                res.status(200).send()
            } else {
                res.status(400).send();
            }
        }).catch((err) => {
            console.log(err);
        });
});

function checkuser(ob) {
    console.log("ob",ob);
    return new Promise((resolve, reject) => {
        con.query(`select * from users where email='${ob.email}' and pass='${ob.pass}' and isverified=true`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}
app.listen(7700, () => {
    console.log("Server is running on port:7700");
});