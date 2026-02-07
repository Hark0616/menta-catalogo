# Cómo modificar el proyecto MENTA

Guía rápida de dónde tocar para cambiar textos, estilos, datos y lógica.

---

## Resumen de la estructura

```
menta/
├── app/                    # Páginas (rutas)
│   ├── page.tsx             # Página principal (catálogo)
│   ├── layout.tsx          # Layout global (fuentes, metadata, Analytics)
│   ├── globals.css         # Estilos globales
│   ├── login/              # Inicio de sesión admin
│   └── admin/              # Panel admin (productos, categorías)
├── components/             # Componentes reutilizables
│   ├── Navbar.tsx          # Barra de navegación y menú categorías
│   ├── Hero.tsx            # Banner principal
│   ├── ProductCard.tsx     # Tarjeta de un producto
│   ├── ProductGrid.tsx     # Grid de productos
│   └── admin/              # Formularios y tablas del admin
├── lib/                    # Lógica y datos
│   ├── data.ts             # Lectura de productos y categorías (Supabase + fallback)
│   ├── actions/            # Acciones (auth, productos, categorías)
│   ├── supabase/           # Cliente Supabase (client, server, middleware)
│   └── types/database.ts   # Tipos de tablas (Product, Category)
├── supabase/               # SQL (schema, migraciones)
└── .env.local              # Variables de entorno (no se sube a Git)
```

---

## Qué modificar según lo que quieras cambiar

### Textos y marca (títulos, descripción, redes, nombre)

| Qué cambiar | Archivo |
|-------------|---------|
| Título y descripción del sitio, SEO | [app/layout.tsx](app/layout.tsx) (`metadata`) |
| Texto del banner principal | [components/Hero.tsx](components/Hero.tsx) |
| Nombre "MENTA", enlaces Instagram/WhatsApp, footer | [app/page.tsx](app/page.tsx) (footer y enlaces) |
| Textos del menú / navegación | [components/Navbar.tsx](components/Navbar.tsx) |

### Colores y estilos

| Qué cambiar | Archivo |
|-------------|---------|
| Paleta de colores (mint, jungle, gold, etc.) | [tailwind.config.ts](tailwind.config.ts) |
| Estilos globales, fuentes, base | [app/globals.css](app/globals.css) |
| Apariencia de una tarjeta de producto | [components/ProductCard.tsx](components/ProductCard.tsx) |
| Apariencia del navbar | [components/Navbar.tsx](components/Navbar.tsx) |

### Contenido del catálogo (productos y categorías)

- **Con Supabase:** Los productos y categorías se leen desde la base de datos.  
  - Gestionas todo desde el **admin**: `/admin` → Productos y Categorías.  
  - La lectura está en [lib/data.ts](lib/data.ts) (`getActiveProducts`, `getPublicCategories`).
- **Sin Supabase / fallback:** Si no hay `.env.local` o falla la conexión, se usan datos de ejemplo definidos en [lib/data.ts](lib/data.ts) (`getFallbackProducts`, `getFallbackCategories`). Puedes editar esos arrays para cambiar nombres, precios, enlaces e imágenes de prueba.

### Enlaces de afiliado

- Código de afiliado por defecto: en [lib/data.ts](lib/data.ts) la variable `AFFILIATE_ID` (o `NEXT_PUBLIC_AFFILIATE_ID` en `.env.local`).  
- Cada producto tiene `affiliate_link`; en el admin puedes editarlo por producto.  
- La función `buildAffiliateLink` en [lib/data.ts](lib/data.ts) añade `?ref=...` o `&ref=...` a la URL base.

### Panel de administración

- Login: [app/login/page.tsx](app/login/page.tsx).  
- Páginas del admin: [app/admin/](app/admin/) (listados, formularios de productos y categorías).  
- Formularios y tablas: [components/admin/](components/admin/) (`ProductForm`, `ProductTable`, `CategoryForm`, `ImageUploader`, `Sidebar`).  
- Acciones (crear/editar/borrar): [lib/actions/](lib/actions/) (`products.ts`, `categories.ts`, `auth.ts`).

### Base de datos y variables de entorno

- Conexión a Supabase: [lib/supabase/client.ts](lib/supabase/client.ts) y [lib/supabase/server.ts](lib/supabase/server.ts) usan `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.  
- Crea `.env.local` en la raíz con esas dos variables (y opcionalmente `NEXT_PUBLIC_AFFILIATE_ID`).  
- En Vercel: **Project → Settings → Environment Variables** y añade las mismas variables.

### Schema de la base de datos

- Tipos TypeScript: [lib/types/database.ts](lib/types/database.ts).  
- SQL (tablas, RLS, etc.): [supabase/schema.sql](supabase/schema.sql) y [supabase/migrations/](supabase/migrations/).

---

## Flujo para aplicar cambios y subir a Vercel

1. **Editar** los archivos que correspondan (ver tablas arriba).
2. **Probar en local:**  
   `npm run dev` → abrir [http://localhost:3000](http://localhost:3000) (y `/admin` si tocas algo del admin).
3. **Subir cambios:**  
   ```bash
   git add .
   git commit -m "Descripción del cambio"
   git push origin master
   ```
4. Vercel despliega automáticamente al hacer push al repo conectado.

Si quieres, en el siguiente paso podemos hacer juntos un cambio concreto (por ejemplo, un texto o un color) para que veas el flujo de punta a punta.
