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
  token: '',

  /* Versión de la API de Shopify. Solo se cambia si Shopify retira
     esta versión (avisan con un año de antelación).               */
  version: '2026-07',

  /* País del catálogo. Los precios se piden en este contexto.     */
  pais: 'EC',
  idioma: 'ES',

  /* Cuántos productos se muestran en el minisite. El resto se ve
     en la colección completa de Tekeno.                           */
  productos: 12,

  /* Categorías destacadas. «etiqueta» filtra la colección por esa
     etiqueta de producto en Tekeno; si la dejas vacía, el enlace
     lleva a la colección completa.                                */
  categorias: [
    { nombre: 'Celulares', etiqueta: 'celulares', imagen: 'assets/img/cat-celulares.jpg' },
    { nombre: 'Laptops', etiqueta: 'laptops', imagen: 'assets/img/cat-laptops.jpg' },
    { nombre: 'Tablets', etiqueta: 'tablets', imagen: 'assets/img/cat-tablets.jpg' },
  ],
};
