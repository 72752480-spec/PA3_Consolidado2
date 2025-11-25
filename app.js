/**
 * ============================================
 * URBAN STYLE - TIENDA DE ROPA Y ZAPATOS
 * Consolidado 2 - JavaScript
 * ============================================
 * Este código demuestra:
 * 1. Valores, tipos y operadores
 * 2. Estructuras de control (if, else, switch, for, while)
 * 3. Funciones (flecha, recursivas, crecientes)
 * 4. Objetos y Arrays
 * 5. Encapsulamiento y métodos
 * 6. Prototipos y Clases
 * 7. Mapas y Polimorfismo
 * 8. Eventos y DOM
 * 9. Propagación de eventos
 * ============================================
 */

// ============================================
// 1. VALORES, TIPOS Y OPERADORES
// ============================================

// Tipos primitivos
const STORE_NAME = "Urban Style";          // String
const TAX_RATE = 0.18;                      // Number
const FREE_SHIPPING_MIN = 200;              // Number
const SHIPPING_COST = 15;                   // Number
let isStoreOpen = true;                     // Boolean
let selectedProduct = null;                 // Null
let userPreferences;                        // Undefined

// Operadores aritméticos, lógicos y de comparación
const calculateDiscount = (price, percent) => price - (price * percent / 100);
const hasDiscount = (product) => product.discount > 0 && product.discount !== null;
const isInStock = (product) => product.stock >= 1;

// Template literals
const formatPrice = (price) => `S/ ${price.toFixed(2)}`;

// Operador ternario
const getStockStatus = (stock) => stock > 0 ? "Disponible" : "Agotado";

// ============================================
// 6. PROTOTIPOS Y CLASES + 5. ENCAPSULAMIENTO
// ============================================

// Clase base Producto (Encapsulamiento con # para propiedades privadas)
class Producto {
    #id;
    #nombre;
    #precio;
    #stock;
    
    constructor(id, nombre, precio, stock, categoria, imagen, descripcion) {
        this.#id = id;
        this.#nombre = nombre;
        this.#precio = precio;
        this.#stock = stock;
        this.categoria = categoria;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.rating = Math.floor(Math.random() * 2) + 4; // 4-5 estrellas
        this.discount = 0;
        this.isNew = false;
        this.tallas = [];
        this.colores = [];
    }
    
