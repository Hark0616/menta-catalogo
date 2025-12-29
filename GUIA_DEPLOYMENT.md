# Guía de Deployment y Dominio - Opciones Económicas

## 🎯 Resumen Ejecutivo

Para tu proyecto Next.js, aquí están las mejores opciones **económicas y fáciles de mantener**:

### Opción Recomendada #1: Vercel (GRATIS) + Dominio Barato
- **Hosting**: Vercel (GRATIS para proyectos personales)
- **Dominio**: Cloudflare Registrar (~$8-10/año) o Namecheap (~$10-12/año)
- **Costo Total**: ~$8-12 USD/año (solo el dominio)
- **Dificultad**: ⭐ Muy Fácil

### Opción Recomendada #2: Cloudflare Pages (GRATIS) + Dominio Cloudflare
- **Hosting**: Cloudflare Pages (GRATIS)
- **Dominio**: Cloudflare Registrar (~$8-10/año)
- **Costo Total**: ~$8-10 USD/año (solo el dominio)
- **Dificultad**: ⭐⭐ Fácil

---

## ✅ ¿Puedo Seguir Desarrollando Localmente?

**¡SÍ! Absolutamente.** De hecho, esa es la forma recomendada de trabajar. Aquí te explico cómo funciona:

### 🔄 Flujo de Trabajo Normal

1. **Desarrollas localmente** (en tu computadora):
   ```bash
   npm run dev  # Tu servidor local en http://localhost:3000
   ```
   - Haces cambios en tu código
   - Pruebas todo localmente
   - Iteras y mejoras
   - **NO necesitas subir nada todavía**

2. **Cuando estés listo para publicar**:
   ```bash
   git add .
   git commit -m "Agregué nueva funcionalidad"
   git push origin main
   ```
   - Vercel detecta automáticamente el cambio
   - Hace deploy automático (1-2 minutos)
   - Tu sitio web se actualiza

3. **Tu sitio en producción sigue funcionando** mientras desarrollas:
   - Los visitantes ven la versión estable
   - Tú trabajas en la nueva versión localmente
   - Solo se actualiza cuando haces `git push`

### 🎯 Ventajas de Este Flujo

- ✅ **Desarrollas sin presión**: Puedes probar todo localmente primero
- ✅ **Control total**: Decides cuándo publicar cambios
- ✅ **Sin interrupciones**: Tu sitio en producción no se ve afectado mientras desarrollas
- ✅ **Deploy automático**: Una vez configurado, solo haces `git push` y se actualiza
- ✅ **Preview de cambios**: Puedes crear branches para probar antes de publicar

### 📋 Ejemplo de Flujo Diario

```
Lunes:
  - Desarrollas nueva página localmente (localhost:3000)
  - Pruebas, ajustas, mejoras
  - NO subes nada todavía

Martes:
  - Terminas la funcionalidad
  - Pruebas que todo funcione bien localmente
  - git push → Vercel hace deploy automático
  - Tu sitio web se actualiza en 2 minutos

Miércoles:
  - Desarrollas otra cosa localmente
  - El sitio web sigue mostrando la versión del martes
  - Repites el ciclo cuando quieras
```

### 🔀 Branches y Preview Deployments

Si usas branches en GitHub, Vercel crea automáticamente un preview para cada branch:

- `main` → Tu sitio en producción (tudominio.com)
- `feature/nueva-pagina` → Preview URL automático (tu-proyecto-git-feature-nueva-pagina.vercel.app)
- Puedes probar cambios sin afectar producción

### 💡 Resumen

**Puedes desarrollar todo lo que quieras localmente sin ningún problema.** Solo subes cuando estés listo. El sitio en producción no se ve afectado hasta que hagas `git push`.

---

## 📦 Opción 1: Vercel (La Más Fácil para Next.js)

### ¿Por qué Vercel?
- ✅ **GRATIS** para proyectos personales
- ✅ Creado por los mismos desarrolladores de Next.js
- ✅ Deploy automático desde GitHub
- ✅ SSL/HTTPS incluido gratis
- ✅ CDN global incluido
- ✅ Muy fácil de usar

