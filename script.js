/**
 * ZONA ARCANA - JAVASCRIPT PRINCIPAL
 * Este archivo contiene toda la lógica de interacción de la página web.
 * Se divide en:
 * 1. Animaciones visuales.
 * 2. Carga dinámica de productos desde Cloudflare D1.
 * 3. Lógica del Carrito y envío a WhatsApp.
 * 4. Lógica del Panel de Administración.
 */

// ==========================================
// 1. ANIMACIONES Y EFECTOS VISUALES
// ==========================================

// Quitar la pantalla de carga (Loader) al terminar de abrir la web
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if(loader) {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }
});

// Desplazamiento suave (Smooth Scroll) cuando presionas los links del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animación para que los elementos aparezcan "flotando" cuando scrolleas hacia abajo
const scrollElements = document.querySelectorAll('.feature-card, section:not(#games) .game-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

scrollElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ==========================================
// 2. CATÁLOGO DINÁMICO (PRODUCTOS)
// ==========================================

let allProducts = [];

// Detecta si estás en la página de productos para descargarlos de la Base de Datos
if (document.getElementById('dynamic-products')) {
    loadProducts();
}

// Función que se conecta a Cloudflare D1 y descarga los productos
async function loadProducts() {
    try {
        const res = await fetch("https://arcana-backend.joelmisaelleija19.workers.dev/api/productos");
        if (!res.ok) throw new Error("Error en la API");
        allProducts = await res.json();
    } catch (e) {
        console.error("Error al cargar productos", e);
    }
    renderProducts();
}

// Función que dibuja las tarjetas HTML basándose en los productos descargados
function renderProducts() {
    const container = document.getElementById('dynamic-products');
    if (!container) return;
    container.innerHTML = '';

    allProducts.forEach(prod => {
        const isSoldOut = prod.is_active == 0;
        
        // Crea el menú de opciones (Ej: 1 Mes, Anual, etc.)
        let variantsHTML = '';
        if(prod.variants && prod.variants.length > 0) {
            variantsHTML = '<select class="variant-select" id="var-'+prod.id+'">';
            prod.variants.forEach((v, index) => {
                variantsHTML += `<option value="${index}">${v.name} - $${v.price} MXN</option>`;
            });
            variantsHTML += '</select>';
        }

        const card = document.createElement('div');
        // Aseguramos de agregar la categoría (en minúsculas) como clase para poder filtrarla
        const catClass = prod.category ? prod.category.toLowerCase() : 'otra';
        card.className = `game-card dynamic-card product-item ${catClass}`;
        card.innerHTML = `
            <img src="${prod.image_url}" alt="${prod.name}" class="${isSoldOut ? 'sold-out-img' : ''}">
            <div class="game-info">
                <h3>${prod.name}</h3>
                <p>${prod.description}</p>
                ${isSoldOut ? '<h4 class="sold-out-text">AGOTADO</h4>' : variantsHTML}
                ${!isSoldOut ? `<button class="cart-add-btn" onclick="addToCart(${prod.id})">Añadir al Carrito</button>` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

// Función para filtrar los productos por categoría
function filterCatalog(categoria, botonClickeado) {
    // 1. Quitar estado activo a todos los botones
    document.querySelectorAll('.filter-container .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // 2. Poner estado activo al botón presionado
    botonClickeado.classList.add('active');

    // 3. Mostrar/Ocultar tarjetas
    const cards = document.querySelectorAll('.product-item');
    cards.forEach(card => {
        if (categoria === 'todas') {
            card.style.display = 'block';
        } else if (card.classList.contains(categoria)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==========================================
// 3. CARRITO DE COMPRAS Y WHATSAPP
// ==========================================

let cart = [];

// Función para añadir al carrito
function addToCart(productId) {
    const prod = allProducts.find(p => p.id === productId);
    const select = document.getElementById('var-'+productId);
    const variantIndex = select ? select.value : 0;
    const variant = prod.variants[variantIndex];

    cart.push({ id: prod.id, name: prod.name, variantName: variant.name, price: variant.price });
    updateCartUI();
    
    // Efecto visual de rebote en el botón del carrito
    const btnFixed = document.querySelector('.cart-btn-fixed');
    if(btnFixed) {
        btnFixed.style.transform = 'scale(1.2)';
        setTimeout(() => btnFixed.style.transform = 'scale(1)', 200);
    }
}

// Actualiza los números y la lista visible dentro del carrito
function updateCartUI() {
    const count = document.getElementById('cart-count');
    if(count) count.innerText = cart.length;

    const itemsContainer = document.getElementById('cart-items');
    if(!itemsContainer) return;

    itemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        itemsContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (${item.variantName})</span>
                <span>$${item.price} <i class="fas fa-trash cart-delete-icon" onclick="removeFromCart(${index})"></i></span>
            </div>
        `;
    });
    document.getElementById('cart-total').innerText = total;
}

// Botón rojo del basurero para eliminar del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Abre/Cierra la ventana del carrito
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    const overlay = document.getElementById('cart-overlay');
    if(modal) {
        modal.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// Envía toda la información recopilada en un mensaje ordenado a WhatsApp
function sendWhatsApp() {
    if(cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }
    
    let text = "Hola Zona Arcana, me interesa hacer el siguiente pedido:%0A%0A";
    let total = 0;
    cart.forEach(item => {
        text += `- ${item.name} [${item.variantName}] : $${item.price} MXN%0A`;
        total += item.price;
    });
    text += `%0ATotal a pagar: $${total} MXN%0A%0A¿Están disponibles?`;
    
    window.open(`https://wa.me/528442279216?text=${text}`, '_blank');
}

// ==========================================
// 4. PANEL DE ADMINISTRACIÓN
// ==========================================

let adminProducts = [];

// Función del botón de Ingresar en admin.html
function login() {
    const loginBox = document.getElementById('login-box');
    if(loginBox) {
        loginBox.style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadAdminProducts();
    }
}

// Carga productos exclusivamente para dibujarlos en la tabla de admin
async function loadAdminProducts() {
    try {
        const res = await fetch("https://arcana-backend.joelmisaelleija19.workers.dev/api/productos");
        if(res.ok) adminProducts = await res.json();
    } catch(e) {}
    renderAdminTable();
}

// Dibuja la tabla administrativa con opciones de "Marcar Agotado"
function renderAdminTable() {
    const tbody = document.querySelector('#admin-table tbody');
    if(!tbody) return;
    
    tbody.innerHTML = '';
    adminProducts.forEach(p => {
        const statusText = p.is_active ? 'Disponible' : 'Agotado';
        const btnClass = p.is_active ? 'btn-red' : 'btn-green';
        const btnText = p.is_active ? 'Marcar Agotado' : 'Marcar Disponible';
        
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td class="status-${p.is_active ? 'active' : 'inactive'}">${statusText}</td>
                <td><button class="toggle-btn ${btnClass}" onclick="toggleStatus(${p.id}, ${p.is_active})">${btnText}</button></td>
            </tr>
        `;
    });
}

// Modifica la Base de Datos para establecer un producto como Agotado/Disponible
async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus ? 0 : 1;
    try {
        const res = await fetch("https://arcana-backend.joelmisaelleija19.workers.dev/api/admin/toggle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id, is_active: newStatus })
        });
        if(res.ok) {
            const idx = adminProducts.findIndex(p => p.id === id);
            adminProducts[idx].is_active = newStatus;
            renderAdminTable();
        }
    } catch(e) {
        console.error("Error", e);
    }
}
