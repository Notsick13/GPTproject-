const Product = require('../models/product');
const Review = require('../models/review');
const PDFDocument = require('pdfkit');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Error creating product' });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('reviews');
    res.status(200).json(products);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error fetching products', error: error.message });
  }
};

// Get a single product by ID
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error getting product', error: err.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Error updating product' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error deleting product', error: error.message });
  }
};

// Create a review for a product
const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.reviews.push(review._id);
    await product.save();

    res.status(201).json(review);
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error creating review', error: err.message });
  }
};

// Get reviews for a product
const getReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product.reviews);
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error getting reviews', error: err.message });
  }
};

// Generate a PDF report of all products
const generatePdf = async (req, res) => {
  try {
    const products = await Product.find().populate('reviews');
    const pdf = new PDFDocument();

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=product_report.pdf'
    );
    res.setHeader('Content-Type', 'application/pdf');
    pdf.pipe(res);

    pdf
      .fontSize(25)
      .fillColor('red')
      .text('Product Report', { align: 'center' });
    pdf.moveDown(2);

    products.forEach((product, index) => {
      pdf
        .fontSize(18)
        .fillColor('blue')
        .text(`Product Title: ${product.title}`);
      pdf.moveDown();

      if (product.image) {
        try {
          pdf.image(product.image, { fit: [150, 150], align: 'center' });
        } catch (err) {
          console.error(`Error loading image: ${product.image}`);
          pdf.text('Image not available', { align: 'center' });
        }
        pdf.moveDown(7);
      }

      pdf.fillColor('blue').text(`Product Description: ${product.description}`);
      pdf.moveDown();
      pdf.fillColor('green').text(`Product Price: $${product.price}`);
      pdf.moveDown();
      pdf.fillColor('red').text(`Product Quantity: ${product.quantity}`);
      pdf.moveDown();

      if (product.reviews.length > 0) {
        pdf.fillColor('blue').text('Reviews:');
        pdf.moveDown();
        product.reviews.forEach((review) => {
          pdf.fillColor('red').text(`Rating: ${review.rating}`);
          pdf.moveDown();
          pdf.fillColor('green').text(`Comment: ${review.comment}`);
        });
        pdf.moveDown();
      }

      if (index < products.length - 1) {
        pdf
          .moveDown(2)
          .fillColor('gray')
          .text('***********************************************', {
            align: 'center',
          });
        pdf.moveDown(5);
      }
    });

    pdf.end();
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: 'Error generating PDF', error: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  generatePdf,
};
