const Product = require('../models/Product');

const searchProducts = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, sortBy } = req.query;

    let searchQuery = {};

    // Text search
    if (query) {
      searchQuery.$text = { $search: query };
    }

    // Category filter
    if (category) {
      searchQuery.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = Number(minPrice);
      if (maxPrice) searchQuery.price.$lte = Number(maxPrice);
    }

    // Build sort options
    let sortOptions = {};
    switch (sortBy) {
      case 'price_asc':
        sortOptions.price = 1;
        break;
      case 'price_desc':
        sortOptions.price = -1;
        break;
      case 'rating':
        sortOptions.rating = -1;
        break;
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      default:
        if (query) {
          sortOptions.score = { $meta: 'textScore' };
        } else {
          sortOptions.createdAt = -1;
        }
    }

    const products = await Product.find(searchQuery)
      .sort(sortOptions)
      .limit(24);

    res.json(products);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Search failed' });
  }
};

module.exports = { searchProducts };