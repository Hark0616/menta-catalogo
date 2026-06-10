'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/types/database';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
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

  return (
    <div 
      className="fixed inset-0 bg-jungle-deep/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-mint-soft max-w-3xl w-full max-h-[90vh] md:max-h-[85vh] overflow-y-auto md:overflow-hidden rounded-sm border border-mint-border/50 shadow-2xl flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200"
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
        <div className="w-full md:w-1/2 relative aspect-[3/4] bg-white md:max-h-full">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Detalles del producto */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Marca */}
            <span className="inline-block bg-mint/80 border border-mint-border/30 px-3 py-1 text-jungle-muted text-[10px] tracking-[0.15em] uppercase mb-4">
              {product.brand}
            </span>

            {/* Nombre */}
            <h2 id="modal-title" className="font-heading text-2xl md:text-3xl text-jungle-deep mb-2">
              {product.name}
            </h2>

            {/* Precio */}
            <p className="text-xl text-gold font-medium mb-6">
              ${product.price.toFixed(2)}
            </p>

            {/* Descripción */}
            <div className="space-y-2 mb-8 text-jungle-muted text-sm leading-relaxed max-h-[200px] overflow-y-auto pr-2">
              {product.description ? (
                <p className="whitespace-pre-line">{product.description}</p>
              ) : (
                <p className="italic">Este producto no cuenta con descripción adicional, pero puedes adquirirlo o consultar detalles directamente con tu asesora.</p>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3 pt-4 border-t border-mint-border/30">
            {/* Botón de compra oficial */}
            <a
              href={product.affiliate_link}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block w-full py-3.5 bg-jungle-deep hover:bg-jungle text-mint text-center text-xs tracking-[0.15em] uppercase transition-colors duration-300 shadow-sm"
            >
              Comprar en {product.brand}
              <span className="block text-[8px] tracking-[0.1em] text-mint/60 lowercase mt-0.5">
                Redirección segura de afiliado
              </span>
            </a>

            {/* Botón de asesoría de WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-center text-xs tracking-[0.15em] uppercase transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202 0 6.213 1.248 8.477 3.518 2.263 2.27 3.507 5.289 3.505 8.495-.005 6.657-5.34 11.997-11.953 11.997-2.005 0-3.973-.5-5.729-1.455L0 24zm6.305-1.654c1.52.902 3.16 1.378 4.846 1.379h.005c5.91 0 10.718-4.806 10.722-10.718a10.655 10.655 0 00-3.15-7.66 10.655 10.655 0 00-7.662-3.147C5.176.21 .372 5.016.368 10.927c0 1.795.467 3.548 1.353 5.068l-.996 3.633 3.72-.975zm11.11-7.303c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
              Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
