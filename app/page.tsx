import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import ScrollReveal from '@/components/ScrollReveal';
import { products } from '@/lib/placeholder-data';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section id="productos" className="py-28 lg:py-36 px-6 lg:px-8 bg-mint-soft">
        <div className="max-w-6xl mx-auto">
          
          {/* Título con animación al scroll */}
          <ScrollReveal direction="up">
            <h2 className="font-heading text-4xl md:text-5xl text-jungle-deep 
              text-center mb-20">
              Catálogo
            </h2>
          </ScrollReveal>
          
          <ProductGrid products={products} />
        </div>
      </section>
      
      {/* Footer mínimo */}
      <footer className="py-16 px-6 bg-mint border-t border-mint-border/30">
        <ScrollReveal direction="up">
          <div className="max-w-6xl mx-auto text-center">
            <p className="font-heading text-lg tracking-[0.1em] text-jungle-deep mb-4">
              MENTA<span className="text-gold">.</span>
            </p>
            <p className="text-jungle-muted text-xs tracking-wide">
              Productos naturales de Natura y NovaVenta
            </p>
          </div>
        </ScrollReveal>
      </footer>
    </main>
  );
}
