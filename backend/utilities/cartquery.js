const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "e-commerce",
});

function joinquery(req){
    return new Promise((resolve,reject)=>{
        con.query(`SELECT p.productname, p.productprice, p.productimg,p.productquant AS product_productquant, c.productquant AS cart_productquant, c.userid, c._id 
            FROM product p JOIN cart c ON p._id = c.userid
            WHERE c.username ='${req.session.username}'`,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    console.log(11,data);
                    resolve(data);
                }
             })
    })
}
// select p.productname, p.productprice, p.productquant, c.productquant, c.userid, c._id from product p, cart c
            //  where c.username = '${req.session.username}' 

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

function getprouctinfo(id){
    return new Promise((resolve,reject)=>{
        con.query(`select * from product where _id=${id}`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

module.exports={loadcartquery,getprouctinfo,joinquery}