const query = require('../utilities/homequery');

function loadproducts(req, res) {
    query.loadproductsquery(req.params.first,req.params.second)
        .then((result) => {
            console.log("res=",result);
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err);
        });
}

function getproductscount(req,res){
    query.getproductscountquery()
    .then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        console.log(err);
    });
}

function addtocart(req,res){
    if (req.session.login) {
        var cartob = req.body;
        let random = Math.random();
        cartob.username = req.session.username;
        cartob.productquant = 1;
        cartob._id = random;
        query.findcartquery(cartob.userid)
            .then((result) => {
                if (result.length == 0) {
                    query.createcartquery(cartob)
                        .then((result) => {
                            res.status(200).send();
                        }).catch((err) => {
                            console.log(err);
                        });
                } else {
                    res.status(300).send();
                }
            }).catch((err) => {
                console.log(err);
            });
    } else {
        res.status(250).send();
    }
}

module.exports={loadproducts,addtocart,getproductscount}