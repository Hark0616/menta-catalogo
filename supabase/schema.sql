-- =============================================
-- SCHEMA DE BASE DE DATOS MENTA (referencia)
-- =============================================
-- Este archivo describe el esquema completo "desde cero".
-- Si tu proyecto YA tiene tablas creadas, NO ejecutes este archivo entero.
-- Usa las migraciones en /supabase/migrations/ para aplicar cambios
-- (por ejemplo 20260206_add_menu_to_categories.sql para la columna menu).
-- =============================================

-- Tabla de categorías (menu: Natura | NovaVenta para dos menús desplegables)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  menu VARCHAR(20) NOT NULL DEFAULT 'Natura' CHECK (menu IN ('Natura', 'NovaVenta')),
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(menu, slug)
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  affiliate_link TEXT NOT NULL,
  brand VARCHAR(50) NOT NULL CHECK (brand IN ('Natura', 'NovaVenta')),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_menu ON categories(menu);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- DATOS INICIALES
-- =============================================

-- Insertar categorías de ejemplo (menú Natura)
INSERT INTO categories (name, slug, menu, order_index) VALUES
  ('Perfumes', 'perfumes', 'Natura', 1),
  ('Cuidados diarios', 'cuidados-diarios', 'Natura', 2),
  ('Cabello', 'cabello', 'Natura', 3),
  ('Rostro', 'rostro', 'Natura', 4),
  ('Maquillaje', 'maquillaje', 'Natura', 5),
  ('Hogar', 'hogar', 'Natura', 6),
  ('Cocina', 'cocina', 'Natura', 7)
ON CONFLICT (menu, slug) DO NOTHING;

-- Insertar subcategorías de Perfumes (Natura)
INSERT INTO categories (name, slug, menu, parent_id, order_index)
SELECT 'Masculino', 'perfumes-masculino', 'Natura', id, 1 FROM categories WHERE slug = 'perfumes' AND menu = 'Natura'
ON CONFLICT (menu, slug) DO NOTHING;

INSERT INTO categories (name, slug, menu, parent_id, order_index)
SELECT 'Femenino', 'perfumes-femenino', 'Natura', id, 2 FROM categories WHERE slug = 'perfumes' AND menu = 'Natura'
ON CONFLICT (menu, slug) DO NOTHING;

INSERT INTO categories (name, slug, menu, parent_id, order_index)
SELECT 'Niños', 'perfumes-ninos', 'Natura', id, 3 FROM categories WHERE slug = 'perfumes' AND menu = 'Natura'
ON CONFLICT (menu, slug) DO NOTHING;

-- =============================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- =============================================

-- Habilitar RLS en las tablas
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede leer categorías
CREATE POLICY "Categorías públicas para lectura"
  ON categories FOR SELECT
  USING (true);

-- Política: Solo usuarios autenticados pueden modificar categorías
CREATE POLICY "Solo autenticados modifican categorías"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated');

-- Política: Cualquiera puede leer productos activos
CREATE POLICY "Productos activos públicos"
  ON products FOR SELECT
  USING (is_active = true OR auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden modificar productos
CREATE POLICY "Solo autenticados modifican productos"
  ON products FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================
-- STORAGE BUCKET PARA IMÁGENES
-- =============================================
-- Ejecutar en la sección de Storage o con la API:
-- 1. Crear bucket llamado "product-images"
-- 2. Hacer el bucket público para lectura
-- 3. Permitir uploads solo a usuarios autenticados

