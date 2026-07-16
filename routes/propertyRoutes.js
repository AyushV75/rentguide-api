const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');

const propertyValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('bedrooms').isInt({ min: 0 }).withMessage('Bedrooms must be a non-negative integer'),
  body('bathrooms').isInt({ min: 0 }).withMessage('Bathrooms must be a non-negative integer'),
];

router.post('/', protect, propertyValidation, validate, createProperty);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.put('/:id', protect, propertyValidation, validate, updateProperty);
router.delete('/:id', protect, propertyValidation, validate, deleteProperty);

module.exports = router;