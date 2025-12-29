// ID de afiliado - puede configurarse desde variables de entorno
const AFFILIATE_ID = process.env.NEXT_PUBLIC_AFFILIATE_ID || 'AFILIADO123';

// Helper para construir enlaces de afiliado
const buildAffiliateLink = (baseUrl: string): string => {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}ref=${AFFILIATE_ID}`;
};

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  affiliateLink: string;
  brand: 'Natura' | 'NovaVenta';
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Chronos Desodorante Colonia',
    price: 89.90,
    imageUrl: 'https://picsum.photos/400/400?random=1',
    affiliateLink: buildAffiliateLink('https://natura.com.br/produto/chronos'),
    brand: 'Natura',
  },
  {
    id: '2',
    name: 'Ekos Castanha Hidratante Corporal',
    price: 45.90,
    imageUrl: 'https://picsum.photos/400/400?random=2',
    affiliateLink: buildAffiliateLink('https://natura.com.br/produto/ekos-castanha'),
    brand: 'Natura',
  },
  {
    id: '3',
    name: 'Luna Perfume Feminino',
    price: 129.90,
    imageUrl: 'https://picsum.photos/400/400?random=3',
    affiliateLink: buildAffiliateLink('https://natura.com.br/produto/luna'),
    brand: 'Natura',
  },
  {
    id: '4',
    name: 'Kit Cuidado Facial Tododia',
    price: 99.90,
    imageUrl: 'https://picsum.photos/400/400?random=4',
    affiliateLink: buildAffiliateLink('https://natura.com.br/produto/tododia'),
    brand: 'Natura',
  },
  {
    id: '5',
    name: 'Perfume Masculino Essencial',
    price: 79.90,
    imageUrl: 'https://picsum.photos/400/400?random=5',
    affiliateLink: buildAffiliateLink('https://novaventa.com/producto/perfume-essencial'),
    brand: 'NovaVenta',
  },
  {
    id: '6',
    name: 'Crema Hidratante Natural',
    price: 55.90,
    imageUrl: 'https://picsum.photos/400/400?random=6',
    affiliateLink: buildAffiliateLink('https://novaventa.com/producto/crema-hidratante'),
    brand: 'NovaVenta',
  },
];

