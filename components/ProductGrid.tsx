'use client';

import React, { useState } from 'react';
import type { Product } from '@/lib/types/database';
import ProductCard from './ProductCard';
import ScrollReveal from './ScrollReveal';
import ProductModal from './ProductModal';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
        {products.map((product, index) => (
          <ScrollReveal 
            key={product.id} 
            delay={0.1 * (index % 3)}
            direction="up"
          >
            <ProductCard 
              product={product} 
              onClick={() => setSelectedProduct(product)} 
            />
          </ScrollReveal>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  );
}
