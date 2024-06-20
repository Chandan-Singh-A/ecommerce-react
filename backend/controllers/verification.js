const query=require("../utilities/verificationquery")
const bcrypt = require('bcrypt');
const mail = require("../mail");

function signup(req,res){
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

    query.checkuniqueuserquery(ob)
        .then((result) => {
            if (result.length === 0) {
                let body = `<p><a href='http://localhost:7700/verifymail/${ob.id}'>click here</a> to verify</p>`;
                mail(req.body.email, req.body.name, body, 'E-Commerce Site Verification Mail');
                console.log("ob before db", ob);
                query.saveuserdbquery(ob)
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
}

function login(req,res){
    if (req.session.login) {
        res.status(200).send();
    } else {
        let ob = {
            email: req.body.email,
        }

        let plaintextPassword = req.body.pass;

        query.checkuserquery(ob)
            .then((result) => {
                if (result.length !== 0) {
                    if (bcrypt.compareSync(plaintextPassword, result[0].password)) {
                        req.session.login = true;
                        req.session.username=ob.email;
                        console.log(req.session.login);
                        res.status(200).send();
                    } else {
                        res.status(400).send();
                    }
                } else {
                    res.status(400).send();
                }
            }).catch((err) => {
                console.log(err);
                res.status(404).send();
            });
    }
}

function verifymail(req,res){
        query.verifymailquery(req.params.id)
            .then((result) => {
                res.redirect("http://localhost:5173/login");
            }).catch((err) => {
                console.log(err);
            });
}
module.exports={signup,login,verifymail}