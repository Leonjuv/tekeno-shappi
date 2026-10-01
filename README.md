# Tekeno × Shappi · minisite

Sitio estático para **shappi.tekeno.com**. Presenta la alianza, explica qué es la tecnología
reacondicionada y lleva a la colección **Shappi** de tekeno.com, donde ocurre la compra.
Aquí no hay carrito: el pago con Place2Pay y la regla de métodos de pago viven en Shopify.

## Qué hay dentro

```
index.html              La página entera
assets/css/estilos.css  Estilos (colores de Shappi arriba, de Tekeno donde se compra)
assets/js/config.js     ÚNICO archivo que hay que tocar: clave, colección, categorías
assets/js/productos.js  Pide los productos a Shopify y pinta las tarjetas
assets/img/             Imágenes y logos
assets/fonts/rubik.woff2  Tipografía de Shappi, servida desde el propio sitio
CNAME                   Dominio para GitHub Pages
```

Sin framework y sin compilación: lo que está aquí es lo que se publica.

## Puesta en marcha

### 1. Clave de escaparate de Shopify

En el admin de Tekeno: **Configuración → Aplicaciones y canales de venta → Desarrollar apps →
Crear app**. En *Configuración de la API de Storefront* marca los permisos de lectura de
productos y colecciones, instala la app y copia el **token de acceso de Storefront**.

Pégalo en `assets/js/config.js`, en `token`. Es una clave **pública** de solo lectura: puede
estar en el repositorio sin riesgo.

Mientras esté vacía, la página funciona igual pero muestra el aviso de «Muy pronto» en lugar
de la cuadrícula de productos.

### 2. Publicar en GitHub Pages

1. Crea un repositorio, por ejemplo `tekeno-shappi`.
2. Sube el contenido de esta carpeta a la raíz del repositorio.
3. En **Settings → Pages**, elige la rama `main` y la carpeta `/ (root)`.
4. En **Custom domain** escribe `shappi.tekeno.com` y marca *Enforce HTTPS*.

### 3. DNS

El dominio tekeno.com está en **Google Cloud DNS**. Añade un registro:

```
Nombre: shappi     Tipo: CNAME     Valor: <tu-usuario>.github.io.
```

No conectes ese subdominio en Shopify: si lo haces, redirigirá a tekeno.com.

## Cosas que conviene saber

- **Los precios salen en contexto Ecuador.** Es lo que define `pais: 'EC'` en la configuración.
- **Los productos vienen de la colección `shappi`**, la misma que se ve en la tienda. Si
  cambias el handle en Shopify, cámbialo también en `config.js`.
- **Las categorías** enlazan a la colección filtrada por etiqueta, por ejemplo
  `tekeno.com/collections/shappi/celulares`. Para que funcione, los productos deben llevar esa
  etiqueta además de `shappi`.
- **Respuesta en caché 10 minutos** en la propia pestaña, para no pedir lo mismo una y otra vez.

## Pendiente

- Imágenes de **laptops** y **relojes inteligentes** (las tarjetas funcionan sin foto).
- Imagen de **producto revisado** para el bloque de garantía.
- Imagen para **redes sociales**; por ahora se comparte la cabecera.
- **Textos reales de garantía**: meses de cobertura y qué incluye.
