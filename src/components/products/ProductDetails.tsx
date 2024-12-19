```typescript
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductDetails } from '../../store/slices/productSlice';
import { addItem } from '../../store/slices/cartSlice';
import { formatPrice } from '../../utils/formatters';
import { Product } from '../../types';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedProduct, loading, error } = useAppSelector(state => state.products);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setSelectedImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addItem(selectedProduct));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Product not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt={selectedProduct.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {selectedProduct.images.map((image) => (
              <button
                key={image.url}
                onClick={() => setSelectedImage(image.url)}
                className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                  selectedImage === image.url ? 'ring-2 ring-yellow-400' : ''
                }`}
              >
                <img
                  src={image.url}
                  alt={image.caption || selectedProduct.name}
                  className="w-full h-full object-center object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h1>
          <p className="text-3xl text-gray-900">{formatPrice(selectedProduct.price)} USDC</p>
          
          <div className="prose max-w-none">
            <p>{selectedProduct.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              {selectedProduct.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-yellow-400 text-gray-900 py-3 px-8 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
```