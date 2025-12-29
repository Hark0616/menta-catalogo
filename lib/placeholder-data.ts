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
    affiliateLink: 'https://natura.com.br/produto/chronos?ref=AFILIADO123',
    brand: 'Natura',
  },
  {
    id: '2',
    name: 'Ekos Castanha Hidratante Corporal',
    price: 45.90,
    imageUrl: 'https://picsum.photos/400/400?random=2',
    affiliateLink: 'https://natura.com.br/produto/ekos-castanha?ref=AFILIADO123',
    brand: 'Natura',
  },
  {
    id: '3',
    name: 'Luna Perfume Feminino',
    price: 129.90,
    imageUrl: 'https://picsum.photos/400/400?random=3',
    affiliateLink: 'https://natura.com.br/produto/luna?ref=AFILIADO123',
    brand: 'Natura',
  },
  {
    id: '4',
    name: 'Kit Cuidado Facial Tododia',
    price: 99.90,
    imageUrl: 'https://picsum.photos/400/400?random=4',
    affiliateLink: 'https://natura.com.br/produto/tododia?ref=AFILIADO123',
    brand: 'Natura',
  },
  {
    id: '5',
    name: 'Perfume Masculino Essencial',
    price: 79.90,
    imageUrl: 'https://picsum.photos/400/400?random=5',
    affiliateLink: 'https://novaventa.com/producto/perfume-essencial?ref=AFILIADO123',
    brand: 'NovaVenta',
  },
  {
    id: '6',
    name: 'Crema Hidratante Natural',
    price: 55.90,
    imageUrl: 'https://picsum.photos/400/400?random=6',
    affiliateLink: 'https://novaventa.com/producto/crema-hidratante?ref=AFILIADO123',
    brand: 'NovaVenta',
  },
];

