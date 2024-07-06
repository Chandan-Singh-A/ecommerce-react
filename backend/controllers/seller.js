const query = require('../utilities/sellerquery');

function addProduct(req,res){
    console.log(req.files);
    let ob={...req.body,
        pimg:req.file.filename,
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

function sellerproducts(req,res){
    query.sellerproducts(req)
    .then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
    });
}

function deleteproduct(req,res){
    console.log(req.params.id);
    query.deleteproduct(req.params.id)
    .then((result) => {
        res.status(200).json({msg:"Deleted Sucessfully"});
    }).catch((err) => {
        res.status(500).json({err:err});
    });
}

function updateproduct(req,res){
    const ob={
        ...req.body
    }
    console.log(1,ob);
    console.log(ob);
    query.updateproduct(ob)
    .then((result) => {
        res.status(200).json({data:result})
    }).catch((err) => {
        res.status(500).json({err:err});
    });
}

module.exports={addProduct,sellerproducts,deleteproduct,updateproduct}