    // Getters (Encapsulamiento)
    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get precio() { return this.#precio; }
    get stock() { return this.#stock; }
    
    // Setters (Encapsulamiento)
    set stock(value) {
        if (value >= 0) this.#stock = value;
    }
    
    // Métodos
    getPrecioFinal() {
        return this.discount > 0 
            ? this.#precio - (this.#precio * this.discount / 100) 
            : this.#precio;
    }
    
    getRatingStars() {
        return "⭐".repeat(this.rating);
    }
    
    // Método que será sobrescrito (Polimorfismo)
    getInfo() {
        return `${this.#nombre} - ${formatPrice(this.getPrecioFinal())}`;
    }
}

// ============================================
// 7. POLIMORFISMO - Clases hijas
// ============================================

// Clase Zapato (hereda de Producto)
class Zapato extends Producto {
    constructor(id, nombre, precio, stock, imagen, descripcion, tipo) {
        super(id, nombre, precio, stock, "zapatos", imagen, descripcion);
        this.tipo = tipo; // deportivo, casual, formal
        this.tallas = ["36", "38", "40", "42"];
    }
    
    // Polimorfismo: sobrescribe getInfo()
    getInfo() {
        return `👟 ${this.nombre} (${this.tipo}) - ${formatPrice(this.getPrecioFinal())}`;
    }
    
    // Método específico de Zapato
    getTallaDisponible(talla) {
        return this.tallas.includes(talla);
    }
}

// Clase Ropa (hereda de Producto)
class Ropa extends Producto {
    constructor(id, nombre, precio, stock, imagen, descripcion, tipo) {
        super(id, nombre, precio, stock, "ropa", imagen, descripcion);
        this.tipo = tipo; // camiseta, pantalon, chaqueta
        this.tallas = ["S", "M", "L", "XL"];
    }
    
    // Polimorfismo: sobrescribe getInfo()
    getInfo() {
        return `👕 ${this.nombre} (${this.tipo}) - ${formatPrice(this.getPrecioFinal())}`;
    }
    
    getTallaDisponible(talla) {
        return this.tallas.includes(talla);
    }
}

// Clase Accesorio (hereda de Producto)
class Accesorio extends Producto {
    constructor(id, nombre, precio, stock, imagen, descripcion, tipo) {
        super(id, nombre, precio, stock, "accesorios", imagen, descripcion);
        this.tipo = tipo; // gorra, bolso, cinturon
    }
    
    // Polimorfismo: sobrescribe getInfo()
    getInfo() {
        return `🧢 ${this.nombre} (${this.tipo}) - ${formatPrice(this.getPrecioFinal())}`;
    }
}

// ============================================
// 7. MAPAS (Map)
// ============================================

// Map para cupones de descuento
const cupones = new Map();
cupones.set("DESCUENTO10", { porcentaje: 10, activo: true });
cupones.set("DESCUENTO20", { porcentaje: 20, activo: true });
cupones.set("ENVIOGRATIS", { envioGratis: true, activo: true });
cupones.set("URBAN50", { porcentaje: 50, activo: false });

// Map para categorías
const categorias = new Map([
    ["zapatos", { nombre: "Zapatos", icono: "👟", cantidad: 0 }],
    ["ropa", { nombre: "Ropa", icono: "👕", cantidad: 0 }],
    ["accesorios", { nombre: "Accesorios", icono: "🧢", cantidad: 0 }]
]);

// ============================================
// 4. OBJETOS Y ARRAYS
// ============================================

// Array de productos (usando las clases definidas)
const productos = [
    // Zapatos
    (() => {
        const p = new Zapato(1, "Nike Air Max 90", 450, 15, 
            "../img/Nike Air Max 90.jpg", 
            "Zapatillas deportivas clásicas con amortiguación Air", "deportivo");
        p.discount = 20;
        p.colores = ["negro", "blanco", "rojo"];
        return p;
    })(),
    (() => {
        const p = new Zapato(2, "Adidas Ultraboost", 520, 10,
            "../img/Adidas Ultra Boost.jpg",
            "Running premium con tecnología Boost", "deportivo");
        p.isNew = true;
        p.colores = ["negro", "azul"];
        return p;
    })(),
    (() => {
        const p = new Zapato(3, "Converse Chuck Taylor", 280, 25,
            "../img/Converse Chuck Taylor.png",
            "El clásico que nunca pasa de moda", "casual");
        p.colores = ["negro", "blanco", "rojo"];
        return p;
    })(),
    (() => {
        const p = new Zapato(4, "Vans Old Skool", 320, 18,
            "../img/Vans Old Skool.png",
            "Estilo skate con la icónica franja lateral", "casual");
        p.discount = 15;
        p.colores = ["negro", "blanco"];
        return p;
    })(),
    (() => {
        const p = new Zapato(5, "New Balance 574", 380, 12,
            "../img/New Balance 574.png",
            "Comodidad y estilo retro", "deportivo");
        p.isNew = true;
        p.colores = ["azul", "verde"];
        return p;
    })(),
    
    // Ropa
    (() => {
        const p = new Ropa(6, "Camiseta Nike Dri-FIT", 120, 30,
            "../img/Camiseta Nike Dri Fit.png",
            "Tecnología que absorbe el sudor", "camiseta");
        p.colores = ["negro", "blanco", "azul"];
        return p;
    })(),
    (() => {
        const p = new Ropa(7, "Hoodie Urban Classic", 180, 20,
            "../img/Hoodie Urban Classic.png",
            "Sudadera con capucha, algodón premium", "sudadera");
        p.discount = 25;
        p.colores = ["negro", "azul"];
        return p;
    })(),
    (() => {
        const p = new Ropa(8, "Jeans Slim Fit", 150, 22,
            "../img/Jeans Slim Fit.png",
            "Denim de alta calidad, corte moderno", "pantalon");
        p.isNew = true;
        p.colores = ["azul"];
        return p;
    })(),
    (() => {
        const p = new Ropa(9, "Chaqueta Bomber", 250, 15,
            "../img/Chaqueta Bomber.png",
            "Estilo aviador, forro interior", "chaqueta");
        p.discount = 30;
        p.colores = ["negro", "verde"];
        return p;
    })(),
    (() => {
        const p = new Ropa(10, "Polo Ralph Style", 140, 18,
            "../img/Polo Ralph Style.png",
            "Elegante polo de algodón piqué", "polo");
        p.colores = ["blanco", "azul", "rojo"];
        return p;
    })(),
    
    // Accesorios
    (() => {
        const p = new Accesorio(11, "Gorra New Era", 85, 40,
            "../img/Gorro New Era.png",
            "Gorra snapback con bordado 3D", "gorra");
        p.colores = ["negro", "blanco"];
        return p;
    })(),
    (() => {
        const p = new Accesorio(12, "Mochila Urban", 180, 12,
            "../img/Mochila Urban.png",
            "Mochila resistente con compartimento laptop", "mochila");
        p.isNew = true;
        p.colores = ["negro"];
        return p;
    })(),
    (() => {
        const p = new Accesorio(13, "Cinturón de Cuero", 75, 25,
            "../img/Cinturón de Cuero.png",
            "Cuero genuino con hebilla metálica", "cinturon");
        p.discount = 10;
        p.colores = ["negro", "marrón"];
        return p;
    })(),
    (() => {
        const p = new Accesorio(14, "Reloj Deportivo", 220, 8,
            "../img/Reloj Deportivo.png",
            "Resistente al agua, cronómetro digital", "reloj");
        p.colores = ["negro"];
        return p;
    })(),
    (() => {
        const p = new Accesorio(15, "Lentes de Sol", 160, 20,
            "../img/Lentes de Sol.png",
            "Protección UV400, estilo aviador", "lentes");
        p.discount = 15;
        p.colores = ["negro"];
        return p;
    })()
];

// Actualizar cantidad por categoría usando forEach
productos.forEach(producto => {
    const cat = categorias.get(producto.categoria);
    if (cat) cat.cantidad++;
});

// ============================================
// CLASE CARRITO (Encapsulamiento completo)
// ============================================

class Carrito {
    #items;
    #descuentoAplicado;
    #envioGratis;
    
    constructor() {
        this.#items = [];
        this.#descuentoAplicado = 0;
        this.#envioGratis = false;
    }
    
    // Getter
    get items() { return [...this.#items]; }
    get totalItems() {
        return this.#items.reduce((sum, item) => sum + item.cantidad, 0);
    }
    
    // Métodos del carrito
    agregarProducto(producto, cantidad = 1, talla = null, color = null) {
        const itemExistente = this.#items.find(
            item => item.producto.id === producto.id && 
                    item.talla === talla && 
                    item.color === color
        );
        
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            this.#items.push({ producto, cantidad, talla, color });
        }
    }
    
    eliminarProducto(productoId, talla, color) {
        this.#items = this.#items.filter(
            item => !(item.producto.id === productoId && 
                     item.talla === talla && 
                     item.color === color)
        );
    }
    
    actualizarCantidad(productoId, talla, color, nuevaCantidad) {
        const item = this.#items.find(
            item => item.producto.id === productoId && 
                    item.talla === talla && 
                    item.color === color
        );
        if (item) {
            if (nuevaCantidad <= 0) {
                this.eliminarProducto(productoId, talla, color);
            } else {
                item.cantidad = nuevaCantidad;
            }
        }
    }
    
