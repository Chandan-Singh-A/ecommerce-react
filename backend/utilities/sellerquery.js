const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "e-commerce",
});

function addproduct(ob){
    return new Promise((resolve,reject)=>{
        con.query(`insert into product values(
            '${ob.pname}',${ob.price},'${ob.pdesc}','${ob.pimg}',${ob.pquant},${ob.id},${ob.sellermail},1,0
            )`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

module.exports={addproduct}