### Plan Gratuito de Vercel incluye:
- Deploy ilimitados
- 100GB de ancho de banda/mes
- Dominio personalizado (necesitas comprarlo aparte)
- SSL automático
- Preview deployments para cada PR

### Pasos para Deploy en Vercel:

1. **Preparar tu proyecto**:
   ```bash
   # Asegúrate de que tu proyecto esté en GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git push -u origin main
   ```

2. **Crear cuenta en Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Regístrate con tu cuenta de GitHub (recomendado)

3. **Deploy**:
   - Click en "Add New Project"
   - Conecta tu repositorio de GitHub
   - Vercel detectará automáticamente que es Next.js
   - Click en "Deploy"
   - ¡Listo! Tu sitio estará en `tu-proyecto.vercel.app`

4. **Conectar dominio personalizado**:
   - En el dashboard de Vercel, ve a tu proyecto
   - Settings → Domains
   - Agrega tu dominio
   - Sigue las instrucciones para configurar DNS

### Costo: $0 USD/mes (solo necesitas comprar el dominio)

---

## 📦 Opción 2: Cloudflare Pages

### ¿Por qué Cloudflare Pages?
- ✅ **GRATIS** (sin límites estrictos)
- ✅ Excelente rendimiento global
- ✅ SSL incluido
- ✅ Puedes comprar el dominio directamente en Cloudflare (más barato)

### Pasos para Deploy en Cloudflare Pages:

1. **Preparar proyecto en GitHub** (igual que Vercel)

