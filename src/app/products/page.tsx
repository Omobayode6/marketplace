'use client'
import React, { useState, useMemo } from 'react';
import ItemCard from "@/components/reusable/ItemCard";
import useStore from "@/store";
import { useRouter } from "next/navigation";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  qty: number;
  seller: string;
  category: string;
  img: string;
  oldPrice: number;
  totalPrice: number;
}

// Array of sellers
const sellers = [
  'Affordable Storez', 
  'Tech Emporium', 
  'Fashion Palace', 
  'Home Essentials', 
  'Book World'
];

// Function to generate more realistic and varied pricing
const generatePricing = (category: string) => {
  // Define price ranges for different categories
  const categoryPriceRanges = {
    'Electronics': { min: 5000, max: 50000, discountFactor: 1.2 },
    'Clothing': { min: 500, max: 10000, discountFactor: 1.3 },
    'Home': { min: 1000, max: 25000, discountFactor: 1.25 },
    'Accessories': { min: 500, max: 5000, discountFactor: 1.4 },
    'Books': { min: 500, max: 2000, discountFactor: 1.5 }
  };

  // Get the price range for the specific category
  const priceRange = categoryPriceRanges[category as keyof typeof categoryPriceRanges] || 
                     { min: 500, max: 50000, discountFactor: 1.2 };

  // Generate base price within the category range
  const basePrice = parseFloat(
    (Math.random() * (priceRange.max - priceRange.min) + priceRange.min).toFixed(2)
  );

  // Generate old price by multiplying with discount factor
  const oldPrice = parseFloat(
    (basePrice * priceRange.discountFactor).toFixed(2)
  );

  return { price: basePrice, oldPrice };
};

// Updated products array with varied and realistic pricing
export const products: ProductProps[] = Array.from({ length: 24 }, (_, index) => {
  const name = `Product ${index + 1}`;
  const categories = ['Electronics', 'Clothing', 'Home', 'Accessories', 'Books'];
  const category = categories[index % categories.length];
  
  // Generate pricing based on category
  const { price, oldPrice } = generatePricing(category);

  return {
    id: `PRO-${index + 1}`,
    name,
    img: `/${name.replace(/\s+/g, '-').toLowerCase()}.jpg`,
    price,
    oldPrice,
    qty: 0,
    totalPrice: price,
    seller: sellers[index % sellers.length],
    category
  };
});

const ProductPage = () => {
  const router = useRouter();
  
  // State for sorting, filters, and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSeller, setSelectedSeller] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const productsPerPage = 12;

  // Extract unique categories and sellers
  const categories = Array.from(new Set(products.map(product => product.category)));
  const availableSellers = Array.from(new Set(products.map(product => product.seller)));

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    // First, filter the products
    let filtered = products.filter(product => 
      (selectedCategory === '' || product.category === selectedCategory) &&
      (selectedSeller === '' || product.seller === selectedSeller) &&
      product.price >= priceRange.min &&
      product.price <= priceRange.max
    );

    // Then, sort the filtered products
    if (sortBy) {
      filtered.sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          case 'oldPrice':
            comparison = a.oldPrice - b.oldPrice;
            break;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [selectedCategory, selectedSeller, priceRange, sortBy, sortOrder]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Pagination handlers
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Sort handler
  const handleSort = (criteria: string) => {
    // If clicking the same sort criteria, toggle between asc and desc
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If changing sort criteria, default to ascending
      setSortBy(criteria);
      setSortOrder('asc');
    }
    // Reset to first page when sorting
    setCurrentPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedSeller('');
    setPriceRange({ min: 0, max: 50000 });
    setSortBy('');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 sr-only">Official Store</h1>
      
      {/* Filters and Sorting */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        {/* Category Filter */}
        <div>
          <label htmlFor="category-select" className="mr-2">Category:</label>
          <select 
            id="category-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-[8px] outline-none appearance-none p-2"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Seller Filter */}
        <div>
          <label htmlFor="seller-select" className="mr-2">Seller:</label>
          <select 
            id="seller-select"
            value={selectedSeller}
            onChange={(e) => {
              setSelectedSeller(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-[8px] outline-none appearance-none p-2"
          >
            <option value="">All Sellers</option>
            {availableSellers.map(seller => (
              <option key={seller} value={seller}>{seller}</option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className='flex items-center gap-2'>
            <label htmlFor="min-price">Min Price:</label>
            <input 
              type="number" 
              id="min-price"
              value={priceRange.min}
              onChange={(e) => {
                setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }));
                setCurrentPage(1);
              }}
              className="border rounded-[8px] outline-none appearance-none p-2 w-24"
              min="0"
              max="50000"
            />
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor="max-price">Max Price:</label>
            <input 
              type="number" 
              id="max-price"
              value={priceRange.max}
              onChange={(e) => {
                setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }));
                setCurrentPage(1);
              }}
              className="border rounded-[8px] outline-none appearance-none p-2 w-24"
              min="0"
              max="50000"
            />
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div>
          <label htmlFor="sort-select" className="mr-2">Sort By:</label>
          <select 
            id="sort-select"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="border rounded-[8px] outline-none appearance-none p-2"
          >
            <option value="">Select</option>
            <option value="price">Price</option>
            <option value="oldPrice">Original Price</option>
            <option value="name">Name</option>
          </select>
          {sortBy && (
            <button 
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="ml-2 text-sm"
              aria-label={`Toggle ${sortOrder} order`}
            >
              {sortOrder === 'asc' ? '▲' : '▼'}
            </button>
          )}
        </div>

        {/* Reset Filters Button */}
        <button 
          onClick={resetFilters}
          className="bg-secondary-normal hover:bg-secondary-light text-white px-4 py-2 rounded"
        >
          Reset Filters
        </button>
      </div>

      {/* Products Grid */}
      <section 
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6" 
        aria-label="Products Grid"
      >
        {currentProducts.map((product) => (
          <div 
            key={product.id}
            onClick={() => {
              router.push(`/products/${product.id}`);
            }}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${product.name}`}
            onKeyPress={(e) => e.key === 'Enter' && router.push(`/products/${product.id}`)}
          >
            <ItemCard
              img={product.img}
              name={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              category={product.category}
              seller={product.seller}
            />
          </div>
        ))}
      </section>

      {/* Pagination Controls */}
      <div 
        className="flex justify-center items-center space-x-2" 
        aria-label="Pagination Navigation"
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            aria-current={currentPage === pageNumber ? 'page' : undefined}
            className={`px-4 py-2 border rounded ${
              currentPage === pageNumber 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-blue-500'
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {/* No Products Found Message */}
      {currentProducts.length === 0 && (
        <p 
          className="text-center text-gray-500 mt-10"
          role="alert"
        >
          No products found matching your filters.
        </p>
      )}

      {/* Filter and Sort Summary */}
      {(selectedCategory || selectedSeller || priceRange.min > 0 || priceRange.max < 50000 || sortBy) && (
        <div className="mt-4 text-center text-gray-600">
          Showing {filteredProducts.length} products
          {selectedCategory && ` in ${selectedCategory} category`}
          {selectedSeller && ` from ${selectedSeller}`}
          {(priceRange.min > 0 || priceRange.max < 50000) && 
            ` priced between ₦${priceRange.min} and ₦${priceRange.max}`}
          {sortBy && ` sorted by ${sortBy} in ${sortOrder === 'asc' ? 'ascending' : 'descending'} order`}
        </div>
      )}
    </main>
  );
}

export default ProductPage;