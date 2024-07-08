const query=require("../utilities/adminquery")

function users(req,res){
    query.users()
    .then((result) => {
        res.status(200).send(result);
        // res.status(200).json({data:result});
    }).catch((err) => {
        res.status(500).json({err:err});
    });
}

function sellers(req,res){
    query.sellers()
        .then((result) => {
            console.log("res",result);
            res.status(200).send(result);
            // res.status(200).json({data:result});
        }).catch((err) => {
            res.status(500).json({ err: err });
        })
}

module.exports={users,sellers}