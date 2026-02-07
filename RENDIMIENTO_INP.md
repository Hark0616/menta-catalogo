# Mejora de INP (Interaction to Next Paint) en el Navbar

## Qué es INP

**INP (Interaction to Next Paint)** es una métrica de Core Web Vitals que mide el tiempo desde que el usuario interactúa (clic, toque, tecla) hasta que la pantalla se actualiza. Un valor alto (p. ej. >500 ms) indica que la app se siente lenta al hacer clic.

## Cambios realizados en el Navbar

Para reducir el INP del clic en las flechas de expandir/colapsar categorías (desktop y móvil):

1. **Handlers estables con `useCallback`**
   - `closeMobileMenu`, `toggleNaturaCategory` y `toggleNovaVentaCategory` están envueltos en `useCallback` con dependencias vacías.
   - Así los componentes memoizados no reciben una función nueva en cada render y evitan re-renders innecesarios.

2. **Menos re-renders con `React.memo`**
   - `CategoryDropdownContent` y `MobileCategoryBlock` están envueltos en `memo()`.
   - Al hacer clic en una categoría de Natura, solo se re-renderiza el bloque de Natura; el de NovaVenta mantiene las mismas props y no se vuelve a renderizar (y al revés).

3. **Deferir el `setState` con `requestAnimationFrame`**
   - En el `onClick` del botón que expande/colapsa categorías, se llama a `onToggleCategory(id)` dentro de `requestAnimationFrame(...)`.
   - El manejador del clic termina de inmediato; la actualización de estado y el re-render ocurren en el siguiente frame, dejando al navegador pintar antes y mejorando el INP.

## Cómo volver a medir INP

1. **Chrome DevTools**
   - Abre la página (local o producción).
   - F12 → pestaña **Performance** (o **Lighthouse**).
   - En **Lighthouse**: ejecuta un reporte y revisa la sección "Interaction to Next Paint" o las métricas de interacción.
   - En **Performance**: graba, haz clic en la flecha de una categoría en el menú (Natura o NovaVenta, desktop o móvil), detén la grabación y revisa el tiempo del evento "click" hasta el siguiente paint.

2. **Panel "Interaction to Next Paint" (Chrome)**
   - Si tu versión de Chrome muestra el panel específico de INP en las herramientas de rendimiento, úsalo para ver el desglose (input delay, processing, etc.) del clic en el SVG del menú.

3. **PageSpeed Insights / Search Console**
   - En [PageSpeed Insights](https://pagespeed.web.dev/) pasa la URL de tu sitio; el informe incluye Core Web Vitals y puede mostrar datos de INP en campo (si hay suficientes visitas).

## Umbrales de referencia

- **≤ 200 ms**: Bueno (verde).
- **200–500 ms**: Mejorable (naranja).
- **> 500 ms**: Malo (rojo).

Objetivo: que el clic en expandir/colapsar categorías quede por debajo de 200 ms (idealmente cerca de 40 ms).

## Archivos tocados

- `components/Navbar.tsx`: `useCallback` para handlers, `memo` para `CategoryDropdownContent` y `MobileCategoryBlock`, y `requestAnimationFrame` en el `onClick` de los botones de categoría.
