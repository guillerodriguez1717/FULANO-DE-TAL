# Plan UX/UI y arquitectura inicial — Fulano de Tal

## 1. Objetivo de la primera versión

La primera versión debe validar que las personas entienden la propuesta, encuentran un producto con facilidad y se sienten seguras para iniciar una compra bajo pedido. Debe ser sencilla, profesional, rápida y funcionar muy bien en celular.

La experiencia se apoyará en tres principios:

1. **Claridad:** explicar precio, medidas, plazo estimado y condiciones antes de que el cliente consulte.
2. **Acompañamiento humano:** facilitar la conversación con una persona real sin convertir cada paso en una venta agresiva.
3. **Transparencia:** distinguir claramente qué productos son bajo pedido y qué sucede después de confirmar.

La propuesta inicial recomendada es un **catálogo transaccional asistido**: el cliente descubre y compara productos en la web, elige sus variantes y envía una consulta o solicitud de compra por WhatsApp. Esto se adapta mejor al modelo bajo pedido que incorporar de inmediato un checkout complejo.

### Indicadores iniciales

- Visitas que llegan a una ficha de producto.
- Clics en “Consultar / pedir por WhatsApp”.
- Consultas que incluyen un producto y sus variantes correctamente identificados.
- Consultas que se convierten en pedidos confirmados.
- Preguntas repetidas que indiquen información faltante en la web.

## 2. Arquitectura general del sitio

### Navegación principal

- **Inicio**
- **Productos**
- **Categorías** (puede abrir un menú en lugar de ser una página independiente)
- **Cómo comprar**
- **Preguntas frecuentes**
- **Nosotros**
- **Contacto**

En escritorio, el encabezado debe mostrar el espacio reservado para el logo, los accesos principales, búsqueda y un botón visible de WhatsApp. En celular, conviene conservar logo, búsqueda, menú y acceso a WhatsApp sin saturar la barra superior.

### Navegación secundaria y utilitaria

- Formas de pago.
- Envíos y zonas de entrega.
- Cambios, cancelaciones y garantías.
- Privacidad y términos.
- Redes sociales.

Estos enlaces deben vivir principalmente en el pie de página y aparecer también en las fichas cuando sean relevantes.

### Jerarquía de catálogo

`Inicio → Categoría → Listado filtrado → Ficha de producto → Consulta/pedido`

La clasificación debe responder al modo en que compra una persona, por ejemplo: living, comedor, dormitorio, oficina y decoración. Al comienzo conviene evitar categorías vacías o niveles innecesarios.

## 3. Páginas recomendadas

### Esenciales para el MVP

1. **Inicio:** presenta la propuesta, categorías, productos elegidos y funcionamiento de la compra.
2. **Catálogo / Productos:** listado con búsqueda, filtros esenciales y ordenamiento simple.
3. **Categoría:** puede reutilizar la estructura del catálogo con contexto y filtros ya aplicados.
4. **Ficha de producto:** concentra toda la información necesaria para decidir y consultar.
5. **Cómo comprar:** explica el proceso bajo pedido con pasos, plazos y las preguntas frecuentes iniciales.
6. **Nosotros / Contacto:** presenta a la marca, a Fulano y la atención humana, además de WhatsApp, redes y horarios.
7. **Páginas legales:** términos, privacidad y políticas comerciales ajustadas a la normativa aplicable.

### Ficha de producto propuesta

- Galería de imágenes optimizadas.
- Nombre y categoría.
- Precio o indicación inequívoca de cómo se cotiza.
- Etiqueta “Bajo pedido” con enlace a su explicación.
- Resumen breve y beneficios principales.
- Selectores de medida, color, material u otras variantes.
- Plazo estimado de preparación/entrega, aclarando cuándo comienza a contarse.
- Medios de pago y condiciones de seña, cuando estén definidos.
- Medidas completas y recomendaciones para verificar accesos.
- Información de envío o método para cotizarlo.
- Botón principal “Consultar / pedir por WhatsApp”.
- Mensaje de WhatsApp prearmado con nombre, código y variantes elegidas.
- Descripción, materiales, cuidados, cambios y garantía.
- Productos relacionados, solo si son realmente relevantes.

El botón puede cambiar a “Quiero pedirlo” cuando el precio y las condiciones estén confirmados. No se debe usar “Comprar ahora” si todavía falta una validación manual importante.

## 4. Página de inicio, sección por sección

### 1. Barra informativa breve

Una sola promesa útil y comprobable, por ejemplo acceso a atención personal, medios de pago o cobertura de envíos. No utilizar un carrusel de mensajes.

### 2. Encabezado

Espacio reservado para logo, navegación, búsqueda y acceso a WhatsApp. Debe mantenerse compacto y reconocible.

