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
            res.status(200).send(result);
            // res.status(200).json({data:result});
        }).catch((err) => {
            res.status(500).json({ err: err });
        })
}

function removeuser(req, res) {
    const { id, currentForm } = req.body;
    query.removeuser(id, currentForm)
        .then(() => {
            res.status(200).json({ message: `${currentForm} removed successfully` });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
}

module.exports={users,sellers,removeuser}