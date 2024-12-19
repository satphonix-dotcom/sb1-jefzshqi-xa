```typescript
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProducts } from '../../store/slices/productSlice';
import ProductCard from './ProductCard';
import { Product } from '../../types';

interface ProductListProps {
  limit?: number;
  category?: string;
}

const ProductList: React.FC<ProductListProps> = ({ limit, category }) => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ category, limit }));
  }, [dispatch, category, limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-600">No products found</h2>
      </div>
    );
  }

  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayProducts.map((product: Product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
```