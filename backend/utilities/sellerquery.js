const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "e-commerce",
});

function addproduct(ob){
    return new Promise((resolve,reject)=>{
        con.query(`insert into product values(
            '${ob.pname}',${ob.pprice},'${ob.pdesc}','${ob.pimg}',${ob.pquant},${ob.id},'${ob.sellermail}',1,0
            )`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

function sellerproducts(req){
    return new Promise((resolve,reject)=>{
        con.query(`select * from product where sellermail='${req.session.username}' and isaccepted=1`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

function deleteproduct(id){
    return new Promise((resolve,reject)=>{
        con.query(`delete from product where _id=${id}`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

function updateproduct(ob){
    return new Promise((resolve,reject)=>{
        con.query(`update product set 
            productname='${ob.productname}',productprice=${ob.productprice},productdesc='${ob.productdesc}',productquant=${ob.productquant}
            where _id=${ob._id}`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

module.exports={addproduct,sellerproducts,deleteproduct,updateproduct}