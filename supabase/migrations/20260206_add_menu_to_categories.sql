-- Añadir columna menu a categories para soportar dos menús: Natura y NovaVenta
-- Permite el mismo slug en cada menú (ej. Perfumes en Natura y Perfumes en NovaVenta)

-- 1. Añadir columna con valor por defecto
ALTER TABLE categories
  ADD COLUMN IF NOT EXISTS menu VARCHAR(20) NOT NULL DEFAULT 'Natura'
  CHECK (menu IN ('Natura', 'NovaVenta'));

-- 2. Asegurar que todas las filas existentes tengan menu = 'Natura'
UPDATE categories SET menu = 'Natura' WHERE menu IS NULL;

-- 3. Quitar UNIQUE de slug y crear UNIQUE(menu, slug)
ALTER TABLE categories DROP CONSTRAINT IF EXISTS categories_slug_key;
CREATE UNIQUE INDEX IF NOT EXISTS categories_menu_slug_key ON categories (menu, slug);

-- 4. Índice para filtrar por menú
CREATE INDEX IF NOT EXISTS idx_categories_menu ON categories(menu);