### 3. Presentación principal

- Fotografía cálida de un ambiente real o composición de productos.
- Título directo que explique qué vende la tienda.
- Texto corto que indique que hay muebles y productos para el hogar, incluidos artículos bajo pedido.
- Acción principal: “Ver productos”.
- Acción secundaria: “Cómo comprar”.
- Aparición discreta del personaje, si la ilustración final está disponible.

No fijar todavía un eslogan. “Muebles y más” y “Fulano, te da una mano” deben tratarse como alternativas pendientes de validación, no como textos permanentes.

### 4. Accesos por categoría

Entre cuatro y seis categorías con imágenes consistentes y nombres evidentes. En móvil deben poder recorrerse sin interacciones ocultas.

### 5. Productos destacados

Una grilla corta y curada. Cada tarjeta debe incluir foto, nombre, precio o estado de cotización, etiqueta de modalidad y acceso claro al detalle. Las tarjetas deben ser modernas, aireadas y sin texto excesivo.

### 6. Cómo funciona comprar bajo pedido

Resumen visual de tres pasos:

1. **Elegís:** revisás el producto, medidas y variantes.
2. **Confirmamos:** una persona verifica disponibilidad, plazo, envío y forma de pago con vos.
3. **Lo pedimos y acompañamos:** se encarga al proveedor y te informamos el avance hasta la entrega.

Debe incluir un enlace a “Cómo comprar” y una aclaración visible de que no se cobra ni se confirma nada sin informar antes las condiciones aplicables.

### 7. Bloque de confianza

Presentar entre tres y cuatro compromisos concretos, no frases genéricas:

- Atención por personas reales.
- Condiciones y plazo confirmados antes del pedido.
- Seguimiento durante el proceso.
- Información clara sobre pago, envío y garantía.

Solo publicar promesas que el negocio pueda cumplir operativamente.

### 8. Selección o ambientes inspiradores

Un bloque editorial liviano —por ejemplo, “Ideas para el living”— que combine productos y ayude a imaginar el uso. Es preferible a un blog vacío durante el lanzamiento.

### 9. Preguntas frecuentes resumidas

Mostrar las cuatro o cinco dudas principales y enlazar a la página completa. La primera debe responder qué significa “bajo pedido”.

### 10. Contacto humano

Invitación sencilla a consultar por WhatsApp, con horarios y expectativa realista de respuesta. Fulano puede acompañar este bloque como guía, no como vendedor insistente.

### 11. Pie de página

Logo o nombre, navegación, contacto, redes, políticas, medios de pago/envío confirmados y datos legales exigibles. No mostrar iconos de plataformas o medios que todavía no se ofrezcan.

## 5. Recorrido principal del cliente

### Camino de compra recomendado

1. **Entender:** al entrar, la persona reconoce rápidamente qué se vende y que recibirá atención humana.
2. **Explorar:** entra al catálogo desde una categoría, un producto destacado o la búsqueda.
3. **Comparar:** usa pocos filtros útiles —categoría, rango de precio, medida y modalidad— y tarjetas consistentes.
4. **Evaluar:** abre una ficha con fotos, medidas, materiales, precio, variantes y plazo estimado.
5. **Comprender la modalidad:** una explicación contextual aclara el proceso bajo pedido sin sacarlo de la ficha.
6. **Elegir:** selecciona variantes y revisa un resumen.
7. **Consultar/pedir:** el botón abre WhatsApp con un mensaje claro y el identificador del producto.
8. **Confirmar con una persona:** el equipo valida disponibilidad, plazo, envío, precio final y pago.
9. **Recibir seguimiento:** después de confirmar, el cliente recibe hitos de estado hasta la entrega.

### Caminos alternativos

- Quien no sabe qué elegir puede consultar desde el inicio con una pregunta guiada.
- Quien llega desde redes directamente a un producto debe encontrar toda la información sin depender de la portada.
- Quien todavía no confía puede visitar “Cómo comprar”, preguntas frecuentes y “Nosotros”, y volver fácilmente al producto.

En móvil, el llamado a la acción de la ficha puede mantenerse visible cerca del borde inferior, sin tapar contenido ni competir con múltiples botones flotantes.

## 6. Presentación de productos bajo pedido

La modalidad debe comunicarse como un servicio acompañado, no como una advertencia problemática.

### Lenguaje

- Usar **“Bajo pedido”** de forma consistente.
- Explicarlo como “Lo pedimos especialmente después de confirmar contigo disponibilidad, plazo y condiciones”.
- Evitar “sin stock”, “demora incierta” o urgencias artificiales.
- Diferenciar “plazo estimado” de una fecha garantizada.

