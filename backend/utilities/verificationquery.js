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
        con.query(`select * from users where email='${ob.email}' and isverified is TRUE`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function verifymail(id) {
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

function checkuniquesellerquery(mail) {
    return new Promise((resolve, reject) => {
        con.query(`select * from seller where sellermail='${mail}'`, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

function savesellerdbquery(ob) {
    return new Promise((resolve, reject) => {
        con.query(`insert into seller values ('${ob.email}','${ob.username}','${ob.pass}','${ob.bName}',${ob.isverified},${ob.isverifiedAdmin},${ob.id})`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })   
    })
}

function checksellerquery(ob) {
    return new Promise((resolve, reject) => {
        con.query(`select * from seller where sellermail='${ob.email}' and isverified=1`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function verifysellermail(id) {
    return new Promise((resolve, reject) => {
        con.query(`update seller set isverified=1 where _id=${id}`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}
module.exports = { checkuniqueuserquery, saveuserdbquery, checkuserquery, verifymail, checkuniquesellerquery, savesellerdbquery, verifysellermail, checksellerquery }