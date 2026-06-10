'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useCart } from './CartContext';

export default function CartDrawer() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    isCartOpen, 
    setIsCartOpen, 
    totalItems, 
    totalPrice 
  } = useCart();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  // Escape key to close cart
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCartOpen]);

  if (totalItems === 0 && !isCartOpen) return null;

  const handleSendWhatsApp = () => {
    const whatsappNumber = '573143811175';
    
    // Construct text message
    let message = `¡Hola! Quiero hacer un pedido de tu catálogo *MENTA* 🌿. Mi lista de productos es:\n\n`;
    
    cart.forEach(item => {
      message += `• *${item.quantity}x* ${item.product.name} (_${item.product.brand}_) — $${(item.product.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n*Total estimado:* $${totalPrice.toFixed(2)}\n\n¿Están disponibles estos productos para entrega?`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Botón flotante del carrito */}
      {!isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-jungle-deep hover:bg-jungle text-mint p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-12 duration-500"
          aria-label="Abrir mi lista de pedidos"
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-3.5 -right-3.5 bg-gold text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-jungle-deep">
              {totalItems}
            </span>
          </div>
        </button>
      )}

      {/* Overlay del carrito */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-jungle-deep/50 backdrop-blur-sm z-50 flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          {/* Panel deslizante (Drawer) */}
          <div 
            className="w-full max-w-md bg-mint-soft h-full border-l border-mint-border/30 shadow-2xl flex flex-col justify-between relative animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mi lista de pedidos"
          >
            {/* Cabecera */}
            <div className="p-6 border-b border-mint-border/30 flex items-center justify-between">
              <div>
                <h2 className="font-heading text-xl text-jungle-deep">Mi Lista de Pedidos</h2>
                <p className="text-jungle-muted text-[10px] tracking-wider uppercase mt-0.5">
                  {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en total
                </p>
              </div>
              <div className="flex items-center gap-3">
                {cart.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="text-jungle-muted hover:text-red-600 text-xs tracking-wide transition-colors duration-200"
                  >
                    Vaciar
                  </button>
                )}
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-white hover:bg-mint/30 text-jungle-deep p-1.5 rounded-full border border-mint-border/30 transition-colors"
                  aria-label="Cerrar carrito"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Cuerpo (Listado de productos) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <svg className="w-12 h-12 text-mint-border" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <div>
                    <p className="text-jungle-deep font-heading text-lg">Tu lista está vacía</p>
                    <p className="text-jungle-muted text-xs mt-1">Navega por el catálogo y agrega productos para enviarlos a tu consultora.</p>
                  </div>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 items-center bg-white/50 p-3 rounded-sm border border-mint-border/20">
                    {/* Imagen */}
                    <div className="relative w-16 h-20 overflow-hidden bg-white shrink-0 border border-mint-border/30">
                      <Image
                        src={item.product.image_url || 'https://picsum.photos/100/100'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] tracking-wider uppercase text-jungle-muted bg-mint px-1.5 py-0.5 rounded-sm">
                        {item.product.brand}
                      </span>
                      <h3 className="font-heading text-sm text-jungle-deep truncate mt-1.5">
                        {item.product.name}
                      </h3>
                      <p className="text-gold text-xs mt-0.5">
                        ${item.product.price.toFixed(2)}
                      </p>

                      {/* Controles de Cantidad */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center border border-mint-border rounded-sm bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-jungle-muted hover:bg-mint-soft hover:text-jungle-deep transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            -
                          </button>
                          <span className="px-3 py-0.5 text-xs text-jungle-deep font-medium bg-mint-soft/20">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-jungle-muted hover:bg-mint-soft hover:text-jungle-deep transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>

                        {/* Botón de borrar */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 text-xs transition-colors"
                          aria-label="Eliminar del carrito"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pie de página (Resumen y Botón de envío) */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-mint-border/30 bg-mint/20 space-y-4">
                <div className="flex justify-between items-center text-jungle-deep">
                  <span className="text-xs uppercase tracking-wider">Subtotal estimado</span>
                  <span className="font-heading text-lg font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-center text-xs tracking-[0.15em] uppercase font-bold transition-colors duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202 0 6.213 1.248 8.477 3.518 2.263 2.27 3.507 5.289 3.505 8.495-.005 6.657-5.34 11.997-11.953 11.997-2.005 0-3.973-.5-5.729-1.455L0 24zm6.305-1.654c1.52.902 3.16 1.378 4.846 1.379h.005c5.91 0 10.718-4.806 10.722-10.718a10.655 10.655 0 00-3.15-7.66 10.655 10.655 0 00-7.662-3.147C5.176.21 .372 5.016.368 10.927c0 1.795.467 3.548 1.353 5.068l-.996 3.633 3.72-.975zm11.11-7.303c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                  </svg>
                  Enviar pedido por WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
