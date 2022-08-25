
import Product from '../model/product.js';

export const getProducts = (req,res) => {
    Product.find().then((result) => {
        res.send(result)
    }).catch((err) => console.log(err));
    // res.send(users);
}
export const getProduct = (req,res) => {
    const {id}=req.params;
    // const founduser=Product.find((product) => product.id == id);
    // res.send(founduser);
    Product.findById(id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

export const createProduct = (req,res) => {
    console.log('post function');
    const prod=new Product({
        name:req.body.name,
        price:req.body.price,
        qty:req.body.qty
    })
    prod.save().then((result) => res.send(result)).catch((err) => console.log(err))
    
    res.send(`new value enter ${prod.name}`);
}
export const deleteProduct = (req,res) => {
    Product.findByIdAndDelete(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
}
export const updateProduct = async (req,res) => {
    const product= await Product.findById(req.params.id)
    const updatedValue=req.body;
    let productUpdate=product;
    if (updatedValue.name)
    productUpdate.name=updatedValue.name;
    if (updatedValue.price)
    productUpdate.price=updatedValue.price;
    if (updatedValue.qty)
    productUpdate.qty=updatedValue.qty;
    try{

        const savedProduct= await productUpdate.save()
        console.log(`name= ${productUpdate.name}`);

        res.status(201).json({
            message:"Values Updated",
            savedUser
        });
    }
    catch{
        console.log("Not Updated");
    }
    

}