2. **Crear cuenta en Cloudflare**:
   - Ve a [cloudflare.com](https://cloudflare.com)
   - Regístrate gratis

3. **Deploy**:
   - Ve a Pages → Create a project
   - Conecta GitHub
   - Selecciona tu repositorio
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`
   - Click "Save and Deploy"

### Costo: $0 USD/mes (solo necesitas comprar el dominio)

---

## 🌐 Comprar Dominio Barato

### Opción 1: Cloudflare Registrar (MÁS BARATO)
- **Precio**: ~$8-10 USD/año para .com
- **Ventajas**:
  - Precio al costo (sin márgenes)
  - Sin renovaciones caras
  - DNS gratis incluido
  - Privacidad WHOIS gratis
- **Desventajas**: Menos extensiones disponibles

### Opción 2: Namecheap
- **Precio**: ~$10-12 USD/año para .com (primer año puede ser más barato)
- **Ventajas**:
  - Buena interfaz
  - Muchas extensiones disponibles
  - Soporte en español
- **Desventajas**: Renovación puede ser más cara

### Opción 3: GoDaddy (Solo si hay promoción)
- **Precio**: ~$1-2 USD el primer año, luego ~$15-20/año
- **Ventajas**: Promociones agresivas el primer año
- **Desventajas**: Renovación cara, muchas upsells

### Recomendación: **Cloudflare Registrar** o **Namecheap**

---

## 💰 Comparación de Costos

| Opción | Hosting | Dominio/año | Total/año | Dificultad |
|--------|---------|-------------|-----------|------------|
| **Vercel + Cloudflare Domain** | $0 | ~$9 | **~$9** | ⭐ Muy Fácil |
| **Vercel + Namecheap** | $0 | ~$11 | **~$11** | ⭐ Muy Fácil |
| **Cloudflare Pages + Domain** | $0 | ~$9 | **~$9** | ⭐⭐ Fácil |
| **Netlify + Domain** | $0 | ~$9-11 | **~$9-11** | ⭐⭐ Fácil |

---

## 🚀 Pasos Detallados: Vercel + Dominio

### Paso 1: Deploy en Vercel (5 minutos)

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com) y regístrate
3. Click "Add New Project"
4. Conecta GitHub y selecciona tu repo
5. Vercel detectará Next.js automáticamente
6. Click "Deploy"
7. Espera 1-2 minutos
8. ¡Tu sitio está en línea! (URL tipo: `tu-proyecto.vercel.app`)

### Paso 2: Comprar Dominio (10 minutos)

1. Ve a [cloudflare.com](https://cloudflare.com) o [namecheap.com](https://namecheap.com)
2. Busca tu dominio deseado
3. Agrega al carrito y completa la compra
4. Si compras en Cloudflare, el dominio ya estará configurado
5. Si compras en Namecheap, necesitarás configurar DNS

### Paso 3: Conectar Dominio a Vercel (5 minutos)

1. En Vercel, ve a tu proyecto → Settings → Domains
2. Agrega tu dominio (ej: `tudominio.com`)
3. Vercel te dará instrucciones de DNS:
   - Agrega un registro A o CNAME según indique
4. Si tu dominio está en Cloudflare:
   - Ve a DNS → Add record
   - Tipo: CNAME
   - Name: @ o www
   - Target: cname.vercel-dns.com
5. Espera 5-30 minutos para que se propague
6. ¡Listo!

---

## 🛠️ Preparar Tu Proyecto para GitHub (Una Sola Vez)

Si aún no tienes tu proyecto en GitHub, aquí está cómo prepararlo:

### Paso 1: Crear archivo .gitignore (si no existe)

Crea un archivo `.gitignore` en la raíz de tu proyecto con:

```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

### Paso 2: Inicializar Git y subir a GitHub

```bash
# 1. Inicializar git (si no lo has hecho)
git init

# 2. Agregar todos los archivos
git add .

# 3. Primer commit
git commit -m "Initial commit"

# 4. Crear repositorio en GitHub (ve a github.com y crea uno nuevo)
# 5. Conectar tu repositorio local con GitHub
git remote add origin https://github.com/tu-usuario/tu-repo.git

# 6. Subir tu código
git branch -M main
git push -u origin main
```

### Paso 3: Configurar Vercel (Una vez)

1. Ve a [vercel.com](https://vercel.com) y conéctalo con GitHub
2. Selecciona tu repositorio
3. Vercel detectará Next.js automáticamente
4. Click "Deploy"

**¡Listo!** Ahora cada vez que hagas `git push`, Vercel actualizará tu sitio automáticamente.

---

## 📝 Checklist Pre-Deploy

Antes de hacer deploy, asegúrate de:

- [ ] Tu proyecto funciona localmente (`npm run dev`)
- [ ] El build funciona (`npm run build`)
- [ ] No hay errores de TypeScript (`npm run lint`)
- [ ] El código está en GitHub
- [ ] Variables de entorno (si las hay) están documentadas
- [ ] Archivo `.gitignore` está configurado correctamente

---

## 🔧 Configuración Adicional (Opcional)

### Variables de Entorno en Vercel:
- Settings → Environment Variables
- Agrega cualquier variable que necesites (API keys, etc.)

### Dominio Personalizado con www:
- En Vercel, agrega tanto `tudominio.com` como `www.tudominio.com`
- Vercel redirigirá automáticamente

---

## 🆘 Troubleshooting Común

### Problema: "Build failed"
- **Solución**: Revisa los logs en Vercel, probablemente falta una dependencia o hay un error de TypeScript

### Problema: "Domain not resolving"
- **Solución**: Espera hasta 48 horas para propagación DNS, verifica que los registros DNS estén correctos

### Problema: "SSL certificate error"
- **Solución**: Vercel maneja SSL automáticamente, solo espera unos minutos después de conectar el dominio

---

## 📚 Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Guía de Next.js Deployment](https://nextjs.org/docs/deployment)
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)
- [Namecheap](https://www.namecheap.com/)

---

## 💡 Recomendación Final

**Para empezar rápido y barato:**
1. Usa **Vercel** (gratis, fácil, perfecto para Next.js)
2. Compra dominio en **Cloudflare Registrar** (~$9/año)
3. Conecta dominio a Vercel (5 minutos)
4. **Total: ~$9 USD/año** 🎉

Cuando tu proyecto crezca y necesites más recursos, puedes considerar planes de pago, pero para una prueba, esto es perfecto.

