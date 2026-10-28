# Fulano de Tal

Vista previa responsive de Fulano de Tal con cuatro líneas comerciales: Muebles, Deco y Bazar como línea principal; Perfumería; Cotillón y Descartables; y Textiles por encargo.

La vista previa no contiene productos reales ni procesa pagos. Fulano recibe y asesora las consultas. Los productos de Río Shop Deco son vendidos, cobrados y facturados por Río Shop Deco.

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

- `src/App.jsx`: portada, navegación con rutas hash, páginas de líneas y consultas.
- `src/config/contact.js`: número provisional de WhatsApp y formato de los mensajes.
- `src/components/`: navegación, tarjetas de producto y componentes reutilizables de Fulano.
- `src/data/products.js`: líneas, categorías futuras, plantilla de producto y catálogo vacío.
- `src/styles.css`: sistema visual responsive, paleta y tipografías.
- `vendor/`: runtime mínimo local utilizado para que el prototipo no dependa de instalaciones externas.
- `scripts/`: construcción y validación del sitio estático.
- `docs/plan-ux-ui-mvp.md`: plan UX/UI y arquitectura inicial.

## Configuración

El número provisional de WhatsApp se configura en `src/config/contact.js`. Los enlaces abren una conversación con el mensaje contextual ya preparado; el visitante puede editarlo en WhatsApp y enviarlo manualmente. El sitio no registra ni da seguimiento automático a las consultas.

Las referencias `FT-<código de línea>-<código de producto>` son una propuesta de formato manual, no un número de caso ni un sistema de seguimiento. La plantilla de `productTemplate` permite incorporar después código público, disponibilidad confirmada, precio y demás datos de catálogo sin publicar productos en borrador.

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
