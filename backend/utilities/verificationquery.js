const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "e-commerce",
});

function checkuniqueuserquery(ob) {
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

function saveuserdbquery(ob) {
    return new Promise((resolve, reject) => {
        con.query(`insert into users values('${ob.email}','${ob.name}','${ob.pass}',${ob.isverified},${ob.id})`, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

function checkuserquery(ob) {
    return new Promise((resolve, reject) => {
        con.query(`select * from users where email='${ob.email}' and isverified=true`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function verifymailquery(id) {
    return new Promise((resolve, reject) => {
        con.query(`update users set isverified=1 where _id=${id};`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}
module.exports={checkuniqueuserquery,saveuserdbquery,checkuserquery,verifymailquery}