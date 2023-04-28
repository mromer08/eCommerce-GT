const Product = require('../model/Product');

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    if (!products) return res.status(204).json({ 'message': 'No products found' });
    res.json(products);
}

const createNewProduct = async (req, res) => {

}

const updateProduct = async (req, res) => {
    
}

const deleteProduct = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Product ID required.' });

    const product = await Product.findOne({ _id: req.body.id }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No product matches ID ${req.body.id}.` });
    }
    const result = await product.deleteOne();
    res.json(result);
}

const getProduct = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Product ID required' });
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
        return res.status(204).json({ 'message': `Product ID ${req.params.id} not found` });
    }
    res.json(product);
}

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct
}