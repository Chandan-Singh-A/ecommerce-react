const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "e-commerce",
});

function loadproductsquery(i, quant) {
    return new Promise((resolve, reject) => {
        con.query(`select * from product  where isaccepted=1 order by _id limit ${quant} offset ${i}`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

function getproductscountquery() {
    return new Promise((resolve, reject) => {
        con.query(`select count(*)  as count from product where isaccepted=1`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

function findcartquery(id) {
    return new Promise((resolve, reject) => {
        con.query(`select *from cart where pid=${id};`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function createcartquery(object) {
    return new Promise((resolve, reject) => {
        con.query(`insert into cart
        values(${object._id},'${object.username}',${object.pid},${object.productquant},'${object.sellermail}',false);`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

module.exports = { loadproductsquery, findcartquery, createcartquery ,getproductscountquery}