    calcularSubtotal() {
        return this.#items.reduce((sum, item) => {
            return sum + (item.producto.getPrecioFinal() * item.cantidad);
        }, 0);
    }
    
    calcularDescuento() {
        return this.calcularSubtotal() * this.#descuentoAplicado / 100;
    }
    
    calcularEnvio() {
        const subtotal = this.calcularSubtotal();
        if (this.#envioGratis || subtotal >= FREE_SHIPPING_MIN) return 0;
        return this.#items.length > 0 ? SHIPPING_COST : 0;
    }
    
    calcularTotal() {
        return this.calcularSubtotal() - this.calcularDescuento() + this.calcularEnvio();
    }
    
    aplicarCupon(codigo) {
        const cupon = cupones.get(codigo.toUpperCase());
        if (cupon && cupon.activo) {
            if (cupon.porcentaje) {
                this.#descuentoAplicado = cupon.porcentaje;
            }
            if (cupon.envioGratis) {
                this.#envioGratis = true;
            }
            return { exito: true, mensaje: `¡Cupón aplicado! ${cupon.porcentaje || 0}% de descuento` };
        }
        return { exito: false, mensaje: "Cupón inválido o expirado" };
    }
    
    vaciar() {
        this.#items = [];
        this.#descuentoAplicado = 0;
        this.#envioGratis = false;
    }
}

// Instancia global del carrito
const carrito = new Carrito();

// ============================================
// 3. FUNCIONES - FLECHA, RECURSIVAS, CRECIENTES
// ============================================

// FUNCIÓN FLECHA - Filtrar productos
const filtrarProductos = (lista, filtros) => {
    return lista.filter(producto => {
        // Filtro por categoría
        if (filtros.categoria && filtros.categoria !== "todos" && filtros.categoria !== "ofertas") {
            if (producto.categoria !== filtros.categoria) return false;
        }
        
        // Filtro ofertas
        if (filtros.categoria === "ofertas" && producto.discount === 0) return false;
        
        // Filtro por precio máximo
        if (filtros.precioMax && producto.getPrecioFinal() > filtros.precioMax) return false;
        
        // Filtro por talla
        if (filtros.talla && !producto.tallas.includes(filtros.talla)) return false;
        
        // Filtro por color
        if (filtros.color && !producto.colores.includes(filtros.color)) return false;
        
        // Filtro por búsqueda
        if (filtros.busqueda) {
            const termino = filtros.busqueda.toLowerCase();
            const coincide = producto.nombre.toLowerCase().includes(termino) ||
                           producto.descripcion.toLowerCase().includes(termino) ||
                           producto.categoria.toLowerCase().includes(termino);
            if (!coincide) return false;
        }
        
        return true;
    });
};

// FUNCIÓN FLECHA - Ordenar productos
const ordenarProductos = (lista, criterio) => {
    const copia = [...lista];
    
    switch(criterio) {
        case "price-low":
            return copia.sort((a, b) => a.getPrecioFinal() - b.getPrecioFinal());
        case "price-high":
            return copia.sort((a, b) => b.getPrecioFinal() - a.getPrecioFinal());
        case "name":
            return copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
        case "rating":
            return copia.sort((a, b) => b.rating - a.rating);
        default:
            return copia;
    }
};

// FUNCIÓN RECURSIVA - Calcular factorial (para descuentos acumulados)
const factorial = (n) => {
    // Caso base
    if (n <= 1) return 1;
    // Caso recursivo
    return n * factorial(n - 1);
};

// FUNCIÓN RECURSIVA - Buscar en estructura anidada
const buscarEnCategoria = (categorias, id, nivel = 0) => {
    for (let cat of categorias) {
        if (cat.id === id) {
            return { encontrado: true, nivel: nivel, categoria: cat };
        }
        if (cat.subcategorias && cat.subcategorias.length > 0) {
            const resultado = buscarEnCategoria(cat.subcategorias, id, nivel + 1);
            if (resultado.encontrado) return resultado;
        }
    }
    return { encontrado: false, nivel: -1, categoria: null };
};

// FUNCIÓN RECURSIVA - Cuenta regresiva
const cuentaRegresiva = (segundos, callback) => {
    if (segundos < 0) {
        callback("¡Tiempo terminado!");
        return;
    }
    callback(segundos);
    setTimeout(() => cuentaRegresiva(segundos - 1, callback), 1000);
};

