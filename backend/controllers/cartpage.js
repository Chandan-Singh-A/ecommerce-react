const query=require("../utilities/cartquery")

function loadcart(req,res){
    query.joinquery(req)
    .then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
    });
}

// function loadcart(req,res){
//     let data=[];
//     query.loadcartquery(req,res)
//     .then((cartresult) => {
//         result.forEach(element => {
//             query.getprouctinfo(element._id)
//             .then((proresult) => {
//                 data.push(proresult)
//                 data.productquant=cartresult.productquant;
//             }).catch((err) => {
//                 console.log(err);
//             });
//         });
//         res.status(200).send(data);
//     }).catch((err) => {
//         console.log(err);
//     });
// }
module.exports={loadcart}