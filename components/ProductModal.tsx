'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/types/database';
import { useCart } from './CartContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { cart, addToCart, setIsCartOpen } = useCart();
  
  const cartItem = cart.find(item => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const imageUrl = product.image_url || 'https://picsum.photos/400/400';
  
  // WhatsApp Link Generation (Colombian code +57 as in the footer)
  const whatsappNumber = '573143811175';
  const whatsappMessage = `¡Hola! Vi el producto *${product.name}* de la marca *${product.brand}* en tu catálogo MENTA y me gustaría recibir asesoría o encargarlo.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAddAndOpenList = () => {
    addToCart(product);
  };

  return (
    <div 
      className="fixed inset-0 bg-jungle-deep/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-mint-soft max-w-2xl md:max-w-3xl w-full h-auto max-h-[90vh] md:h-[500px] overflow-y-auto md:overflow-hidden rounded-sm border border-mint-border/50 shadow-2xl flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white text-jungle-deep p-2 rounded-full border border-mint-border/30 transition-colors duration-200 z-10"
          aria-label="Cerrar modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Imagen del producto */}
        <div className="w-full md:w-[40%] h-48 md:h-full relative bg-white shrink-0">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority
          />
        </div>

        {/* Detalles del producto */}
        <div className="w-full md:w-[60%] p-6 flex flex-col justify-between h-auto md:h-full md:overflow-hidden">
          <div className="flex-1 md:overflow-y-auto pr-1 mb-4">
            {/* Marca */}
            <span className="inline-block bg-mint/80 border border-mint-border/30 px-3 py-1 text-jungle-muted text-[10px] tracking-[0.15em] uppercase mb-3">
              {product.brand}
            </span>

            {/* Nombre */}
            <h2 id="modal-title" className="font-heading text-xl md:text-2xl text-jungle-deep mb-1.5 leading-tight">
              {product.name}
            </h2>

            {/* Precio */}
            <p className="text-lg text-gold font-medium mb-4">
              ${product.price.toFixed(2)}
            </p>

            {/* Descripción */}
            <div className="space-y-2 text-jungle-muted text-xs md:text-sm leading-relaxed">
              {product.description ? (
                <p className="whitespace-pre-line">{product.description}</p>
              ) : (
                <p className="italic text-xs text-jungle-muted/70">Este producto no cuenta con descripción adicional, pero puedes adquirirlo o consultar detalles directamente con tu asesora.</p>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-2.5 pt-4 border-t border-mint-border/30 shrink-0">
            {/* Botón de añadir a la lista */}
            <button
              onClick={handleAddAndOpenList}
              className={`w-full py-3.5 text-center text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 shadow-sm flex items-center justify-center gap-2 ${
                quantityInCart > 0 
                  ? 'bg-gold text-white hover:bg-gold/90' 
                  : 'bg-mint border border-mint-border text-jungle-deep hover:bg-mint/80'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {quantityInCart > 0 
                ? `Añadir otro más (${quantityInCart} en lista)` 
                : 'Añadir a mi lista de pedido'
              }
            </button>

            {/* Botón de compra oficial */}
            <a
              href={product.affiliate_link}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block w-full py-3 bg-jungle-deep hover:bg-jungle text-mint text-center text-xs tracking-[0.15em] uppercase transition-colors duration-300 shadow-sm"
            >
              Comprar en {product.brand}
              <span className="block text-[8px] tracking-[0.1em] text-mint/60 lowercase mt-0.5">
                Redirección segura de afiliado
              </span>
            </a>

            {/* Botón de asesoría de WhatsApp (secundario) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5 text-center text-xs tracking-[0.15em] uppercase transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              Preguntar solo por este producto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
