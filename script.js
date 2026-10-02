/**
 * ZONA ARCANA - JAVASCRIPT PRINCIPAL
 * Este archivo contiene toda la lógica de interacción de la página web.
 * Se divide en:
 * 1. Animaciones visuales.
 * 2. Carga dinámica de productos desde Cloudflare D1.
 * 3. Lógica del Carrito y envío a WhatsApp.
 * 4. Lógica del Panel de Administración.
 */

﻿// ==========================================
// 2. CONEXIÓN HÍBRIDA CON D1 Y FILTROS ORIGINALES
// ==========================================

let allProducts = [];

if (window.location.href.includes('productos.html')) {
    loadProductsAndApplyStatus();
}

async function loadProductsAndApplyStatus() {
    try {
        const res = await fetch('https://arcana-backend.joelmisaelleija19.workers.dev/api/productos');
        if (!res.ok) throw new Error('Error en la API');
        allProducts = await res.json();
        
        const staticCards = document.querySelectorAll('.game-card');
        staticCards.forEach(card => {
            const titleElement = card.querySelector('h3');
            if(titleElement) {
                const titleText = titleElement.innerText.toLowerCase();
                const matchingProd = allProducts.find(p => titleText.includes(p.name.toLowerCase()));
                if(matchingProd && matchingProd.is_active == 0) {
                    const img = card.querySelector('img');
                    if(img) img.classList.add('sold-out-img');
                    
                    const info = card.querySelector('.game-info');
                    if(info) {
                        const existingPrice = info.querySelector('h4');
                        if(existingPrice) existingPrice.style.display = 'none';
                        
                        const agotadoTag = document.createElement('h4');
                        agotadoTag.className = 'sold-out-text';
                        agotadoTag.innerText = 'AGOTADO';
                        info.appendChild(agotadoTag);
                    }
                }
            }
        });
    } catch (e) {
        console.error('Error al conectar con D1', e);
    }
}

function filterStreaming(categoria, botonClickeado) {
    let botones = document.querySelectorAll('.filter-btn');
    botones.forEach(btn => btn.classList.remove('active'));

    if(botonClickeado) botonClickeado.classList.add('active');

    let cartas = document.querySelectorAll('.streaming-item');
    cartas.forEach(carta => {
        if (categoria === 'todas') {
            carta.style.display = 'block'; 
        } else if (carta.classList.contains(categoria)) {
            carta.style.display = 'block'; 
        } else {
            carta.style.display = 'none'; 
        }
    });
}
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
        const catClass = prod.category ? prod.category.toLowerCase() : 'otra';

        // Si el producto tiene variantes (diferentes precios/tiempos), creamos UNA TARJETA POR CADA VARIANTE
        if (prod.variants && prod.variants.length > 0) {
            prod.variants.forEach(variant => {
                const card = document.createElement('div');
                card.className = `game-card dynamic-card product-item ${catClass}`;
                
                // Mensaje directo a WhatsApp para este producto específico
                const text = encodeURIComponent(`Hola Zona Arcana, me interesa el producto: ${prod.name} [${variant.name}] por $${variant.price} MXN. ¿Está disponible?`);
                const waLink = `https://wa.me/528442279216?text=${text}`;

                card.innerHTML = `
                    <img src="${prod.image_url}" alt="${prod.name}" class="${isSoldOut ? 'sold-out-img' : ''}">
                    <div class="game-info">
                        <h3>${prod.name} <br><span style="font-size: 1rem; color: var(--light-text);">${variant.name}</span></h3>
                        <p>${prod.description}</p>
                        <h4 style="color: var(--neon-pink); margin: 10px 0;">$${variant.price} MXN</h4>
                        ${isSoldOut ? '<h4 class="sold-out-text">AGOTADO</h4>' : `<a href="${waLink}" target="_blank" class="cart-add-btn" style="display:block; text-align:center; text-decoration:none;">Pedir por WhatsApp</a>`}
                    </div>
                `;
                container.appendChild(card);
            });
        } else {
            // Si no tiene variantes, creamos una sola tarjeta
            const card = document.createElement('div');
            card.className = `game-card dynamic-card product-item ${catClass}`;
            
            const text = encodeURIComponent(`Hola Zona Arcana, me interesa el producto: ${prod.name}. ¿Está disponible?`);
            const waLink = `https://wa.me/528442279216?text=${text}`;

            card.innerHTML = `
                <img src="${prod.image_url}" alt="${prod.name}" class="${isSoldOut ? 'sold-out-img' : ''}">
                <div class="game-info">
                    <h3>${prod.name}</h3>
                    <p>${prod.description}</p>
                    ${isSoldOut ? '<h4 class="sold-out-text">AGOTADO</h4>' : `<a href="${waLink}" target="_blank" class="cart-add-btn" style="display:block; text-align:center; text-decoration:none;">Pedir por WhatsApp</a>`}
                </div>
            `;
            container.appendChild(card);
        }
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
