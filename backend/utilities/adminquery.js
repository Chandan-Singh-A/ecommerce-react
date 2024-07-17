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

function sellers() {
    return new Promise((resolve, reject) => {
        con.query(`select * from seller where isverified=1 and isverifiedbyadmin=1`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function removeuser(id, table) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${table} WHERE _id = ${id}`;
        con.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function productreq(){
    return new Promise((resolve,reject)=>{
        con.query(`select * from product where isaccepted=0 and isrejected=0`,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

function productrequpdation(id, value) {
    console.log(id,value)
    console.log(typeof(id),typeof(value))
    return new Promise((resolve, reject) => {
        const isAccepted = value;
        const isRejected = value === 1 ? 0 : 1;
        con.query(
            `UPDATE product SET isaccepted = ?, isrejected = ? WHERE _id = ?`,
            [isAccepted, isRejected, id],
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            }
        );
    });
}

function getsellers(){
    return new Promise((resolve,reject)=>{
        con.query(`select * from seller where isverified=1 and isverifiedbyadmin=0`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function updatesellerreq(id,value){
    return new Promise((resolve,reject)=>{
        if(value){
            con.query(`update seller set isverifiedbyadmin=1 where _id=${id}`,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        }else{
            con.query(`delete from seller where _id=${id}`,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        }
    })

}

module.exports={users,sellers,removeuser,productreq,productrequpdation,getsellers,updatesellerreq};