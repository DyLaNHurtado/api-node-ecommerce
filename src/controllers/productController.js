const Product = require('../models/productModel');
const CustomError = require('../utilities/customError');
const { handleValidationError, handleError } = require('../middlewares/errorHandler');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    handleError(error, res);
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new CustomError(404, 'Producto no encontrado.');
    }

    res.json(product);
  } catch (error) {
    handleError(error, res);
  }
};

const createProduct = async (req, res) => {
  const { name, price, description, size, color } = req.body;

  try {
    const product = new Product({ name, price, description, size, color });
    await product.save();

    res.json({ message: 'Producto creado exitosamente.' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      handleValidationError(error, res);
    } else {
      handleError(error, res);
    }
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const { name, price, description, size, color } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description, size, color },
      { new: true }
    );

    if (!updatedProduct) {
      throw new CustomError(404, 'Producto no encontrado.');
    }

    res.json({ message: 'Producto actualizado exitosamente.', updatedProduct });
  } catch (error) {
    if (error.name === 'ValidationError') {
      handleValidationError(error, res);
    } else {
      handleError(error, res);
    }
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      throw new CustomError(404, 'Producto no encontrado.');
    }

    res.json({ message: 'Producto eliminado exitosamente.', deletedProduct });
  } catch (error) {
    handleError(error, res);
  }
};

const getProductsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    handleError(error, res);
  }
};

const searchProducts = async (req, res) => {
  const searchTerm = req.params.searchTerm;

  try {
    const products = await Product.find({ name: { $regex: searchTerm, $options: 'i' } });
    res.json(products);
  } catch (error) {
    handleError(error, res);
  }
};

// const getProductsOnSale = async (req, res) => {
//   try {
//     const products = await Product.find({ onSale: true });
//     res.json(products);
//   } catch (error) {
//     handleError(error, res);
//   }
// };

// const sortProductsByPrice = async (req, res) => {
//   const sortOrder = req.query.order || 'asc';

//   try {
//     const products = await Product.find().sort({ price: sortOrder });
//     res.json(products);
//   } catch (error) {
//     handleError(error, res);
//   }
// };

// const getFeaturedProducts = async (req, res) => {
//   try {
//     const products = await Product.find({ featured: true });
//     res.json(products);
//   } catch (error) {
//     handleError(error, res);
//   }
// };

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts
};