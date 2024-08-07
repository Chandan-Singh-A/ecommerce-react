const query=require("../utilities/verificationquery")
const bcrypt = require('bcrypt');
const sendMail = require("../services/emailService");
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
        ob.pass = hashedPassword;
    } catch (err) {
        console.error(err);
    }

    query.checkuniqueuserquery(ob)
        .then((result) => {
            if (result.length === 0) {
                let body = `
                    <div>
                        <h1>Mail Verification</h1>
                        <p>This mail is for verify your request as a Seller in our site.Click Below to Verify Yourself</p>
                        <p><a href='http://localhost:7700/verifymail/${ob.id}'>click here to verify</a> to verify</p>
                    </div>
                `;
                sendMail(ob.email,'Ecommerce Verification',body)
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
        let ob = {
            email: req.body.username,
        }

        if(ob.email=='admin@gmail.com' && req.body.pass=='12345678'){
            req.session.login=true;
            req.session.username='admin@gmail.com'
            req.session.role="/admin";
            let ob={
                username:req.session.username,
                role:req.session.role
            }
            res.status(200).send({data:ob})
            return;
        }
        let plaintextPassword = req.body.pass;
        query.checkuserquery(ob)
        .then((result) => {
                if (result.length>0){
                    if (bcrypt.compareSync(plaintextPassword, result[0]?.pass)) {
                        req.session.login = true;
                        req.session.role="/";
                        req.session.username=ob.email;
                        res.status(200).json({data:req.session});
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
        let ob = { ...req.body };
        let plaintextPassword = req.body.pass;

        query.checksellerquery(ob)
            .then(async(result) => {
                if (result.length !== 0) {
                    if (await bcrypt.compareSync(plaintextPassword, result[0].pass)) {
                        req.session.login = true;
                        req.session.role="/seller";
                        req.session.username = ob.email;
                        res.status(200).json({data:req.session});
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

function verifysellermail(req,res){
    query.verifysellermail(req.params.id)
    .then((result) => {
        res.redirect("http://localhost:5173/seller/login")       
    }).catch((err) => {
        console.log(err);
    });
}

module.exports={signup,login,verifymail,sellerlogin,sellersignup,verifysellermail}