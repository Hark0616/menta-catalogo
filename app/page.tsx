import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { products } from '@/lib/placeholder-data';

// Dynamic imports para componentes no críticos (mejora First Contentful Paint)
const ProductGrid = dynamic(() => import('@/components/ProductGrid'), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] bg-mint-border/30 mb-5" />
          <div className="h-4 bg-mint-border/30 rounded mb-2" />
          <div className="h-3 bg-mint-border/30 rounded w-1/3" />
        </div>
      ))}
    </div>
  ),
});

const ScrollReveal = dynamic(() => import('@/components/ScrollReveal'));

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
          
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-mint-border/30 mb-5" />
                    <div className="h-4 bg-mint-border/30 rounded mb-2" />
                    <div className="h-3 bg-mint-border/30 rounded w-1/3" />
                  </div>
                ))}
              </div>
            }
          >
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </section>
      
      {/* Footer con información de contacto */}
      <footer className="py-16 px-6 bg-mint border-t border-mint-border/30">
        <ScrollReveal direction="up">
          <div className="max-w-6xl mx-auto text-center">
            <p className="font-heading text-lg tracking-[0.1em] text-jungle-deep mb-4">
              MENTA<span className="text-gold">.</span>
            </p>
            <p className="text-jungle-muted text-xs tracking-wide mb-8">
              Productos naturales de Natura y NovaVenta
            </p>
            
            {/* Enlaces de contacto */}
            <div className="flex items-center justify-center gap-6 mb-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/menta.shop.co"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-jungle-muted hover:text-jungle-deep transition-colors duration-300"
                aria-label="Síguenos en Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs tracking-wide">@menta.shop.co</span>
              </a>

              {/* Separador */}
              <span className="text-mint-border">|</span>

              {/* WhatsApp */}
              <a
                href="https://wa.me/573143811175"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-jungle-muted hover:text-jungle-deep transition-colors duration-300"
                aria-label="Contáctanos por WhatsApp"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="text-xs tracking-wide">WhatsApp</span>
              </a>
            </div>

            <p className="text-jungle-muted text-[10px] tracking-wide">
              © {new Date().getFullYear()} MENTA. Todos los derechos reservados.
            </p>
          </div>
        </ScrollReveal>
      </footer>
    </main>
  );
}
