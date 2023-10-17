const Product = require('../models/productModel');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await Product.findByIdAndRemove(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


exports.deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.json({ message: 'All products removed' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


exports.findPublishedProducts = async (req, res) => {
    try {
        const publishedProducts = await Product.find({ published: true });
        res.json(publishedProducts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


exports.findProductsByName = async (req, res) => {
    const { name } = req.query;
    try {
        const products = await Product.find({ name: { $regex: name, $options: 'i' } }); // Case-insensitive search
        res.json(products);
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ error: 'Server error' });
    }
}

