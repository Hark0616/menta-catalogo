# Configuración del Dashboard MENTA

## Paso 1: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta (gratis)
2. Clic en "New Project"
3. Nombre: `menta-catalogo`
4. Contraseña de base de datos: (guárdala en un lugar seguro)
5. Región: Elige la más cercana (ej: South America)
6. Espera ~2 minutos a que se cree

## Paso 2: Crear las Tablas

1. En tu proyecto de Supabase, ve a **SQL Editor** (icono de código en el menú lateral)
2. Copia y pega el contenido de `supabase/schema.sql`
3. Clic en "Run" para ejecutar
4. Deberías ver "Success. No rows returned"

## Paso 3: Configurar Storage para Imágenes

1. Ve a **Storage** en el menú lateral
2. Clic en "New bucket"
3. Nombre: `product-images`
4. Marca la casilla "Public bucket"
5. Clic en "Create bucket"

### Configurar Políticas de Storage:

1. Clic en el bucket `product-images`
2. Ve a la pestaña "Policies"
3. Clic en "New Policy" y selecciona "For full customization"
4. Crea estas políticas:

**Política 1 - Lectura Pública:**
- Policy name: `Public read`
- Allowed operation: SELECT
- Target roles: (deja vacío para todos)
- Policy definition: `true`

**Política 2 - Subida autenticada:**
- Policy name: `Authenticated upload`
- Allowed operation: INSERT
- Target roles: authenticated
- Policy definition: `true`

## Paso 4: Obtener las Credenciales

1. Ve a **Settings** → **API**
2. Copia:
   - **Project URL**: algo como `https://xxxxx.supabase.co`
   - **anon public key**: una cadena larga que empieza con `eyJ...`

## Paso 5: Configurar Variables de Entorno

### En Local:

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
NEXT_PUBLIC_AFFILIATE_ID=AFILIADO123
```

### En Vercel:

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Settings → Environment Variables
3. Agrega las mismas 3 variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_AFFILIATE_ID`

## Paso 6: Crear el Usuario Admin

1. En Supabase, ve a **Authentication** → **Users**
2. Clic en "Add user" → "Create new user"
3. Email: el email de tu novia
4. Password: una contraseña segura
5. Marca "Auto Confirm User"
6. Clic en "Create user"

## Paso 7: Desplegar

```bash
git add .
git commit -m "feat: dashboard de administración completo"
git push
```

Vercel desplegará automáticamente.

## Uso del Dashboard

### Acceder al panel:
1. Ve a `https://tu-sitio.vercel.app/login`
2. Ingresa con el email y contraseña del paso 6
3. Serás redirigido al dashboard

### Agregar un producto:
1. Clic en "Productos" en el menú lateral
2. Clic en "Nuevo Producto"
3. Llena los campos:
   - **Nombre**: Nombre del producto
   - **Descripción**: Descripción opcional
   - **Precio**: Precio en números (ej: 89.90)
   - **Marca**: Selecciona Natura o NovaVenta
   - **Categoría**: Opcional
   - **Enlace de afiliado**: URL completa del producto
   - **Imagen**: Clic para subir o pega una URL
   - **Activo**: Marca si quieres que aparezca en la tienda
4. Clic en "Crear Producto"

### Gestionar categorías:
1. Clic en "Categorías" en el menú lateral
2. Para crear: llena el formulario arriba y clic en "Guardar"
3. Para editar: clic en el ícono de lápiz
4. Para eliminar: clic en el ícono de basura

## Solución de Problemas

### "Error al cargar productos"
- Verifica que las variables de entorno estén configuradas
- Verifica que las tablas existan en Supabase

### "No puedo subir imágenes"
- Verifica que el bucket `product-images` exista y sea público
- Verifica las políticas de storage

### "No puedo iniciar sesión"
- Verifica que el usuario esté creado en Supabase
- Verifica que "Auto Confirm" esté marcado

## Arquitectura

```
Página Pública (/)
    ↓
Lee productos de Supabase
    ↓
Muestra catálogo

Panel Admin (/admin)
    ↓
Requiere login
    ↓
CRUD de productos y categorías
    ↓
Guarda en Supabase
    ↓
Se refleja en la página pública
```

## Costos

Todo es **GRATIS** dentro de los límites:

| Servicio | Límite Gratis |
|----------|---------------|
| Supabase DB | 500 MB |
| Supabase Storage | 1 GB |
| Supabase Auth | Ilimitado |
| Vercel Hosting | 100 GB bandwidth |

Para un catálogo pequeño/mediano, estos límites son más que suficientes.