### Información mínima antes de contactar

- Qué se está comprando y qué incluye.
- Precio vigente o si requiere cotización.
- Variantes disponibles.
- Plazo estimado y factores que pueden modificarlo.
- Condición de pago o seña.
- Cómo se calcula el envío.
- Política de cambios/cancelación para artículos personalizados o encargados.
- Garantía y canal de seguimiento.

### Recursos de confianza

- Un bloque breve junto al botón y una explicación ampliada desplegable.
- Fecha de última verificación de precio o disponibilidad cuando sea operativamente sostenible.
- Código de producto incluido en cada consulta.
- Resumen escrito de lo acordado antes del pago.
- Estados futuros: consulta recibida, confirmado, pedido al proveedor, en preparación, listo para coordinar y entregado.
- Fotografías reales y reseñas verificadas cuando existan; nunca testimonios ficticios.

## 7. Dirección visual: vintage + moderna

### Sistema recomendado

- **Base moderna:** grilla ordenada, mucho espacio en blanco, controles simples, fotografías grandes, iconos claros y bordes discretos.
- **Firma vintage:** títulos editoriales, ilustración de Fulano, textura muy sutil, sellos pequeños y marcos puntuales.
- **Regla de proporción:** aproximadamente 80% interfaz limpia y 20% carácter vintage.
- **Formas:** esquinas suavemente redondeadas, líneas de grosor fino y algún marco ornamental solo en bloques de marca.
- **Fotografía:** luz natural cálida, interiores habitados pero ordenados, colores honestos y escala comprensible.
- **Ilustración:** trazos impresos de mediados de siglo, gesto amable y postura humilde. Fulano con boina, tiradores y mostacho italiano; evitar poses de “experto sabelotodo”, pulgar arriba constante o estética de caricatura estridente.

El personaje debería aparecer en presentación de marca, ayuda, proceso y contacto. No debe repetirse en cada tarjeta ni competir con las fotos de producto.

### Accesibilidad y consistencia

- Contraste suficiente en textos y acciones.
- Texto base cómodo, de al menos 16 px como referencia.
- Estados de foco visibles y navegación por teclado.
- Botones con texto, no solo color o iconos.
- No usar textura detrás de textos largos.
- Animaciones breves y opcionales, respetando preferencias de movimiento reducido.

## 8. Paleta de colores propuesta

| Rol | Color | Hex | Uso sugerido |
| --- | --- | --- | --- |
| Fondo principal | Marfil cálido | `#F7F2E8` | Fondos y sensación hogareña |
| Superficie | Blanco lino | `#FFFDF8` | Tarjetas y bloques elevados |
| Texto principal | Carbón | `#292722` | Lectura y alto contraste |
| Marca principal | Verde oliva oscuro | `#3F513F` | Encabezados, acciones y marca |
| Acción destacada | Terracota | `#B65336` | CTA y detalles puntuales |
| Acento vintage | Mostaza apagada | `#C49A43` | Sellos, ilustraciones y énfasis menor |
| Neutro | Arena | `#D9CDBA` | Bordes y fondos secundarios |
| Estado positivo | Verde bosque | `#2F6648` | Confirmaciones y disponibilidad |

El verde oliva puede ser el color principal de los botones; la terracota debe reservarse para acciones o énfasis concretos. Antes de desarrollar se deben verificar todas las combinaciones según WCAG y ajustar tonos si no alcanzan el contraste necesario.

## 9. Tipografías

### Combinación recomendada

- **Títulos de marca: Fraunces**, serif con personalidad y variantes ópticas que aporta un guiño vintage sin afectar la limpieza.
- **Interfaz y cuerpo: Source Sans 3**, sans serif amable, clara y muy legible en tamaños pequeños.

Como alternativa algo más editorial puede evaluarse **Lora + Inter**. Conviene usar como máximo dos familias, limitar pesos y servirlas optimizadas para no perjudicar el rendimiento.

La tipografía del logo definitivo puede ser dibujada o distinta, pero no debe convertirse automáticamente en la fuente de toda la interfaz.

## 10. Alcance recomendado del MVP

### Incluir

- Diseño adaptable a celular y escritorio.
- Inicio, catálogo, categorías, fichas, cómo comprar, preguntas frecuentes, nosotros y contacto.
- Contenido administrable para productos y categorías.
- Búsqueda básica.
- Filtros esenciales.
- Variantes informativas en la ficha.
- Integración con WhatsApp mediante mensajes prearmados.
- Indicadores claros de “Bajo pedido”.
- SEO técnico y metadatos sociales básicos.
- Analítica respetuosa de la privacidad para medir el recorrido.
- Optimización de imágenes, rendimiento y accesibilidad.
- Políticas y datos comerciales reales antes de publicar.

