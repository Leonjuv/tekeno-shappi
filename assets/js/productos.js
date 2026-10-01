/* ───────────────────────────────────────────────────────────────
   Trae la colección de Shopify y pinta las tarjetas.
   Si no hay clave configurada, o si la colección aún está vacía,
   enseña el aviso de «muy pronto» en lugar de la cuadrícula.
   ─────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var C = window.CONFIG || {};
  var TIENDA = 'https://' + (C.tienda || 'tekeno.com');
  var URL_COLECCION = TIENDA + '/collections/' + (C.coleccion || 'shappi');
  var CACHE = 'tk-shappi-productos';
  var CACHE_MINUTOS = 10;

  /* ── Enlaces ─────────────────────────────────────────────── */
  var destinos = {
    coleccion: URL_COLECCION,
    tienda: TIENDA,
    politicas: TIENDA + '/policies/refund-policy',
  };
  document.querySelectorAll('[data-enlace]').forEach(function (a) {
    var destino = destinos[a.getAttribute('data-enlace')];
    if (!destino) return;
    a.href = destino;
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ── Categorías ──────────────────────────────────────────── */
  var cajaCategorias = document.getElementById('rejilla-categorias');
  if (cajaCategorias && Array.isArray(C.categorias)) {
    cajaCategorias.innerHTML = C.categorias.map(function (cat) {
      var url = cat.etiqueta ? URL_COLECCION + '/' + cat.etiqueta : URL_COLECCION;
      var foto = cat.imagen
        ? '<img src="' + cat.imagen + '" alt="" loading="lazy" width="400" height="400">'
        : '';
      return '<a class="categoria' + (cat.imagen ? '' : ' categoria--sin-foto') + '" href="' + url + '" target="_blank" rel="noopener">' +
             foto + '<span>' + cat.nombre + '</span></a>';
    }).join('');
  }

  /* ── Utilidades ──────────────────────────────────────────── */
  function dinero(cantidad, moneda) {
    var n = Number(cantidad);
    if (isNaN(n)) return '';
    try {
      return new Intl.NumberFormat('es-EC', { style: 'currency', currency: moneda || 'USD' }).format(n);
    } catch (e) {
      return '$' + n.toFixed(2);
    }
  }

  function escapar(texto) {
    return String(texto == null ? '' : texto)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function medida(url, ancho) {
    if (!url) return '';
    return url + (url.indexOf('?') === -1 ? '?' : '&') + 'width=' + ancho;
  }

  var CAMION = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v8H3z"/><path d="M14 10h4l3 3v2h-7z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>';

  /* ── Tarjeta ─────────────────────────────────────────────── */
  function tarjeta(producto) {
    var precio = producto.priceRange && producto.priceRange.minVariantPrice;
    var antes = producto.compareAtPriceRange && producto.compareAtPriceRange.minVariantPrice;
    var hayOferta = antes && Number(antes.amount) > Number(precio.amount);
    var agotado = producto.availableForSale === false;
    var foto = producto.featuredImage;

    var insignia = '';
    if (agotado) {
      insignia = '<span class="tarjeta__insignia tarjeta__insignia--agotado">Agotado</span>';
    } else if (hayOferta) {
      var dto = Math.round((1 - Number(precio.amount) / Number(antes.amount)) * 100);
      if (dto > 0) insignia = '<span class="tarjeta__insignia">-' + dto + '%</span>';
    }

    return '' +
      '<a class="tarjeta" href="' + TIENDA + '/products/' + escapar(producto.handle) + '" target="_blank" rel="noopener">' +
        '<div class="tarjeta__foto">' +
          (foto
            ? '<img src="' + escapar(medida(foto.url, 500)) + '" alt="' + escapar(foto.altText || producto.title) + '" loading="lazy" width="500" height="625">'
            : '') +
          insignia +
        '</div>' +
        '<h3 class="tarjeta__titulo">' + escapar(producto.title) + '</h3>' +
        '<div class="tarjeta__precios">' +
          '<span class="tarjeta__precio' + (hayOferta ? ' tarjeta__precio--oferta' : '') + '"><span>' +
            dinero(precio.amount, precio.currencyCode) + '</span></span>' +
          (hayOferta ? '<span class="tarjeta__antes">' + dinero(antes.amount, antes.currencyCode) + '</span>' : '') +
        '</div>' +
        '<div class="tarjeta__envio">' + CAMION + 'Envío gratis</div>' +
      '</a>';
  }

  /* ── Pintar ──────────────────────────────────────────────── */
  var rejilla = document.getElementById('rejilla');
  var aviso = document.getElementById('aviso');

  function mostrarAviso(titulo, texto) {
    if (rejilla) { rejilla.innerHTML = ''; rejilla.hidden = true; rejilla.setAttribute('aria-busy', 'false'); }
    if (!aviso) return;
    if (titulo) document.getElementById('aviso-titulo').textContent = titulo;
    if (texto) document.getElementById('aviso-texto').textContent = texto;
    aviso.hidden = false;
  }

  function pintar(productos) {
    if (!productos || !productos.length) {
      mostrarAviso();
      return;
    }
    rejilla.innerHTML = productos.map(tarjeta).join('');
    rejilla.setAttribute('aria-busy', 'false');
  }

  /* ── Datos ───────────────────────────────────────────────── */
  var CONSULTA = '' +
    'query productos($handle: String!, $cantidad: Int!) @inContext(country: ' + (C.pais || 'EC') + ', language: ' + (C.idioma || 'ES') + ') {' +
    '  collection(handle: $handle) {' +
    '    products(first: $cantidad) {' +
    '      nodes {' +
    '        title handle availableForSale' +
    '        featuredImage { url altText }' +
    '        priceRange { minVariantPrice { amount currencyCode } }' +
    '        compareAtPriceRange { minVariantPrice { amount currencyCode } }' +
    '      }' +
    '    }' +
    '  }' +
    '}';

  function leerCache() {
    try {
      var guardado = JSON.parse(sessionStorage.getItem(CACHE) || 'null');
      if (!guardado) return null;
      if (Date.now() - guardado.cuando > CACHE_MINUTOS * 60000) return null;
      return guardado.productos;
    } catch (e) { return null; }
  }

  function guardarCache(productos) {
    try {
      sessionStorage.setItem(CACHE, JSON.stringify({ cuando: Date.now(), productos: productos }));
    } catch (e) { /* modo privado: da igual */ }
  }

  function traer() {
    if (!C.token) {
      mostrarAviso();
      console.info('Minisite Shappi: falta la clave de escaparate en assets/js/config.js');
      return;
    }

    var guardados = leerCache();
    if (guardados) { pintar(guardados); return; }

    fetch(TIENDA + '/api/' + (C.version || '2026-07') + '/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': C.token,
      },
      body: JSON.stringify({
        query: CONSULTA,
        variables: { handle: C.coleccion || 'shappi', cantidad: C.productos || 12 },
      }),
    })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (datos) {
        if (datos.errors && datos.errors.length) throw new Error(datos.errors[0].message);
        var productos = datos.data && datos.data.collection && datos.data.collection.products
          ? datos.data.collection.products.nodes
          : [];
        guardarCache(productos);
        pintar(productos);
      })
      .catch(function (err) {
        console.error('Minisite Shappi:', err);
        mostrarAviso(
          'No pudimos cargar el catálogo',
          'Inténtalo de nuevo en un momento, o entra directamente a la colección en Tekeno.'
        );
      });
  }

  traer();
})();
