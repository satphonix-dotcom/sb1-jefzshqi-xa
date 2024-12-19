```typescript
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { addItem } from '../../store/slices/cartSlice';
import { formatPrice } from '../../utils/formatters';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <Link to={`/products/${product._id}`} className="block relative">
        <img
          src={primaryImage.url}
          alt={primaryImage.caption || product.name}
          className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        {product.prime && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
            Prime
          </span>
        )}
      </Link>

      <div className="p-4">
        <Link 
          to={`/products/${product._id}`}
          className="block text-lg font-semibold text-gray-900 hover:text-yellow-600 truncate"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`h-4 w-4 ${
                  index < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)} USDC
          </span>
          {product.stock < 10 && product.stock > 0 && (
            <span className="text-sm text-red-600">
              Only {product.stock} left
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
```