### No incluir todavía

- Checkout y carrito completos si la disponibilidad requiere confirmación manual.
- Registro obligatorio o cuentas de usuario.
- Programa de puntos, cupones complejos o lista de deseos.
- Reseñas hasta contar con un proceso de verificación.
- Blog sin estrategia ni capacidad de mantenimiento.
- Comparador avanzado o visualizador 3D/realidad aumentada.
- Chatbot automático que finja ser Fulano.
- Carruseles automáticos, ventanas emergentes al entrar o contadores de urgencia.
- Integraciones profundas con inventario si los proveedores aún no ofrecen datos confiables.
- Multiidioma o multimoneda sin una necesidad comercial validada.

## 11. Preparación para futuras funciones

Aunque no se activen en el MVP, la arquitectura de contenido debería contemplar:

- Estados de inventario: disponible, bajo pedido, agotado y discontinuado.
- SKU/código, proveedor interno, costo y fecha de actualización.
- Variantes con precios, imágenes, plazos y disponibilidad propios.
- Carrito y checkout posteriores sin rehacer las fichas.
- Pagos online, señas y enlaces de pago.
- Cálculo de envío por zona, volumen o código postal.
- Cuenta opcional, historial y seguimiento de pedidos.
- Automatizaciones de WhatsApp y correo con traspaso claro a una persona.
- Reseñas verificadas y preguntas por producto.
- Favoritos, colecciones, promociones y productos complementarios.
- Integración con sistemas de gestión, proveedores y analítica de comercio.
- Un CMS para que el equipo actualice contenido sin tocar código.

Para permitir esa evolución, cada producto debe ser un dato estructurado y no una página escrita manualmente. La modalidad bajo pedido, los plazos, variantes y políticas deben modelarse como campos independientes.

## 12. Contenidos y decisiones necesarias antes del diseño final

### Material a reunir

- Catálogo inicial y categorías reales.
- Fotos disponibles y criterio fotográfico.
- Precios, variantes, medidas y materiales.
- Plazos por proveedor o categoría.
- Condiciones de pago y señas.
- Cobertura, costos y responsables de envío.
- Políticas de cambios, cancelación y garantía.
- Horarios y responsable de WhatsApp.
- Datos legales y enlaces sociales.

### Decisiones de negocio pendientes

1. Si se mostrará precio cerrado, “desde” o cotización en cada tipo de producto.
2. En qué momento se considera confirmado un pedido.
3. Qué promesa de seguimiento puede sostener el equipo.
4. Qué ocurre si cambia el precio o el proveedor no confirma disponibilidad.
5. Qué categorías y cantidad de productos formarán el lanzamiento.
6. Qué alcance geográfico tendrán entrega e instalación.
7. Si “Muebles y más” o “Fulano, te da una mano” tendrá algún uso, sin fijarlo todavía como eslogan.

## 13. Fases de trabajo propuestas

### Fase 0 — Definición

- Resolver las decisiones comerciales pendientes.
- Auditar contenido y seleccionar el catálogo inicial.
- Definir tono de voz y encargar identidad/logo/personaje.

### Fase 1 — UX

- Mapa del sitio y modelo de contenidos.
- Flujos de catálogo, producto y consulta.
- Wireframes móviles primero.
- Prueba rápida con personas poco habituadas a comprar muebles online.

### Fase 2 — UI

- Sistema visual y componentes.
- Prototipo adaptable de inicio, catálogo y ficha.
- Validación de accesibilidad, textos y estados.

### Fase 3 — Desarrollo del MVP

- Implementación del catálogo administrable y páginas informativas.
- Integración de WhatsApp y medición de eventos.
- Pruebas en dispositivos, rendimiento, SEO y accesibilidad.

### Fase 4 — Lanzamiento y aprendizaje

- Publicar una selección controlada.
- Medir búsquedas, fichas vistas, consultas y conversiones.
- Mejorar contenidos a partir de preguntas reales.
- Decidir con evidencia si conviene sumar carrito, pagos o seguimiento automatizado.

## 14. Criterios de aprobación antes de programar

El desarrollo debería comenzar cuando estén aprobados:

- El alcance exacto del MVP.
- El mapa del sitio y el recorrido principal.
- La estructura de inicio, catálogo y ficha de producto.
- La modalidad de consulta/confirmación y sus textos.
- Las reglas comerciales básicas de productos bajo pedido.
- La dirección visual, paleta y tipografías provisionales.
- El inventario de contenido disponible y sus responsables.

Este plan no presupone el eslogan ni la identidad final: deja espacios preparados para incorporarlos cuando hayan sido definidos.
