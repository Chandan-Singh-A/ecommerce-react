const query=require("../utilities/verificationquery")
const bcrypt = require('bcrypt');
const mail = require("../mail");
const sendMail = require("../services/emailService");
const makeToken = require("../utilities/tokenizer");
require('dotenv').config()

function signup(req,res){
    let ob = {
        name: req.body.name,
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
    console.log(req.session);
    if (req.session.login) {
        res.status(200).send();
    } else {
        let ob = {
            email: req.body.username,
        }

        let plaintextPassword = req.body.pass;

        console.log(ob);
        query.checkuserquery(ob)
        .then((result) => {
                if (result.length>0) {
                    if (bcrypt.compareSync(plaintextPassword, result[0]?.password)) {
                        // const token = makeToken({...result[0],isLogin:true})
                        // console.log(token);
                        // res.cookie("token",token)
                        req.session.login = true;
                        req.session.username=ob.email;
                        console.log(req.session.login);
                        res.status(200).json({data:ob.email});
                    } else {
                        res.status(401).json({error:"Wrong Password"})
                    }
                } else {
                    res.status(404).json({error:"User Not Found"});
                }
            }).catch((err) => {
                console.log(err);
                res.status(500).json({error:"Internal Server Error"});
            });
    }
}

function verifymail(req,res){
        query.verifymail(req.params.id)
            .then((result) => {
                res.redirect("http://localhost:5173/login");
            }).catch((err) => {
                console.log(err);
            });
}

function sellersignup(req,res){
    let ob = {
        ...req.body,
        id: Math.random(),
        isverified: false,
        isverifiedAdmin:false,
    }

    console.log(ob);

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

    console.log(ob);

    query.checkuniquesellerquery(ob)
        .then((result) => {
            if (result.length === 0) {
                let body = `
                    <div>
                        <h1>Mail Verification</h1>
                        <p>This mail is for verify your request as a Seller in our site.Click Below to Verify Yourself</p>
                        <p><a href='http://localhost:7700/verifysellermail/${ob.id}'>click here to verify</a> to verify</p>
                    </div>
                `;
                sendMail(ob.email,'Ecommerce Verification',body)
                console.log("ob before db", ob);
                query.savesellerdbquery(ob)
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

function sellerlogin(req, res) {
    console.log(req.session);

    if (req.session.login) {
        res.status(200).send();
    } else {
        let ob = { ...req.body };

        console.log(ob);

        let plaintextPassword = req.body.pass;

        query.checksellerquery(ob)
            .then(async(result) => {
                console.log(2, result);
                if (result.length !== 0) {
                    console.log(1, result);
                    console.log(bcrypt.compareSync(plaintextPassword, result[0].sellerpassword));
                    if (await bcrypt.compareSync(plaintextPassword, result[0].sellerpassword)) {
                        req.session.login = true;
                        req.session.username = ob.email;
                        console.log(req.session.login);
                        res.status(200).send();
                    } else {
                        res.status(401).send({ message: 'Invalid password' }); // Changed to 401 for unauthorized access
                    }
                } else {
                    res.status(404).send({ message: 'User not found' }); // Changed to 404 for not found
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ message: 'Internal server error' }); // Changed to 500 for server errors
            });
    }
}

module.exports = sellerlogin;


function verifysellermail(req,res){
    query.verifysellermail(req.params.id)
    .then((result) => {
        res.redirect("http://localhost:5173/seller/login")       
    }).catch((err) => {
        console.log(err);
    });
}
module.exports={signup,login,verifymail,sellerlogin,sellersignup,verifysellermail}