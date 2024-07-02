const query = require('../utilities/sellerquery');

function addProduct(req,res){
    console.log(req.files);
    let ob={...req.body,
        pimg:req.file.path,
        id:Math.random(),
        sellermail:req.session.username
    }
    console.log(ob);
    query.addproduct(ob)
    .then((result) => {
        res.status(200).send();
    }).catch((err) => {
       console.log(err);
       res.status(300).send(); 
    });
}

module.exports={addProduct};