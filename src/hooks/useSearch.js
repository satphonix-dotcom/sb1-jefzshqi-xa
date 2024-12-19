import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchProducts } from '../store/slices/productSlice';

export const useSearch = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: ''
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q') || '';
    setQuery(q);
    
    if (q) {
      dispatch(searchProducts({ query: q, ...filters }));
    }
  }, [location.search, filters, dispatch]);

  return {
    query,
    filters,
    setFilters
  };
};