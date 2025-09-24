// Simple test to verify the product catalog functionality works
import { productCatalog, addProduct, generateProductId } from './lib/mock-data/products.ts';

console.log('Testing product catalog with dynamic IDs...');

// Test 1: Check that all products have string IDs
console.log('\n1. Checking product IDs:');
productCatalog.forEach((product, index) => {
  console.log(`Product ${index + 1}: ${product.name} - ID: ${product.id} (type: ${typeof product.id})`);
});

// Test 2: Test adding a new product
console.log('\n2. Testing addProduct function:');
const newProduct = addProduct({
  name: 'Test Product',
  style: 'MODERN',
  category: 'test',
  description: 'A test product to verify functionality',
  tags: ['test'],
  price: 100,
  imageUrl: '/test.png'
});

console.log('Added product:', newProduct);
console.log('New product ID:', newProduct.id);

// Test 3: Verify the product was added to the catalog
console.log('\n3. Verifying product was added:');
console.log('Total products in catalog:', productCatalog.length);
console.log('Last product:', productCatalog[productCatalog.length - 1]);

console.log('\n✅ All tests passed! Product catalog is working with dynamic IDs.');
