// smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// scroll animations
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

/* productos.html - Lógica Híbrida Estática/D1 */
let allProducts = [];

if (window.location.href.includes('productos.html')) {
    loadProductsAndApplyStatus();
}

async function loadProductsAndApplyStatus() {
    try {
        const res = await fetch('https://arcana-backend.joelmisaelleija19.workers.dev/api/productos');
        if (!res.ok) throw new Error('Error en la API');
        allProducts = await res.json();
        
        // Solo las cards de streaming
        const streamingCards = document.querySelectorAll('.streaming-item');
        streamingCards.forEach(card => {
            const titleElement = card.querySelector('h3');
            if(titleElement) {
                const titleText = titleElement.innerText.toLowerCase();
                const matchingProd = allProducts.find(p => titleText.includes(p.name.toLowerCase()));
                
                if(matchingProd && matchingProd.is_active == 0) {
                    const img = card.querySelector('img');
                    if(img) img.classList.add('sold-out-img');
                    
                    const info = card.querySelector('.game-info');
                    if(info) {
                        // Ocultar En stock y Añadir al carrito
                        const stockText = info.querySelector('.stock-status');
                        if (stockText) stockText.style.display = 'none';
                        
                        const addBtn = info.querySelector('.cart-add-btn');
                        if (addBtn) addBtn.style.display = 'none';
                        
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

// Filtro para la sección de Streaming
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
// CARRITO DE COMPRAS
// ==========================================
let cart = [];

function extractPrices(priceText) {
    let options = [];
    if (priceText.includes('|')) {
        let parts = priceText.split('|');
        parts.forEach(part => {
            let match = part.match(/(.*?):\s*\$?(\d+)/);
            if (match) {
                options.push({ name: match[1].trim(), price: parseFloat(match[2]) });
            }
        });
    } else {
        let match = priceText.match(/\$?(\d+)(\.\d+)?/);
        if (match) {
            options.push({ name: "Paquete base", price: parseFloat(match[1]) });
        }
    }
    return options;
}

function addToCart(btnElement) {
    const card = btnElement.closest('.game-card');
    const title = card.querySelector('h3').innerText;
    const priceElement = card.querySelector('h4[style*="color: var(--neon-pink)"]');
    if(!priceElement) return;
    
    let priceText = priceElement.innerText;
    let options = extractPrices(priceText);
    
    let selectedOption = options[0];
    
    if (options.length > 1) {
        let promptText = "Este producto tiene varias opciones. Elige el número de la opción que deseas:\n";
        options.forEach((opt, idx) => {
            promptText += `${idx + 1}. ${opt.name} - $${opt.price}\n`;
        });
        let choice = window.prompt(promptText, "1");
        if (choice === null) return; // Cancelado
        let index = parseInt(choice) - 1;
        if (index >= 0 && index < options.length) {
            selectedOption = options[index];
        } else {
            alert("Opción inválida.");
            return;
        }
    } else if (options.length === 0) {
        alert("No se pudo leer el precio de este producto.");
        return;
    }
    
    cart.push({
        name: title,
        variant: selectedOption.name,
        price: selectedOption.price
    });
    
    updateCartUI();
    
    // Animación del botón flotante
    const cartFloat = document.getElementById('cart-float');
    if(cartFloat) {
        cartFloat.style.transform = 'scale(1.2)';
        setTimeout(() => cartFloat.style.transform = 'scale(1)', 200);
    }
}

function updateCartUI() {
    const count = document.getElementById('cart-count');
    if(count) count.innerText = cart.length;
    
    const cartFloat = document.getElementById('cart-float');
    if(cartFloat) {
        if(cart.length > 0) {
            cartFloat.style.display = 'flex';
        } else {
            cartFloat.style.display = 'none';
            closeCart(); // Cierra el modal si se vacía
        }
    }

    const itemsContainer = document.getElementById('cart-items');
    if(!itemsContainer) return;

    itemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        let variantText = item.variant === "Paquete base" ? "" : `(${item.variant})`;
        itemsContainer.innerHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;">
                <span style="color: white;">${item.name} <small style="color: gray;">${variantText}</small></span>
                <span><span style="color: var(--neon-pink); margin-right: 10px;">${item.price}</span> <i class="fas fa-trash" style="color: red; cursor:pointer;" onclick="removeFromCart(${index})"></i></span>
            </div>
        `;
    });
    document.getElementById('cart-total').innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function openCart() {
    document.getElementById('cart-modal').style.display = 'flex';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function checkoutWhatsApp() {
    if(cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }
    
    let text = "Hola Zona Arcana, me interesa hacer el siguiente pedido:%0A%0A";
    let total = 0;
    cart.forEach(item => {
        let variantText = item.variant === "Paquete base" ? "" : ` [${item.variant}]`;
        text += `- ${item.name}${variantText} : $${item.price} MXN%0A`;
        total += item.price;
    });
    text += `%0ATotal a pagar: $${total} MXN%0A%0A¿Están disponibles?`;
    
    const phone = "528442279216"; // Número solicitado
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

// ==========================================
// 4. PANEL DE ADMINISTRACIÓN
// ==========================================

let adminProducts = [];

function login() {
    const loginBox = document.getElementById('login-box');
    if(loginBox) {
        loginBox.style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadAdminProducts();
    }
}

async function loadAdminProducts() {
    try {
        const res = await fetch("https://arcana-backend.joelmisaelleija19.workers.dev/api/productos");
        if(res.ok) adminProducts = await res.json();
    } catch(e) {}
    renderAdminTable();
}

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
