const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:productId', getProductById);
router.post('/', createProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);
router.get('/category/:category', getProductsByCategory);
router.get('/search/:searchTerm', searchProducts);

module.exports = router;
