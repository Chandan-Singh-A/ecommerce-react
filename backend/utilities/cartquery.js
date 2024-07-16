const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "e-commerce",
});

function joinquery(req){
    return new Promise((resolve,reject)=>{
        con.query(`SELECT p.pname, p.pprice, p.pimg,p.pquant AS product_productquant, c.productquant AS pquant, c.pid, c._id 
            FROM product p JOIN cart c ON p._id = c.pid
            WHERE c.username ='${req.session.username}'`,(err,data)=>{
                console.log(1,data);
                if(err){
                    reject(err);
                }else{
                    console.log(11,data);
                    resolve(data);
                }
             })
    })
}

function loadcartquery(req){
    return new Promise((resolve,reject)=>{
        con.query(`select * from cart where username='${req.session.username}'`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

function getcartinfo(id){
    return new Promise((resolve,reject)=>{
        con.query(`select p.pquant as pquant,c.productquant as cquant from cart c
                    INNER JOIN product p
                    ON p._id=c.pid
                    WHERE c._id=${id}`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    })
}

function updatecartquery(id,quant){
    return new Promise((resolve,reject)=>{
        con.query(`update cart set productquant=${quant} where _id=${id}`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

function deletecart(id){
    return new Promise((resolve,reject)=>{
        con.query(`delete from cart where _id=${id}`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

module.exports={loadcartquery,joinquery,getcartinfo,updatecartquery,deletecart}