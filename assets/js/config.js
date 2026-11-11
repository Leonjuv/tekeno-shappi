/* ───────────────────────────────────────────────────────────────
   AJUSTES DEL MINISITE  ·  Tekeno x Shappi
   Este es el único archivo que hay que tocar para poner el sitio
   en marcha o para cambiar textos y enlaces. No hace falta saber
   programar: cambia lo que está entre comillas.
   ─────────────────────────────────────────────────────────────── */

window.CONFIG = {
  /* Tienda ---------------------------------------------------- */
  tienda: 'tekeno.com',
  coleccion: 'shappi',

  /* Clave pública de escaparate de Shopify.
     Se crea en: Configuración → Aplicaciones y canales de venta →
     Desarrollar apps → Crear app → API de Storefront → permisos de
     lectura de productos. Es pública: puede ir en el repositorio.
     Mientras esté vacía, el sitio muestra el aviso de «próximamente»
     en lugar de la cuadrícula de productos.                       */
  token: 'cf77847e70c96acffa0d338565b7d651',

  /* Versión de la API de Shopify. Solo se cambia si Shopify retira
     esta versión (avisan con un año de antelación).               */
  version: '2026-07',

  /* País del catálogo. Los precios se piden en este contexto.     */
  pais: 'EC',
  idioma: 'ES',

  /* Cuántos productos se muestran como máximo. Con 100 salen todos los
     de la colección shappi de Tekeno, igual que en la tienda.      */
  productos: 100,

  /* Aviso «Importante» de cada tarjeta (pedido de Paul, 6 nov 2026).
     Sale al pasar el ratón o al tocar la etiqueta roja.            */
  nota: 'Los celulares y productos electrónicos de Shappi deben ser comprados por separado y sin mezclar con otros productos de Tekeno. Para más información, por favor contáctenos a info@tekeno.com.',

  /* Categorías destacadas. «etiqueta» filtra la colección por esa
     etiqueta de producto en Tekeno; si la dejas vacía, el enlace
     lleva a la colección completa.                                */
  categorias: [
    { nombre: 'Celulares', etiqueta: 'celulares', imagen: 'assets/img/cat-celulares.jpg' },
    { nombre: 'Laptops', etiqueta: 'laptops', imagen: 'assets/img/cat-laptops.jpg' },
    { nombre: 'Tablets', etiqueta: 'tablets', imagen: 'assets/img/cat-tablets.jpg' },
  ],
};