// FUNCIÓN CRECIENTE (Closure) - Generador de IDs únicos
const crearGeneradorId = () => {
    let contador = 1000;
    return () => {
        contador++;
        return `ORD-${contador}`;
    };
};
const generarIdOrden = crearGeneradorId();

// FUNCIÓN CRECIENTE (Closure) - Contador de visitas
const crearContadorVisitas = () => {
    let visitas = 0;
    return {
        incrementar: () => ++visitas,
        obtener: () => visitas,
        resetear: () => visitas = 0
    };
};
const contadorVisitas = crearContadorVisitas();

// FUNCIÓN CRECIENTE - Acumulador de puntos
const crearAcumuladorPuntos = () => {
    let puntos = 0;
    return (compra) => {
        // 1 punto por cada 10 soles de compra
        const puntosGanados = Math.floor(compra / 10);
        puntos += puntosGanados;
        return { puntosGanados, puntosTotal: puntos };
    };
};
const acumularPuntos = crearAcumuladorPuntos();

// ============================================
// 2. ESTRUCTURAS DE CONTROL
// ============================================

// Función con IF-ELSE y SWITCH
function procesarPago(metodoPago, total) {
    let mensaje = "";
    let descuentoAdicional = 0;
    
    // IF - ELSE IF - ELSE
    if (total >= 500) {
        descuentoAdicional = 10;
        mensaje = "¡Compra premium! 10% de descuento adicional";
    } else if (total >= 300) {
        descuentoAdicional = 5;
        mensaje = "¡Buena compra! 5% de descuento adicional";
    } else if (total >= 100) {
        mensaje = "Gracias por tu compra";
    } else {
        mensaje = "Agrega más productos para obtener descuentos";
    }
    
    // SWITCH
    switch(metodoPago) {
        case "tarjeta":
            mensaje += " - Pago con tarjeta (sin recargo)";
            break;
        case "efectivo":
            mensaje += " - Pago en efectivo (5% descuento extra)";
            descuentoAdicional += 5;
            break;
        case "transferencia":
            mensaje += " - Pago por transferencia";
            break;
        case "paypal":
            mensaje += " - Pago con PayPal (2% recargo)";
            descuentoAdicional -= 2;
            break;
        default:
            mensaje += " - Método de pago no reconocido";
    }
    
    return { mensaje, descuentoAdicional };
}

// Función con FOR, WHILE, DO-WHILE
function analizarInventario(productos) {
    let stockBajo = [];
    let stockTotal = 0;
    let i = 0;
    
    // FOR tradicional
    for (let j = 0; j < productos.length; j++) {
        stockTotal += productos[j].stock;
    }
    
    // FOR...OF
    for (const producto of productos) {
        if (producto.stock < 10) {
            stockBajo.push(producto.nombre);
        }
    }
    
    // WHILE
    while (i < productos.length && stockBajo.length < 5) {
        if (productos[i].discount > 20) {
            console.log(`Producto en oferta: ${productos[i].nombre}`);
        }
        i++;
    }
    
    // DO...WHILE
    let intentos = 0;
    do {
        intentos++;
        console.log(`Verificando inventario... intento ${intentos}`);
    } while (intentos < 1);
    
    return {
        totalProductos: productos.length,
        stockTotal: stockTotal,
        productosStockBajo: stockBajo,
        promedioStock: Math.round(stockTotal / productos.length)
    };
}

// ============================================
// 8. MANIPULACIÓN DEL DOM
// ============================================

// Referencias al DOM
const productsGrid = document.getElementById("productsGrid");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const productModal = document.getElementById("productModal");
const loader = document.getElementById("loader");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const scrollTopBtn = document.getElementById("scrollTop");
const searchInput = document.getElementById("searchInput");

// Estado de filtros actual
let filtrosActuales = {
    categoria: "todos",
    precioMax: 500,
    talla: null,
    color: null,
    busqueda: ""
};

let ordenActual = "default";

// Función para renderizar productos
const renderizarProductos = (listaProductos) => {
    productsGrid.innerHTML = "";
    
    if (listaProductos.length === 0) {
        document.getElementById("noResults").style.display = "block";
        return;
    }
    
    document.getElementById("noResults").style.display = "none";
    
    // Usar map y forEach
    listaProductos.map(producto => crearCardProducto(producto))
                  .forEach(card => productsGrid.appendChild(card));
};

// Crear card de producto
const crearCardProducto = (producto) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("data-id", producto.id);
    
    // Badge
    let badgeHTML = "";
    if (producto.isNew) {
        badgeHTML = `<span class="product-badge new">Nuevo</span>`;
    } else if (producto.discount > 0) {
        badgeHTML = `<span class="product-badge sale">-${producto.discount}%</span>`;
    }
    
    // Precio
    const precioFinal = producto.getPrecioFinal();
    const precioHTML = producto.discount > 0 
        ? `<span class="current-price">${formatPrice(precioFinal)}</span>
           <span class="original-price">${formatPrice(producto.precio)}</span>`
        : `<span class="current-price">${formatPrice(precioFinal)}</span>`;
    
    card.innerHTML = `
        ${badgeHTML}
        <div class="product-image">
            <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
            <div class="quick-actions">
                <button class="quick-btn btn-view" title="Ver detalle">👁️</button>
                <button class="quick-btn btn-favorite" title="Favorito">❤️</button>
            </div>
        </div>
        <div class="product-info">
            <span class="product-category">${producto.categoria}</span>
            <h3 class="product-name">${producto.nombre}</h3>
            <div class="product-rating">${producto.getRatingStars()}</div>
            <div class="product-price">${precioHTML}</div>
            <button class="btn-add-cart">🛒 Agregar al carrito</button>
        </div>
    `;
    
    return card;
};

