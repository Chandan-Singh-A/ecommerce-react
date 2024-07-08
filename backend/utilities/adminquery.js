const mysql = require('mysql');

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"e-commerce",
})

function users(){
    return new Promise((resolve,reject)=>{
        con.query(`select * from users`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}