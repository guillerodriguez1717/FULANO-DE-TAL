# Fulano de Tal

Prototipo funcional y responsive de la tienda online de muebles y productos para el hogar.

## Ver el sitio

Solo hace falta tener Node.js, TypeScript (`tsc`) y Python 3 disponibles:

```bash
npm run dev
```

Luego abrir [http://localhost:4173](http://localhost:4173). El comando genera la versión estática en `dist/` y levanta un servidor local.

También se puede ejecutar cada paso por separado:

```bash
npm run build
npm run preview
```

## Estructura

- `src/App.jsx`: páginas y recorridos principales del prototipo.
- `src/components/`: navegación, tarjetas de producto y componentes reutilizables de Fulano.
- `src/data/products.js`: catálogo ficticio de demostración, centralizado y reemplazable.
- `src/styles.css`: sistema visual responsive, paleta y tipografías.
- `vendor/`: runtime mínimo local utilizado para que el prototipo no dependa de instalaciones externas.
- `scripts/`: construcción y validación del sitio estático.
- `docs/plan-ux-ui-mvp.md`: plan UX/UI y arquitectura inicial.

## Configuración

El número para las consultas se configura en la constante `WHATSAPP_NUMBER` de `src/App.jsx`, con código de país y solo dígitos.

### Publicación en GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` valida, compila y publica automáticamente `dist/` con `SITE_BASE=/FULANO-DE-TAL/` cada vez que se envían cambios a `main`. También se puede ejecutar manualmente desde la pestaña **Actions**.

En el repositorio de GitHub, ir a **Settings → Pages → Build and deployment** y elegir **GitHub Actions** en **Source**. No hay que seleccionar una carpeta ni una rama de publicación: el workflow entrega directamente el artefacto generado a Pages.

La publicación quedará disponible en `https://guillerodriguez1717.github.io/FULANO-DE-TAL/`. El workflow instala su compilador dentro del runner de GitHub, por lo que publicar no requiere instalar herramientas manualmente en la computadora local.

### Reemplazar las ilustraciones de Fulano

`src/components/Fulano.jsx` centraliza el placeholder ilustrado y recibe una propiedad `scene` (`measure`, `phone`, `search`, `list`, `box` o `hello`). Para incorporar las ilustraciones definitivas sin cambiar las páginas:

1. guardar los archivos optimizados en `public/illustrations/`;
2. mantener la misma interfaz de propiedades del componente;
3. sustituir el SVG interno por una imagen elegida según `scene`;
4. conservar el texto alternativo y las clases `fulano-art` para mantener accesibilidad y diseño responsive.

## Comandos

```bash
npm run check   # valida JavaScript/JSX y los scripts del proyecto
npm run build   # crea el sitio estático en dist/
npm run dev     # construye y sirve el sitio en el puerto 4173
```