// Actualizar contador del carrito
const actualizarContadorCarrito = () => {
    const total = carrito.totalItems;
    cartCount.textContent = total;
    cartCount.style.animation = "none";
    setTimeout(() => cartCount.style.animation = "pulse 0.3s ease", 10);
};

// Mostrar toast notification
const mostrarToast = (mensaje, tipo = "success") => {
    toastMessage.textContent = mensaje;
    toast.style.background = tipo === "success" ? "#27ae60" : "#e74c3c";
    toast.classList.add("show");
    
    setTimeout(() => toast.classList.remove("show"), 3000);
};

// Renderizar carrito
const renderizarCarrito = () => {
    const cartItems = document.getElementById("cartItems");
    const cartEmpty = document.getElementById("cartEmpty");
    const cartSummary = document.getElementById("cartSummary");
    
    const items = carrito.items;
    
    if (items.length === 0) {
        cartItems.style.display = "none";
        cartEmpty.style.display = "block";
        cartSummary.style.display = "none";
        return;
    }
    
    cartItems.style.display = "block";
    cartEmpty.style.display = "none";
    cartSummary.style.display = "block";
    
    cartItems.innerHTML = items.map(item => `
        <div class="cart-item" data-id="${item.producto.id}" data-talla="${item.talla}" data-color="${item.color}">
            <img src="${item.producto.imagen}" alt="${item.producto.nombre}" class="cart-item-image">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.producto.nombre}</h4>
                <p class="cart-item-price">${formatPrice(item.producto.getPrecioFinal())}</p>
                ${item.talla ? `<small>Talla: ${item.talla}</small>` : ""}
                ${item.color ? `<small> | Color: ${item.color}</small>` : ""}
                <div class="cart-item-quantity">
                    <button class="qty-btn btn-decrease">-</button>
                    <span>${item.cantidad}</span>
                    <button class="qty-btn btn-increase">+</button>
                </div>
            </div>
            <button class="cart-item-remove">🗑️</button>
        </div>
    `).join("");
    
    // Actualizar totales
    document.getElementById("subtotal").textContent = formatPrice(carrito.calcularSubtotal());
    document.getElementById("discount").textContent = `- ${formatPrice(carrito.calcularDescuento())}`;
    document.getElementById("shipping").textContent = carrito.calcularEnvio() === 0 
        ? "GRATIS" 
        : formatPrice(carrito.calcularEnvio());
    document.getElementById("total").textContent = formatPrice(carrito.calcularTotal());
};

