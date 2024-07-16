const query=require("../utilities/cartquery")

function loadcart(req,res){
    console.log("first",req.session)
    if(!req.session.login){
        res.status(300).send();
    }else{
        query.joinquery(req)
        .then((result) => {
            console.log(2,result)
            res.status(200).send(result);
        }).catch((err) => {
            console.log(err);
        });
    }
}

function updatecart(req,res){
    query.getcartinfo(req.params.id)
    .then((result) => {
        let cquant=result[0].cquant;
        console.log(req.params.id,req.params.op);
        let pquant=result[0].pquant;
        if(req.params.op==='true'){
            cquant=cquant+1;
            if(cquant>pquant){
                res.status(300).send();//limit exceed
            }else{
                query.updatecartquery(req.params.id,cquant)
                .then((result) => {
                    res.status(200).send();//increment by 1
                }).catch((err) => {
                    console.log(err);
                });
            }
        }else{
            cquant=cquant-1;
            if(cquant==0){
                query.deletecart(req.params.id)
                .then((result) => {
                    res.status(350).send();//delete cart
                }).catch((err) => {
                    console.log(err);
                });
            }else{
                query.updatecartquery(req.params.id,cquant)
                .then((result) => {
                    res.status(200).send();
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }).catch((err) => {
        console.log(err);
    });
    
}
module.exports={loadcart,updatecart}