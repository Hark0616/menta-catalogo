import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/placeholder-data';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <a 
      href={product.affiliateLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {/* Imagen */}
      <div className="relative aspect-[3/4] overflow-hidden bg-white mb-5">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 
            group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badge marca - con fondo para mejor legibilidad */}
        <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm 
          px-3 py-1.5 text-jungle-muted text-[10px] tracking-[0.15em] uppercase">
          {product.brand}
        </span>
      </div>
      
      {/* Info */}
      <div className="space-y-1">
        <h3 className="font-heading text-lg text-jungle-deep 
          group-hover:text-jungle transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gold text-sm">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </a>
  );
}