// Mostrar detalle de producto
const mostrarDetalleProducto = (producto) => {
    const detail = document.getElementById("productDetail");
    
    const tallasHTML = producto.tallas.length > 0 
        ? producto.tallas.map(t => `<button class="size-btn" data-size="${t}">${t}</button>`).join("")
        : "<p>Talla única</p>";
    
    const coloresHTML = producto.colores.length > 0
        ? producto.colores.map(c => `<button class="color-btn" data-color="${c}" style="background:${
            c === "negro" ? "#000" : c === "blanco" ? "#fff" : c === "rojo" ? "#e74c3c" : c === "azul" ? "#3498db" : "#2ecc71"
          }"></button>`).join("")
        : "";
    
    detail.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-detail-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="product-detail-info">
                <span class="product-category">${producto.categoria.toUpperCase()}</span>
                <h2>${producto.nombre}</h2>
                <div class="product-rating">${producto.getRatingStars()} (${producto.rating}/5)</div>
                <p class="product-description">${producto.descripcion}</p>
                <div class="product-price">
                    <span class="current-price">${formatPrice(producto.getPrecioFinal())}</span>
                    ${producto.discount > 0 ? `<span class="original-price">${formatPrice(producto.precio)}</span>` : ""}
                </div>
                ${tallasHTML ? `<div class="detail-section"><h4>Talla:</h4><div class="size-buttons">${tallasHTML}</div></div>` : ""}
                ${coloresHTML ? `<div class="detail-section"><h4>Color:</h4><div class="color-buttons">${coloresHTML}</div></div>` : ""}
                <p class="stock-info">${getStockStatus(producto.stock)} (${producto.stock} unidades)</p>
                <button class="btn-add-cart-detail" data-id="${producto.id}">🛒 Agregar al carrito</button>
            </div>
        </div>
    `;
    
    // Agregar estilos adicionales para el detalle
    const style = document.createElement("style");
    style.textContent = `
        .product-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem; }
        .product-detail-image img { width: 100%; border-radius: 12px; }
        .product-detail-info h2 { color: #2c3e50; margin: 0.5rem 0; }
        .product-description { color: #666; margin: 1rem 0; }
        .detail-section { margin: 1rem 0; }
        .detail-section h4 { margin-bottom: 0.5rem; color: #666; }
        .stock-info { color: #27ae60; margin: 1rem 0; }
        .btn-add-cart-detail { width: 100%; padding: 1rem; background: #e74c3c; color: white; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: bold; cursor: pointer; }
        .btn-add-cart-detail:hover { background: #c0392b; }
        @media(max-width:768px) { .product-detail-grid { grid-template-columns: 1fr; } }
    `;
    detail.appendChild(style);
    
    productModal.classList.add("active");
    selectedProduct = producto;
};

// ============================================
// 8. EVENTOS Y DOM + 9. PROPAGACIÓN DE EVENTOS
// ============================================

// Temporizador para el countdown
const iniciarCountdown = () => {
    // Establecer fecha límite (24 horas desde ahora)
    const fechaLimite = new Date();
    fechaLimite.setHours(fechaLimite.getHours() + 24);
    
    const actualizarTiempo = () => {
        const ahora = new Date();
        const diferencia = fechaLimite - ahora;
        
        if (diferencia <= 0) {
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
            return;
        }
        
        const horas = Math.floor(diferencia / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        document.getElementById("hours").textContent = String(horas).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutos).padStart(2, "0");
        document.getElementById("seconds").textContent = String(segundos).padStart(2, "0");
    };
    
    actualizarTiempo();
    setInterval(actualizarTiempo, 1000); // TEMPORIZADOR
};

// ============================================
// EVENTO DE CARGA (load)
// ============================================
window.addEventListener("load", () => {
    console.log("🚀 Tienda Urban Style cargada");
    
    // Ocultar loader después de cargar
    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1500); // Simular carga
    
    // Iniciar countdown
    iniciarCountdown();
    
    // Renderizar productos iniciales
    renderizarProductos(productos);
    
    // Incrementar contador de visitas
    contadorVisitas.incrementar();
    console.log(`Visitas: ${contadorVisitas.obtener()}`);
    
    // Analizar inventario
    const analisis = analizarInventario(productos);
    console.log("📊 Análisis de inventario:", analisis);
});

// ============================================
// 9. PROPAGACIÓN DE EVENTOS (Bubbling y Capturing)
// ============================================

// EVENT DELEGATION en el grid de productos (Bubbling)
productsGrid.addEventListener("click", (e) => {
    // Encontrar el card más cercano
    const card = e.target.closest(".product-card");
    if (!card) return;
    
    const productId = parseInt(card.getAttribute("data-id"));
    const producto = productos.find(p => p.id === productId);
    
    if (!producto) return;
    
    // Botón agregar al carrito
    if (e.target.classList.contains("btn-add-cart")) {
        e.stopPropagation(); // Detener propagación
        
        const talla = producto.tallas.length > 0 ? producto.tallas[0] : null;
        const color = producto.colores.length > 0 ? producto.colores[0] : null;
        
        carrito.agregarProducto(producto, 1, talla, color);
        actualizarContadorCarrito();
        mostrarToast(`${producto.nombre} agregado al carrito`);
        
        // Demostrar polimorfismo
        console.log("Polimorfismo - getInfo():", producto.getInfo());
    }
    
    // Botón ver detalle
    if (e.target.classList.contains("btn-view")) {
        e.stopPropagation();
        mostrarDetalleProducto(producto);
    }
    
    // Botón favorito
    if (e.target.classList.contains("btn-favorite")) {
        e.stopPropagation();
        e.target.textContent = e.target.textContent === "❤️" ? "💖" : "❤️";
        mostrarToast("Agregado a favoritos", "success");
    }
    
    // Click en imagen - abrir detalle
    if (e.target.closest(".product-image") && !e.target.closest(".quick-actions")) {
        mostrarDetalleProducto(producto);
    }
}, false); // false = bubbling (por defecto)

// Ejemplo de Capturing (fase de captura)
document.addEventListener("click", (e) => {
    // Log de propagación en fase de captura
    if (e.target.closest(".product-card")) {
        console.log("📥 Fase de CAPTURA: click detectado");
    }
}, true); // true = capturing

// ============================================
// EVENTOS DEL CARRITO
// ============================================

// Abrir carrito
document.getElementById("cartIcon").addEventListener("click", () => {
    renderizarCarrito();
    cartModal.classList.add("active");
});

// Cerrar carrito
document.getElementById("closeCart").addEventListener("click", () => {
    cartModal.classList.remove("active");
});

// Continuar comprando
document.getElementById("continueShopping").addEventListener("click", () => {
    cartModal.classList.remove("active");
});

// Event delegation en items del carrito
document.getElementById("cartItems").addEventListener("click", (e) => {
    const cartItem = e.target.closest(".cart-item");
    if (!cartItem) return;
    
    const productId = parseInt(cartItem.getAttribute("data-id"));
    const talla = cartItem.getAttribute("data-talla");
    const color = cartItem.getAttribute("data-color");
    
    const item = carrito.items.find(i => 
        i.producto.id === productId && 
        i.talla === talla && 
        i.color === color
    );
    
    if (!item) return;
    
    // Disminuir cantidad
    if (e.target.classList.contains("btn-decrease")) {
        carrito.actualizarCantidad(productId, talla, color, item.cantidad - 1);
        renderizarCarrito();
        actualizarContadorCarrito();
    }
    
    // Aumentar cantidad
    if (e.target.classList.contains("btn-increase")) {
        carrito.actualizarCantidad(productId, talla, color, item.cantidad + 1);
        renderizarCarrito();
        actualizarContadorCarrito();
    }
    
    // Eliminar item
    if (e.target.classList.contains("cart-item-remove")) {
        carrito.eliminarProducto(productId, talla, color);
        renderizarCarrito();
        actualizarContadorCarrito();
        mostrarToast("Producto eliminado del carrito");
    }
});

// Aplicar cupón
document.getElementById("applyCoupon").addEventListener("click", () => {
    const codigo = document.getElementById("couponInput").value.trim();
    if (!codigo) {
        mostrarToast("Ingresa un código de cupón", "error");
        return;
    }
    
    const resultado = carrito.aplicarCupon(codigo);
    mostrarToast(resultado.mensaje, resultado.exito ? "success" : "error");
    
    if (resultado.exito) {
        renderizarCarrito();
    }
});

// Checkout
document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (carrito.items.length === 0) {
        mostrarToast("Tu carrito está vacío", "error");
        return;
    }
    
    const orderId = generarIdOrden(); // Usar función creciente
    const puntos = acumularPuntos(carrito.calcularTotal()); // Acumulador
    
    alert(`
        🎉 ¡Gracias por tu compra!
        
        Orden: ${orderId}
        Total: ${formatPrice(carrito.calcularTotal())}
        
        Puntos ganados: ${puntos.puntosGanados}
        Puntos acumulados: ${puntos.puntosTotal}
        
        Recibirás un email con los detalles.
    `);
    
    carrito.vaciar();
    renderizarCarrito();
    actualizarContadorCarrito();
    cartModal.classList.remove("active");
});

// ============================================
// EVENTOS DE NAVEGACIÓN (Categorías)
// ============================================

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Actualizar clase active
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        
        // Actualizar filtro de categoría
        filtrosActuales.categoria = link.getAttribute("data-category");
        
        // Aplicar filtros
        let resultado = filtrarProductos(productos, filtrosActuales);
        resultado = ordenarProductos(resultado, ordenActual);
        renderizarProductos(resultado);
    });
});

// ============================================
// EVENTOS DE FILTROS
// ============================================

// Filtro de precio (input range)
document.getElementById("priceRange").addEventListener("input", (e) => {
    const valor = parseInt(e.target.value);
    document.getElementById("maxPrice").textContent = `S/ ${valor}`;
    filtrosActuales.precioMax = valor;
    
    let resultado = filtrarProductos(productos, filtrosActuales);
    resultado = ordenarProductos(resultado, ordenActual);
    renderizarProductos(resultado);
});

// Filtro de tallas
document.getElementById("sizeButtons").addEventListener("click", (e) => {
    if (e.target.classList.contains("size-btn")) {
        // Toggle active
        document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.toggle("active");
        
        filtrosActuales.talla = e.target.classList.contains("active") 
            ? e.target.getAttribute("data-size") 
            : null;
        
        let resultado = filtrarProductos(productos, filtrosActuales);
        resultado = ordenarProductos(resultado, ordenActual);
        renderizarProductos(resultado);
    }
});

// Filtro de colores
document.getElementById("colorButtons").addEventListener("click", (e) => {
    if (e.target.classList.contains("color-btn")) {
        document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.toggle("active");
        
        filtrosActuales.color = e.target.classList.contains("active")
            ? e.target.getAttribute("data-color")
            : null;
        
        let resultado = filtrarProductos(productos, filtrosActuales);
        resultado = ordenarProductos(resultado, ordenActual);
        renderizarProductos(resultado);
    }
});

// Limpiar filtros
document.getElementById("clearFilters").addEventListener("click", () => {
    filtrosActuales = { categoria: "todos", precioMax: 500, talla: null, color: null, busqueda: "" };
    ordenActual = "default";
    
    document.getElementById("priceRange").value = 500;
    document.getElementById("maxPrice").textContent = "S/ 500";
    document.getElementById("sortSelect").value = "default";
    document.querySelectorAll(".size-btn, .color-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    document.querySelector('[data-category="todos"]').classList.add("active");
    searchInput.value = "";
    
    renderizarProductos(productos);
    mostrarToast("Filtros limpiados");
});

// Ordenar productos
document.getElementById("sortSelect").addEventListener("change", (e) => {
    ordenActual = e.target.value;
    
    let resultado = filtrarProductos(productos, filtrosActuales);
    resultado = ordenarProductos(resultado, ordenActual);
    renderizarProductos(resultado);
});

// Reset search
document.getElementById("resetSearch").addEventListener("click", () => {
    filtrosActuales.busqueda = "";
    searchInput.value = "";
    renderizarProductos(productos);
});

// ============================================
// EVENTO DE TECLADO (keydown, keyup)
// ============================================

// Búsqueda con Enter
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const termino = searchInput.value.trim();
        filtrosActuales.busqueda = termino;
        
        let resultado = filtrarProductos(productos, filtrosActuales);
        resultado = ordenarProductos(resultado, ordenActual);
        renderizarProductos(resultado);
        
        if (termino) {
            mostrarToast(`Buscando: "${termino}"`);
        }
    }
    
    // Cerrar modales con Escape
    if (e.key === "Escape") {
        cartModal.classList.remove("active");
        productModal.classList.remove("active");
    }
});

// Búsqueda en tiempo real (debounce)
let timeoutBusqueda;
searchInput.addEventListener("input", (e) => {
    clearTimeout(timeoutBusqueda);
    timeoutBusqueda = setTimeout(() => {
        filtrosActuales.busqueda = e.target.value.trim();
        let resultado = filtrarProductos(productos, filtrosActuales);
        resultado = ordenarProductos(resultado, ordenActual);
        renderizarProductos(resultado);
    }, 300); // Debounce de 300ms
});

// Atajos de teclado globales
document.addEventListener("keydown", (e) => {
    // Ctrl + K = Enfocar búsqueda
    if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Ctrl + B = Abrir carrito
    if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        renderizarCarrito();
        cartModal.classList.add("active");
    }
});

// ============================================
// EVENTO DE FOCO (focus, blur)
// ============================================

searchInput.addEventListener("focus", (e) => {
    e.target.parentElement.style.boxShadow = "0 0 0 3px rgba(231, 76, 60, 0.3)";
    console.log("🔍 Campo de búsqueda enfocado");
});

searchInput.addEventListener("blur", (e) => {
    e.target.parentElement.style.boxShadow = "none";
});

// Focus en inputs del formulario de cupón
document.getElementById("couponInput").addEventListener("focus", (e) => {
    e.target.style.borderColor = "#e74c3c";
});

document.getElementById("couponInput").addEventListener("blur", (e) => {
    e.target.style.borderColor = "#f5f5f5";
});

// ============================================
// EVENTO DE SCROLL (scroll)
// ============================================

window.addEventListener("scroll", () => {
    // Mostrar/ocultar botón scroll to top
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
    
    // Efecto parallax en el banner (opcional)
    const banner = document.getElementById("promoBanner");
    if (banner) {
        const scrolled = window.scrollY;
        banner.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Scroll to top
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================================
// EVENTOS DE MODALES
// ============================================

// Cerrar modal de producto
document.getElementById("closeProduct").addEventListener("click", () => {
    productModal.classList.remove("active");
    selectedProduct = null;
});

// Cerrar modal al hacer click fuera
cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove("active");
    }
});

productModal.addEventListener("click", (e) => {
    if (e.target === productModal) {
        productModal.classList.remove("active");
        selectedProduct = null;
    }
});

// Event delegation para el modal de producto
document.getElementById("productDetail").addEventListener("click", (e) => {
    // Selección de talla
    if (e.target.classList.contains("size-btn")) {
        document.querySelectorAll("#productDetail .size-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
    }
    
    // Selección de color
    if (e.target.classList.contains("color-btn")) {
        document.querySelectorAll("#productDetail .color-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
    }
    
    // Agregar al carrito desde el detalle
    if (e.target.classList.contains("btn-add-cart-detail") && selectedProduct) {
        const tallaBtn = document.querySelector("#productDetail .size-btn.active");
        const colorBtn = document.querySelector("#productDetail .color-btn.active");
        
        const talla = tallaBtn ? tallaBtn.getAttribute("data-size") : 
                      (selectedProduct.tallas.length > 0 ? selectedProduct.tallas[0] : null);
        const color = colorBtn ? colorBtn.getAttribute("data-color") :
                      (selectedProduct.colores.length > 0 ? selectedProduct.colores[0] : null);
        
        carrito.agregarProducto(selectedProduct, 1, talla, color);
        actualizarContadorCarrito();
        mostrarToast(`${selectedProduct.nombre} agregado al carrito`);
        productModal.classList.remove("active");
    }
});

// ============================================
// NEWSLETTER (submit)
// ============================================

document.getElementById("newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletterEmail").value;
    
    if (email) {
        mostrarToast(`¡Gracias! Te enviaremos ofertas a ${email}`);
        document.getElementById("newsletterEmail").value = "";
    }
});

// ============================================
// BÚSQUEDA CON BOTÓN
// ============================================

document.getElementById("searchBtn").addEventListener("click", () => {
    const termino = searchInput.value.trim();
    filtrosActuales.busqueda = termino;
    
    let resultado = filtrarProductos(productos, filtrosActuales);
    resultado = ordenarProductos(resultado, ordenActual);
    renderizarProductos(resultado);
    
    if (termino) {
        mostrarToast(`Resultados para: "${termino}"`);
    }
});

// ============================================
// DEMOSTRACIÓN DE CONCEPTOS ADICIONALES
// ============================================

// Demostrar uso de Map
console.log("📦 Cupones disponibles:");
cupones.forEach((valor, clave) => {
    console.log(`  - ${clave}: ${valor.porcentaje || 0}% ${valor.activo ? '✅' : '❌'}`);
});

// Demostrar uso de factorial (función recursiva)
console.log(`📊 Factorial de 5: ${factorial(5)}`);

// Demostrar función creciente
console.log(`🆔 IDs de orden generados: ${generarIdOrden()}, ${generarIdOrden()}, ${generarIdOrden()}`);

// Demostrar procesamiento de pago (if-else, switch)
const resultadoPago = procesarPago("efectivo", 350);
console.log("💳 Resultado de pago:", resultadoPago);

// Log final
console.log(`
============================================
🛒 URBAN STYLE - Tienda cargada correctamente
============================================
📦 Productos: ${productos.length}
🏷️ Categorías: ${categorias.size}
🎟️ Cupones: ${cupones.size}
============================================
Atajos de teclado:
  - Ctrl + K: Enfocar búsqueda
  - Ctrl + B: Abrir carrito
  - Escape: Cerrar modales
============================================
Cupones de prueba:
  - DESCUENTO10 (10% off)
  - DESCUENTO20 (20% off)
  - ENVIOGRATIS (envío gratis)
============================================
`);