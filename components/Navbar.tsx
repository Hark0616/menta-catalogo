'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { CategoryWithSubcategories } from '@/lib/data';

interface NavbarProps {
  categories: CategoryWithSubcategories[];
}

export default function Navbar({ categories }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedCategory(null);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled 
          ? 'bg-mint/80 backdrop-blur-md border-b border-mint-border/50' 
          : 'bg-transparent'}`}>
        
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            
            {/* Logo tipográfico - SIN EMOJI */}
            <Link href="/" className="group">
              <span className="font-heading text-xl tracking-[0.12em] text-jungle-deep 
                transition-colors duration-300 group-hover:text-jungle">
                MENTA<span className="text-gold">.</span>
              </span>
            </Link>

            {/* Botón hamburguesa para móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 focus:outline-none"
              aria-label="Abrir menú"
            >
              <div className="w-6 h-4 flex flex-col justify-between">
                <span className={`block h-px w-6 bg-jungle-deep transition-all duration-300 
                  ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-px bg-jungle-deep transition-all duration-300 
                  ${isMobileMenuOpen ? 'opacity-0 w-6' : 'w-4 ml-auto'}`} />
                <span className={`block h-px w-6 bg-jungle-deep transition-all duration-300 
                  ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>

            {/* Menú desktop */}
            <div className="hidden md:block">
              <div className="flex items-center gap-12">
                <div
                  className="relative"
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => {
                    setIsProductsOpen(false);
                    setExpandedCategory(null);
                  }}
                >
                  <button className="text-jungle-muted text-sm tracking-[0.1em] uppercase
                    hover:text-jungle-deep transition-colors duration-300 flex items-center gap-2">
                    Catálogo
                    <svg
                      className={`w-3 h-3 transition-transform duration-300 
                        ${isProductsOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  <div className={`absolute top-full right-0 pt-4 transition-all duration-300
                    ${isProductsOpen 
                      ? 'opacity-100 translate-y-0 pointer-events-auto' 
                      : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                    <div className="bg-white/95 backdrop-blur-md rounded-sm shadow-lg 
                      border border-mint-border/30 w-56 overflow-hidden">
                      <div className="py-3">
                        {categories.map((category, index) => {
                          const isExpanded = expandedCategory === category.id;
                          const hasSubcategories = category.subcategories.length > 0;

                          return (
                            <div key={category.id}>
                              <div className="px-5 py-2.5 hover:bg-mint/30 transition-colors duration-200">
                                {hasSubcategories ? (
                                  <button
                                    onClick={() => toggleCategory(category.id)}
                                    className="w-full text-left text-jungle text-sm flex items-center 
                                      justify-between hover:text-jungle-deep transition-colors"
                                  >
                                    <span>{category.name}</span>
                                    <svg
                                      className={`w-3 h-3 transition-transform duration-300 
                                        ${isExpanded ? 'rotate-180' : ''}`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                ) : (
                                  <a
                                    href={`#productos-${category.slug}`}
                                    className="block text-jungle text-sm hover:text-jungle-deep transition-colors"
                                  >
                                    {category.name}
                                  </a>
                                )}

                                {/* Subcategorías */}
                                <div className={`grid transition-all duration-300 ease-in-out 
                                  ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                                  <div className="overflow-hidden">
                                    <div className="pl-3 space-y-1 border-l border-mint-border/50">
                                      {category.subcategories.map((subcategory) => (
                                        <a
                                          key={subcategory.id}
                                          href={`#productos-${category.slug}-${subcategory.slug}`}
                                          className="block py-1.5 text-jungle-muted text-xs 
                                            hover:text-jungle-deep transition-colors"
                                        >
                                          {subcategory.name}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {index < categories.length - 1 && (
                                <div className="h-px bg-mint-border/30 mx-5" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay para cerrar el menú móvil */}
      <div
        className={`fixed inset-0 bg-jungle-deep/20 backdrop-blur-sm z-40 md:hidden 
          transition-opacity duration-300 
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMobileMenu}
      />

      {/* Menú lateral móvil */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-mint z-50 md:hidden 
          transform transition-transform duration-300 ease-out shadow-2xl 
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header del menú móvil */}
        <div className="flex items-center justify-between p-6 border-b border-mint-border/50">
          <span className="font-heading text-lg tracking-[0.1em] text-jungle-deep">
            MENTA<span className="text-gold">.</span>
          </span>
          <button
            onClick={closeMobileMenu}
            className="p-2 hover:bg-white/30 rounded-sm transition-colors duration-200"
            aria-label="Cerrar menú"
          >
            <svg className="w-5 h-5 text-jungle-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido del menú móvil */}
        <div className="overflow-y-auto h-[calc(100%-80px)] py-6">
          <div className="px-6 mb-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-jungle-muted">
              Catálogo
            </span>
          </div>
          
          {categories.map((category, index) => {
            const isExpanded = expandedCategory === category.id;
            const hasSubcategories = category.subcategories.length > 0;

            return (
              <div key={category.id}>
                <div className="px-6 py-3 hover:bg-white/30 transition-colors duration-200">
                  {hasSubcategories ? (
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full text-left text-jungle text-sm flex items-center 
                        justify-between focus:outline-none"
                    >
                      <span>{category.name}</span>
                      <svg
                        className={`w-4 h-4 text-jungle-muted transition-transform duration-300 
                          ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <a
                      href={`#productos-${category.slug}`}
                      onClick={closeMobileMenu}
                      className="block text-jungle text-sm hover:text-jungle-deep transition-colors"
                    >
                      {category.name}
                    </a>
                  )}

                  {/* Subcategorías expandibles */}
                  <div className={`grid transition-all duration-300 ease-in-out 
                    ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                    <div className="overflow-hidden">
                      <div className="pl-4 space-y-2 border-l border-gold/30">
                        {category.subcategories.map((subcategory) => (
                          <a
                            key={subcategory.id}
                            href={`#productos-${category.slug}-${subcategory.slug}`}
                            onClick={closeMobileMenu}
                            className="block py-1.5 text-jungle-muted text-sm 
                              hover:text-jungle-deep transition-colors"
                          >
                            {subcategory.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {index < categories.length - 1 && (
                  <div className="h-px bg-mint-border/30 mx-6" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
