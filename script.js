// =========================================================================
// ZONA ARCANA - SCRIPT PRINCIPAL Y SISTEMA DE ADMINISTRACIÓN HUD CYBERPUNK
// =========================================================================

// 1. Smooth scroll behavior
if (typeof document !== 'undefined') {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// 2. Scroll animations
if (typeof document !== 'undefined') {
    const scrollElements = document.querySelectorAll('.feature-card, section:not(#games) .game-card');
    if (scrollElements.length > 0 && typeof IntersectionObserver !== 'undefined') {
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
    }
}

// =========================================================================
// 3. CATÁLOGO BASE Y GESTIÓN DE PRODUCTOS
// =========================================================================
const DEFAULT_PRODUCTS = [
    {
        "id": "paramount-completa",
        "name": "Paramount+ - Completa",
        "category": "Streaming",
        "saleType": "Streaming (Completa)",
        "price": "Precio: $85 MXN",
        "description": "Cuenta completa para todos tus dispositivos.",
        "image": "paramount.png",
        "inStock": true,
        "filterClass": "completa"
    },
    {
        "id": "disney-completa",
        "name": "Disney+ - Completa",
        "category": "Streaming",
        "saleType": "Streaming (Completa)",
        "price": "Precio: $85 MXN",
        "description": "Cuenta completa, perfiles ilimitados.",
        "image": "Disney.jpg",
        "inStock": true,
        "filterClass": "completa"
    },
    {
        "id": "max-platino-completa",
        "name": "Max Platino - Completa",
        "category": "Streaming",
        "saleType": "Streaming (Completa)",
        "price": "Precio: $85 MXN",
        "description": "Cuenta completa con los mejores beneficios de Max.",
        "image": "HBO.png",
        "inStock": true,
        "filterClass": "completa"
    },
    {
        "id": "prime-video-completa",
        "name": "Prime Video - Completa",
        "category": "Streaming",
        "saleType": "Streaming (Completa)",
        "price": "Precio: $85 MXN",
        "description": "Disfruta de la cuenta entera para ti.",
        "image": "Prime.png",
        "inStock": true,
        "filterClass": "completa"
    },
    {
        "id": "crunchyroll-completa",
        "name": "Crunchyroll - Completa",
        "category": "Streaming",
        "saleType": "Streaming (Completa)",
        "price": "Precio: $85 MXN",
        "description": "Anime sin li­mites, cuenta completa.",
        "image": "crunchyroll.jpg",
        "inStock": true,
        "filterClass": "completa"
    },
    {
        "id": "youtube-premium-familiar",
        "name": "YouTube Premium (Familiar)",
        "category": "Streaming",
        "saleType": "Streaming (YouTube Premium Familiar)",
        "price": "Precio: $85 MXN",
        "description": "Cuenta completa familiar.",
        "image": "premiumYT.jpg",
        "inStock": true,
        "filterClass": "completa"
    },
    {
        "id": "iptv-completa",
        "name": "IPTV - Completa",
        "category": "Streaming",
        "saleType": "Streaming (Completa)",
        "price": "Precio: $70 MXN",
        "description": "TelevisiÃ³n, pelÃ­culas y series en vivo.",
        "image": "IPTV.jpg",
        "inStock": true,
        "filterClass": "completa"
    },
    {
        "id": "vix-completa",
        "name": "Vix+ - Completa",
        "category": "Streaming",
        "saleType": "Streaming (Completa)",
        "price": "Precio: $75 x mes",
        "description": "Todo el contenido de Vix sin restricciones.",
        "image": "vix.jpg",
        "inStock": true,
        "filterClass": "completa"
    },
    {
        "id": "vix-anual",
        "name": "Vix+ - Anual",
        "category": "Streaming",
        "saleType": "Streaming (Completa)",
        "price": "Precio: $170 MXN",
        "description": "Suscripcion anual de Vix+ sin restricciones.",
        "image": "vix.jpg",
        "inStock": true,
        "filterClass": "completa"
    },
    {
        "id": "netflix-perfil",
        "name": "Netflix - Perfil",
        "category": "Streaming",
        "saleType": "Streaming (Perfil)",
        "price": "Normal: $85 MXN | QR: $80 MXN",
        "description": "Perfil individual para disfrutar tus series.",
        "image": "netflix.jpg",
        "inStock": true,
        "filterClass": "perfil"
    },
    {
        "id": "paramount-perfil",
        "name": "Paramount+ - Perfil",
        "category": "Streaming",
        "saleType": "Streaming (Perfil)",
        "price": "1M: $70 MXN | 2M: $90 MXN",
        "description": "Perfil individual en cuenta compartida.",
        "image": "paramount.png",
        "inStock": true,
        "filterClass": "perfil"
    },
    {
        "id": "disney-perfil",
        "name": "Disney+ - Perfil",
        "category": "Streaming",
        "saleType": "Streaming (Perfil)",
        "price": "Precio: $70 MXN",
        "description": "Acceso a un perfil de Disney.",
        "image": "Disney.jpg",
        "inStock": true,
        "filterClass": "perfil"
    },
    {
        "id": "max-platino-perfil",
        "name": "Max Platino - Perfil",
        "category": "Streaming",
        "saleType": "Streaming (Perfil)",
        "price": "1M: $70 MXN",
        "description": "Acceso a un perfil de Max Platino.",
        "image": "HBO.png",
        "inStock": true,
        "filterClass": "perfil"
    },
    {
        "id": "prime-video-perfil",
        "name": "Prime Video - Perfil",
        "category": "Streaming",
        "saleType": "Streaming (Perfil)",
        "price": "Precio: $70 MXN",
        "description": "Perfil S/A (Sin Anuncios).",
        "image": "Prime.png",
        "inStock": true,
        "filterClass": "perfil"
    },
    {
        "id": "youtube-premium-perfil",
        "name": "YouTube Premium - Perfil",
        "category": "Streaming",
        "saleType": "Streaming (YouTube Premium Perfil)",
        "price": "Precio: $45 MXN",
        "description": "MembresÃ­a por invitaciÃ³n a tu correo.",
        "image": "premiumYT.jpg",
        "inStock": true,
        "filterClass": "perfil"
    },
    {
        "id": "vix-perfil",
        "name": "Vix+ - Perfil",
        "category": "Streaming",
        "saleType": "Streaming (Perfil)",
        "price": "1M: $45 MXN | 2M: $65 MXN",
        "description": "Perfil individual para novelas y deportes.",
        "image": "vix.jpg",
        "inStock": true,
        "filterClass": "perfil"
    },
    {
        "id": "crunchyroll-perfil",
        "name": "Crunchyroll - Perfil",
        "category": "Streaming",
        "saleType": "Streaming (Perfil)",
        "price": "1M: $70 MXN",
        "description": "Perfil para ver el mejor anime.",
        "image": "crunchyroll.jpg",
        "inStock": true,
        "filterClass": "perfil"
    },
    {
        "id": "universal-perfil",
        "name": "Universal+ - Perfil",
        "category": "Streaming",
        "saleType": "Streaming (Perfil)",
        "price": "Precio: $70 MXN",
        "description": "Perfil individual para contenido Universal.",
        "image": "universal.jpg",
        "inStock": true,
        "filterClass": "perfil"
    },
    {
        "id": "chatgpt-plus-perfil",
        "name": "ChatGPT Plus - Perfil",
        "category": "Streaming",
        "saleType": "Streaming (Perfil)",
        "price": "Precio: $80 MXN",
        "description": "Acceso a ChatGPT Plus (IA Avanzada).",
        "image": "chatgpt.png",
        "inStock": true,
        "filterClass": "perfil"
    },
    {
        "id": "spotify-1-mes",
        "name": "Spotify premium De 1 mes",
        "category": "Spotify premium",
        "saleType": "Spotify premium",
        "price": "Precio: $70.00 MXN",
        "description": "Disfruta de canciones y playlist sin anuncios.",
        "image": "spotify.jpg",
        "inStock": true,
        "filterClass": ""
    },
    {
        "id": "spotify-3-meses",
        "name": "Spotify premium 3 meses",
        "category": "Spotify premium",
        "saleType": "Spotify premium",
        "price": "Precio: $100.00 MXN",
        "description": "Disfruta de canciones y playlist sin anuncios.",
        "image": "Spotify3meses.png",
        "inStock": true,
        "filterClass": ""
    },
    {
        "id": "spotify-familiar",
        "name": "Spotify premium familiar",
        "category": "Spotify premium",
        "saleType": "Spotify premium",
        "price": "Precio: $150.00 MXN",
        "description": "Disfruta de canciones y playlist sin anuncios.",
        "image": "Spotifyfamiliar.jpg",
        "inStock": true,
        "filterClass": ""
    },
    {
        "id": "smartfit-plan-fit",
        "name": "Plan Fit",
        "category": "Smart Fit",
        "saleType": "Smart Fit",
        "price": "Precio: $250.00 MXN",
        "description": "Disfruta del plan fit a un precio accesible.",
        "image": "Fit.jpg",
        "inStock": true,
        "filterClass": ""
    },
    {
        "id": "smartfit-plan-smart",
        "name": "Plan Smart",
        "category": "Smart Fit",
        "saleType": "Smart Fit",
        "price": "Precio: $250.00 MXN",
        "description": "Acceso a tu gimnasio de preferencia y Ã¡rea de peso libre.",
        "image": "Smartfit_plan.jpg",
        "inStock": true,
        "filterClass": ""
    },
    {
        "id": "smartfit-plan-black",
        "name": "Plan Black",
        "category": "Smart Fit",
        "saleType": "Smart Fit",
        "price": "Precio: $300.00 MXN",
        "description": "Acceso a cualquier unidad, sillas de masaje e invitados.",
        "image": "Black.jpg",
        "inStock": true,
        "filterClass": ""
    },
    {
        "id": "seguidores-instagram",
        "name": "Seguidores Instagram",
        "category": "Seguidores de Instagram y Tiktok",
        "saleType": "Seguidores de Instagram y Tiktok",
        "price": "Precio: $90.00 MXN cada 1k",
        "description": "Aumenta tu comunidad en Instagram con perfiles de alta calidad.",
        "image": "Tiktok_Instagram.png",
        "inStock": true,
        "filterClass": ""
    },
    {
        "id": "seguidores-tiktok",
        "name": "Seguidores TikTok",
        "category": "Seguidores de Instagram y Tiktok",
        "saleType": "Seguidores de Instagram y Tiktok",
        "price": "Precio: $90.00 MXN cada 1k",
        "description": "Impulsa tus videos y llega a mÃ¡s audiencia de forma rÃ¡pida.",
        "image": "Tiktok_Instagram.png",
        "inStock": true,
        "filterClass": ""
    },
    {
        "id": "canva-pro",
        "name": "Canva Pro",
        "category": "Canva",
        "saleType": "Canva",
        "price": "Precio: $60.00 MXN",
        "description": "Acceso total a herramientas y recursos premium para tus diseÃ±os.",
        "image": "CanvaPro.jpg",
        "inStock": true,
        "filterClass": ""
    },
    {
        "id": "super-duolingo",
        "name": "Super Duolingo",
        "category": "Duolingo",
        "saleType": "Duolingo",
        "price": "Precio: $50.00 MXN",
        "description": "Aprende idiomas sin anuncios, con vidas ilimitadas y mÃ¡s beneficios.",
        "image": "SuperDuolingo.jpg",
        "inStock": true,
        "filterClass": ""
    },
    {
        "id": "recargas-telefonicas",
        "name": "Recargas TelefÃ³nicas / fuera de servicio",
        "category": "Recargas Telcel y Bait",
        "saleType": "Recargas Telcel y Bait",
        "price": "Precio desde los $100.00 MXN",
        "description": "Mantente conectado con saldo y paquetes de datos a excelentes precios ahorrando hasta el 50%.",
        "image": "RecargasTelefono.png",
        "inStock": true,
        "filterClass": ""
    }
];

const ARCANA_IMAGES = [
    { file: "paramount.png", name: "Paramount+" },
    { file: "Disney.jpg", name: "Disney+" },
    { file: "HBO.png", name: "Max / HBO" },
    { file: "Prime.png", name: "Prime Video" },
    { file: "crunchyroll.jpg", name: "Crunchyroll" },
    { file: "netflix.jpg", name: "Netflix" },
    { file: "vix.jpg", name: "Vix+" },
    { file: "premiumYT.jpg", name: "YouTube Premium" },
    { file: "IPTV.jpg", name: "IPTV" },
    { file: "chatgpt.png", name: "ChatGPT Plus" },
    { file: "universal.jpg", name: "Universal+" },
    { file: "spotify.jpg", name: "Spotify (1 mes)" },
    { file: "Spotify3meses.png", name: "Spotify (3 meses)" },
    { file: "Spotifyfamiliar.jpg", name: "Spotify Familiar" },
    { file: "Fit.jpg", name: "Smart Fit (Plan Fit)" },
    { file: "Smartfit_plan.jpg", name: "Smart Fit (Plan Smart)" },
    { file: "Black.jpg", name: "Smart Fit (Plan Black)" },
    { file: "Tiktok_Instagram.png", name: "Seguidores TikTok / Instagram" },
    { file: "CanvaPro.jpg", name: "Canva Pro" },
    { file: "SuperDuolingo.jpg", name: "Super Duolingo" },
    { file: "RecargasTelefono.png", name: "Recargas Telefónicas" },
    { file: "Arcana_Logo.png", name: "Logo Arcana (Predeterminado)" }
];

const DEFAULT_WHATSAPP_CONFIG = {
    phone: "528442279216",
    template: "Hola Zona Arcana, me interesa hacer el siguiente pedido:\n\n{productos}\n\nTotal a pagar: ${total} MXN\n\n¿Están disponibles?"
};

function getWhatsAppConfig() {
    try {
        if (typeof localStorage === 'undefined') return DEFAULT_WHATSAPP_CONFIG;
        const saved = localStorage.getItem('arcana_whatsapp_config');
        if (saved) return JSON.parse(saved);
    } catch(e) {}
    return DEFAULT_WHATSAPP_CONFIG;
}

function saveWhatsAppConfig(phone, template) {
    if (typeof localStorage === 'undefined') return;
    const config = {
        phone: (phone || "528442279216").trim(),
        template: template || DEFAULT_WHATSAPP_CONFIG.template
    };
    localStorage.setItem('arcana_whatsapp_config', JSON.stringify(config));
    notifyStorefrontUpdate();
}

// Obtiene los overrides guardados por el admin
function getProductOverrides() {
    try {
        if (typeof localStorage === 'undefined') return {};
        return JSON.parse(localStorage.getItem('arcana_product_overrides') || '{}');
    } catch(e) {
        return {};
    }
}

// Obtiene las cartas nuevas creadas por el admin
function getCustomCards() {
    try {
        if (typeof localStorage === 'undefined') return [];
        return JSON.parse(localStorage.getItem('arcana_custom_cards') || '[]');
    } catch(e) {
        return [];
    }
}

// Notifica a todas las pestañas de una actualización
function notifyStorefrontUpdate() {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('arcana_version', Date.now().toString());
    }
}

// Combina el catálogo base + overrides + cartas personalizadas (con soporte de papelera)
function getAllCatalogProducts(includeDeleted = true) {
    const overrides = getProductOverrides();
    const customCards = getCustomCards();

    const mergedDefaults = DEFAULT_PRODUCTS.map(p => {
        const custom = overrides[p.id];
        if (custom) {
            return {
                ...p,
                name: custom.name !== undefined ? custom.name : p.name,
                price: custom.price !== undefined ? custom.price : p.price,
                description: custom.description !== undefined ? custom.description : p.description,
                inStock: custom.inStock !== undefined ? custom.inStock : p.inStock,
                image: custom.image !== undefined ? custom.image : p.image,
                isDeleted: !!custom.isDeleted
            };
        }
        return { ...p, isDeleted: false };
    });

    const all = [...mergedDefaults, ...customCards];
    return includeDeleted ? all : all.filter(p => !p.isDeleted);
}

// =========================================================================
// 4. LÓGICA DE TIENDA: productos.html (Sincronización en Tiempo Real)
// =========================================================================
let lastStorefrontStamp = null;

function applyStorefrontCustomizations() {
    if (typeof document === 'undefined') return;

    // Solo actuar si existen cartas en el DOM o estamos en productos
    const cards = document.querySelectorAll('.game-card[data-id]');
    if (cards.length === 0 && !document.querySelector('.streaming-grid') && !document.querySelector('.games')) {
        return;
    }

    const overrides = getProductOverrides();

    // 1. Aplicar modificaciones a cartas estáticas existentes por su ID exacto
    cards.forEach(card => {
        const id = card.getAttribute('data-id');
        const custom = overrides[id];
        
        // Si fue eliminada en el panel, se oculta completamente
        if (custom && custom.isDeleted) {
            card.style.display = 'none';
            return;
        } else {
            // Si estaba oculta por eliminación previa pero fue restaurada
            if (card.style.display === 'none' && !card.classList.contains('streaming-item')) {
                card.style.display = 'block';
            }
        }

        if (custom) {
            if (custom.name !== undefined) {
                const titleEl = card.querySelector('h3');
                if (titleEl && titleEl.innerText !== custom.name) {
                    titleEl.innerText = custom.name;
                }
            }
            if (custom.description !== undefined) {
                const descP = card.querySelector('.game-info > p:not(.stock-status)');
                if (descP && descP.innerText !== custom.description) {
                    descP.innerText = custom.description;
                }
            }
            if (custom.price !== undefined) {
                const priceH4 = card.querySelector('.game-info > h4:not(.sold-out-text)');
                if (priceH4 && priceH4.innerText !== custom.price) {
                    priceH4.innerText = custom.price;
                }
            }
            if (custom.image !== undefined && custom.image) {
                const img = card.querySelector('img');
                if (img && img.getAttribute('src') !== custom.image) {
                    img.src = custom.image;
                }
            }
            if (custom.inStock !== undefined) {
                card.setAttribute('data-stock', custom.inStock ? 'En stock' : 'Agotado');
                updateCardStockUI(card, custom.inStock);
            }
        }
    });

    // 2. Renderizar cartas nuevas creadas por el admin (filtrando las no eliminadas)
    document.querySelectorAll('.custom-admin-card').forEach(c => c.remove());
    document.querySelectorAll('.custom-admin-section').forEach(s => s.remove());

    const customCards = getCustomCards();
    customCards.forEach(cardData => {
        if (!cardData.isDeleted) {
            renderCustomCardInStore(cardData);
        }
    });
}

function updateCardStockUI(card, inStock) {
    const info = card.querySelector('.game-info');
    const img = card.querySelector('img');
    const addBtn = card.querySelector('.cart-add-btn');
    let stockStatus = card.querySelector('.stock-status');

    if (!stockStatus && info) {
        stockStatus = document.createElement('p');
        stockStatus.className = 'stock-status';
        stockStatus.style.cssText = 'font-weight: bold; font-size: 0.9rem; margin-top: 5px;';
        const pDesc = info.querySelector('p');
        if (pDesc) {
            pDesc.after(stockStatus);
        } else {
            info.prepend(stockStatus);
        }
    }

    const prevSoldOut = card.querySelector('.sold-out-text');
    if (prevSoldOut) prevSoldOut.remove();

    if (inStock) {
        if (stockStatus) {
            stockStatus.style.display = 'block';
            stockStatus.style.color = '#00ff80';
            stockStatus.innerText = 'En stock';
        }
        if (img) img.classList.remove('sold-out-img');
        if (addBtn) {
            addBtn.style.display = 'block';
            addBtn.disabled = false;
        }
    } else {
        if (stockStatus) {
            stockStatus.style.display = 'block';
            stockStatus.style.color = '#ff4444';
            stockStatus.innerText = 'Agotado';
        }
        if (img) img.classList.add('sold-out-img');
        if (addBtn) {
            addBtn.style.display = 'none';
        }
        const soldOutTag = document.createElement('h4');
        soldOutTag.className = 'sold-out-text';
        soldOutTag.style.cssText = 'color: #ff4444; margin-top: 10px; font-weight: bold;';
        soldOutTag.innerText = 'AGOTADO';
        if (info) info.appendChild(soldOutTag);
    }
}

function renderCustomCardInStore(cardData) {
    if (typeof document === 'undefined') return;
    let container = null;

    if (cardData.customCategoryTitle && cardData.customCategoryTitle.trim()) {
        const slug = cardData.customCategoryTitle.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
        let customSec = document.getElementById('sec-' + slug);
        if (!customSec) {
            customSec = document.createElement('section');
            customSec.className = 'games custom-admin-section';
            customSec.id = 'sec-' + slug;
            customSec.innerHTML = `
                <h2>${cardData.customCategoryTitle}</h2>
                <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; padding: 0 5%;"></div>
            `;
            const footer = document.querySelector('footer');
            if (footer) {
                footer.parentNode.insertBefore(customSec, footer);
            } else {
                document.body.appendChild(customSec);
            }
        }
        container = customSec.querySelector('div');
    } else {
        const cat = cardData.category || '';
        if (cat.includes('Streaming')) {
            container = document.querySelector('#streaming .streaming-grid');
        } else if (cat.includes('Spotify')) {
            const sec = document.querySelector('section[id*="Spotify"], section[id*="spotify"]');
            if (sec) container = sec.querySelector('div[style*="flex"], .games-container');
        } else if (cat.includes('Smart Fit')) {
            const sec = document.querySelector('#smartfit');
            if (sec) container = sec.querySelector('div[style*="flex"], .games-container');
        } else if (cat.includes('Seguidores')) {
            const sec = document.querySelector('#seguidores');
            if (sec) container = sec.querySelector('div[style*="flex"], .games-container');
        } else if (cat.includes('Canva')) {
            const sec = document.querySelector('#canva');
            if (sec) container = sec.querySelector('div[style*="flex"], .games-container');
        } else if (cat.includes('Duolingo')) {
            const sec = document.querySelector('#duolingo');
            if (sec) container = sec.querySelector('div[style*="flex"], .games-container');
        } else if (cat.includes('Recargas')) {
            const sec = document.querySelector('#recargas');
            if (sec) container = sec.querySelector('div[style*="flex"], .games-container');
        }
    }

    if (!container) {
        container = document.querySelector('.streaming-grid') || document.querySelector('.games div');
    }

    if (!container) return;

    const newCard = document.createElement('div');
    newCard.className = `game-card custom-admin-card ${cardData.filterClass || ''}`;
    newCard.id = 'card-' + cardData.id;
    newCard.setAttribute('data-id', cardData.id);
    newCard.setAttribute('data-category', cardData.category);
    newCard.setAttribute('data-sale-type', cardData.saleType || cardData.category);
    newCard.setAttribute('data-stock', cardData.inStock ? 'En stock' : 'Agotado');

    newCard.innerHTML = `
        <img src="${cardData.image || 'Arcana_Logo.png'}" alt="${cardData.name}" class="${cardData.inStock ? '' : 'sold-out-img'}">
        <div class="game-info">
            <h3>${cardData.name}</h3>
            <p>${cardData.description || ''}</p>
            <p class="stock-status" style="color: ${cardData.inStock ? '#00ff80' : '#ff4444'}; font-weight: bold; font-size: 0.9rem; margin-top: 5px;">${cardData.inStock ? 'En stock' : 'Agotado'}</p>
            <h4 style="color: var(--neon-pink); margin-top: 10px;">${cardData.price}</h4>
            <button class="cart-add-btn" onclick="addToCart(this)" style="margin-top: 10px; width: 100%; padding: 8px; border-radius: 5px; background: transparent; border: 1px solid var(--neon-pink); color: var(--neon-pink); cursor: pointer; ${cardData.inStock ? '' : 'display: none;'}">Añadir al carrito</button>
            ${!cardData.inStock ? '<h4 class="sold-out-text" style="color: #ff4444; margin-top: 10px; font-weight: bold;">AGOTADO</h4>' : ''}
        </div>
    `;

    container.appendChild(newCard);
}

// Inicializador de Sincronización Continua e Inmediata
if (typeof window !== 'undefined') {
    // 1. Ejecutar de inmediato al cargar el script
    applyStorefrontCustomizations();
    
    // 2. Al estar listo el DOM
    document.addEventListener('DOMContentLoaded', applyStorefrontCustomizations);
    window.addEventListener('load', applyStorefrontCustomizations);
    
    // 3. Al dispararse evento storage de otra pestaña
    window.addEventListener('storage', (e) => {
        applyStorefrontCustomizations();
    });

    // 4. Polling ultra-ligero cada 400ms: garantiza sincronización instantánea entre pestañas
    // incluso en navegadores que bloquean eventos storage en rutas locales (file:///)
    setInterval(() => {
        if (typeof localStorage === 'undefined') return;
        const currentStamp = (localStorage.getItem('arcana_version') || '') + 
                             (localStorage.getItem('arcana_product_overrides') || '') + 
                             (localStorage.getItem('arcana_custom_cards') || '');
        if (currentStamp !== lastStorefrontStamp) {
            lastStorefrontStamp = currentStamp;
            applyStorefrontCustomizations();
        }
    }, 400);
}

// Filtro de Streaming
function filterStreaming(categoria, botonClickeado) {
    if (typeof document === 'undefined') return;
    let botones = document.querySelectorAll('.filter-btn');
    botones.forEach(btn => btn.classList.remove('active'));

    if(botonClickeado) botonClickeado.classList.add('active');

    const overrides = getProductOverrides();
    let cartas = document.querySelectorAll('.streaming-item');
    cartas.forEach(carta => {
        const id = carta.getAttribute('data-id');
        if (overrides[id] && overrides[id].isDeleted) {
            carta.style.display = 'none';
            return;
        }
        if (categoria === 'todas') {
            carta.style.display = 'block'; 
        } else if (carta.classList.contains(categoria)) {
            carta.style.display = 'block'; 
        } else {
            carta.style.display = 'none'; 
        }
    });
}

// =========================================================================
// 5. CARRITO DE COMPRAS Y PEDIDO A WHATSAPP
// =========================================================================
let cart = [];

function extractPrices(priceText) {
    let options = [];
    if (priceText.includes('|')) {
        let parts = priceText.split('|');
        parts.forEach(part => {
            let match = part.match(/(.*?):\s*\$?(\d+(?:\.\d+)?)/);
            if (match) {
                options.push({ name: match[1].trim(), price: parseFloat(match[2]) });
            }
        });
    } else {
        let match = priceText.match(/\$?(\d+(?:\.\d+)?)/);
        if (match) {
            options.push({ name: "Paquete base", price: parseFloat(match[1]) });
        }
    }
    return options;
}

function addToCart(btnElement) {
    const card = btnElement.closest('.game-card');
    if (!card) return;
    const titleElement = card.querySelector('h3');
    if (!titleElement) return;
    const title = titleElement.innerText;
    
    const priceElement = card.querySelector('.game-info > h4:not(.sold-out-text)') || card.querySelector('h4[style*="color: var(--neon-pink)"]');
    if(!priceElement) return;
    
    let priceText = priceElement.innerText;
    let options = extractPrices(priceText);
    
    if (options.length > 1) {
        showVariantModal(title, options);
    } else if (options.length === 1) {
        finishAddToCart(title, options[0]);
    } else {
        alert("No se pudo leer el precio de este producto.");
    }
}

function showVariantModal(title, options) {
    const titleEl = document.getElementById('variant-title');
    if (titleEl) titleEl.innerText = title;
    const container = document.getElementById('variant-options');
    if (!container) return;
    container.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = `${opt.name} - ${opt.price} MXN`;
        btn.style.cssText = "padding: 10px; background: transparent; border: 1px solid var(--neon-pink); color: white; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 1rem; transition: 0.3s; text-align: left; display: flex; justify-content: space-between;";
        btn.onmouseover = () => { btn.style.background = "var(--neon-pink)"; btn.style.color = "var(--dark-bg)"; };
        btn.onmouseout = () => { btn.style.background = "transparent"; btn.style.color = "white"; };
        btn.onclick = () => {
            finishAddToCart(title, opt);
            closeVariantModal();
        };
        container.appendChild(btn);
    });
    const modal = document.getElementById("variant-modal");
    if (modal) modal.style.display = "flex";
}

function closeVariantModal() {
    const modal = document.getElementById('variant-modal');
    if (modal) modal.style.display = 'none';
}

function finishAddToCart(title, option) {
    cart.push({
        name: title,
        variant: option.name,
        price: option.price
    });
    updateCartUI();
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
            cartFloat.className = "cart-float-visible";
            cartFloat.style.display = "flex";
        } else {
            cartFloat.className = "cart-float-hidden";
            cartFloat.style.display = "none";
            closeCart();
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
            <div class="cart-item-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
                <span class="cart-item-name">${item.name} <span style="color: var(--neon-blue); font-size: 0.85rem;">${variantText}</span></span>
                <span>
                    <span style="color: var(--neon-pink); font-weight: bold; margin-right: 12px;">$${item.price}</span> 
                    <i class="fas fa-trash cart-item-delete" onclick="removeFromCart(${index})" style="color: #ff4444; cursor: pointer;"></i>
                </span>
            </div>
        `;
    });
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function openCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.style.display = 'flex';
}

function closeCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.style.display = 'none';
}

// Enviar pedido a WhatsApp usando la plantilla y número configurados en Admin
function checkoutWhatsApp() {
    if(cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }
    
    const config = getWhatsAppConfig();
    let productLines = [];
    let total = 0;
    
    cart.forEach(item => {
        let variantText = item.variant === "Paquete base" ? "" : ` [${item.variant}]`;
        productLines.push(`- ${item.name}${variantText} : $${item.price} MXN`);
        total += item.price;
    });

    const productsText = productLines.join("\n");
    let template = config.template || DEFAULT_WHATSAPP_CONFIG.template;

    // Reemplazo de variables
    let finalMsg = template.replace(/{productos}/gi, productsText);
    finalMsg = finalMsg.replace(/{total}/gi, total.toString());

    const phone = (config.phone || "528442279216").replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(finalMsg);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
}

// =========================================================================
// 6. MOTOR DE AUDIO SINTETIZADO CYBERPUNK (Web Audio API)
// =========================================================================
let audioContext = null;
let soundEnabled = true;

function initAudio() {
    if (!audioContext && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) audioContext = new AudioCtx();
    }
}

function playCyberSound(type = 'click') {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (!audioContext) return;
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        const now = audioContext.currentTime;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);

        if (type === 'click') {
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === 'toggle-on') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'toggle-off') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(700, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'delete') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
        } else if (type === 'save') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.setValueAtTime(659.25, now + 0.06);
            osc.frequency.setValueAtTime(783.99, now + 0.12);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        }
    } catch(e) {}
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('audio-toggle-btn');
    if (btn) {
        if (soundEnabled) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-volume-up"></i> Sonido: ON';
            playCyberSound('save');
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="fas fa-volume-mute"></i> Sonido: OFF';
        }
    }
}

// =========================================================================
// 7. PANEL DE ADMINISTRACIÓN CYBERPUNK: admin.html
// =========================================================================

let adminCatalog = [];
let currentFilterCategory = 'todas';
let currentFilterStock = 'todos';
let currentSearchQuery = '';
let currentViewMode = 'grid';

if (typeof window !== 'undefined') {
    if (window.location.pathname.includes('admin.html') || window.location.href.includes('admin.html')) {
        document.addEventListener('DOMContentLoaded', () => {
            currentViewMode = localStorage.getItem('arcana_admin_view_mode') || 'grid';
            checkAdminSession();
        });
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            currentViewMode = localStorage.getItem('arcana_admin_view_mode') || 'grid';
            checkAdminSession();
        }
    }
}

function checkAdminSession() {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('arcana_admin_logged') === 'true') {
        showDashboard();
    }
}

function login() {
    playCyberSound('save');
    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('arcana_admin_logged', 'true');
    }
    showDashboard();
}

function logout() {
    playCyberSound('click');
    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('arcana_admin_logged');
    }
    const loginBox = document.getElementById('login-box');
    const dashboard = document.getElementById('dashboard');
    const logoutBtn = document.getElementById('logout-btn');
    if (loginBox) loginBox.style.display = 'block';
    if (dashboard) dashboard.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
}

function showDashboard() {
    const loginBox = document.getElementById('login-box');
    const dashboard = document.getElementById('dashboard');
    const logoutBtn = document.getElementById('logout-btn');
    if (loginBox) loginBox.style.display = 'none';
    if (dashboard) dashboard.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';

    initAdminImagesSelect();
    setViewMode(currentViewMode, false);
    loadAdminCatalog();
}

function setViewMode(mode, playSound = true) {
    currentViewMode = mode;
    localStorage.setItem('arcana_admin_view_mode', mode);
    if (playSound) playCyberSound('click');

    const btnGrid = document.getElementById('view-btn-grid');
    const btnTable = document.getElementById('view-btn-table');
    const gridContainer = document.getElementById('admin-cards-grid');
    const tableContainer = document.getElementById('admin-table-container');

    if (btnGrid && btnTable && gridContainer && tableContainer) {
        if (mode === 'grid') {
            btnGrid.classList.add('active');
            btnTable.classList.remove('active');
            gridContainer.style.display = 'grid';
            tableContainer.style.display = 'none';
        } else {
            btnTable.classList.add('active');
            btnGrid.classList.remove('active');
            gridContainer.style.display = 'none';
            tableContainer.style.display = 'block';
        }
    }
}

function initAdminImagesSelect() {
    const editSelect = document.getElementById('edit-card-image');
    const addSelect = document.getElementById('add-card-image');
    if (!addSelect) return;

    let optionsHtml = '';
    ARCANA_IMAGES.forEach(img => {
        optionsHtml += `<option value="${img.file}">${img.name} (${img.file})</option>`;
    });

    if (addSelect) addSelect.innerHTML = optionsHtml;
    if (editSelect) editSelect.innerHTML = optionsHtml;
}

function loadAdminCatalog() {
    adminCatalog = getAllCatalogProducts(true);
    renderCategoryChips();
    renderAdminViews();
    updateAdminKPIs();
}

function renderCategoryChips() {
    const chipsContainer = document.getElementById('admin-category-chips');
    if (!chipsContainer) return;

    const activeProducts = adminCatalog.filter(p => !p.isDeleted);
    const deletedCount = adminCatalog.filter(p => p.isDeleted).length;

    const catCounts = {};
    activeProducts.forEach(p => {
        const cat = p.category || p.saleType || 'General';
        catCounts[cat] = (catCounts[cat] || 0) + 1;
    });

    let html = `
        <button class="admin-chip ${currentFilterCategory === 'todas' ? 'active' : ''}" onclick="selectCategoryChip('todas')">
            <i class="fas fa-layer-group"></i> Todas <span class="chip-count">${activeProducts.length}</span>
        </button>
    `;

    Object.keys(catCounts).forEach(cat => {
        html += `
            <button class="admin-chip ${currentFilterCategory === cat ? 'active' : ''}" onclick="selectCategoryChip('${cat}')">
                ${cat} <span class="chip-count">${catCounts[cat]}</span>
            </button>
        `;
    });

    html += `
        <button class="admin-chip ${currentFilterCategory === 'papelera' ? 'active' : ''}" style="${deletedCount > 0 ? 'border-color: #ff4444; color: #ff8888;' : 'opacity: 0.6;'}" onclick="selectCategoryChip('papelera')">
            <i class="fas fa-trash-alt"></i> Papelera <span class="chip-count" style="background: rgba(255, 68, 68, 0.4); color: white;">${deletedCount}</span>
        </button>
    `;

    chipsContainer.innerHTML = html;
}

function selectCategoryChip(cat) {
    playCyberSound('click');
    currentFilterCategory = cat;
    renderCategoryChips();
    renderAdminViews();
}

function updateAdminKPIs() {
    const totalEl = document.getElementById('kpi-total');
    const inStockEl = document.getElementById('kpi-in-stock');
    const outStockEl = document.getElementById('kpi-out-stock');
    const categoriesEl = document.getElementById('kpi-categories');
    const inStockFill = document.getElementById('kpi-bar-in-stock');
    const outStockFill = document.getElementById('kpi-bar-out-stock');

    if (!totalEl) return;

    const activeList = adminCatalog.filter(p => !p.isDeleted);
    const total = activeList.length;
    const inStock = activeList.filter(p => p.inStock).length;
    const outStock = total - inStock;
    const categories = new Set(activeList.map(p => p.category || p.saleType)).size;

    totalEl.innerText = total;
    inStockEl.innerText = inStock;
    outStockEl.innerText = outStock;
    categoriesEl.innerText = categories;

    if (inStockFill && outStockFill && total > 0) {
        const inPct = Math.round((inStock / total) * 100);
        const outPct = 100 - inPct;
        inStockFill.style.width = inPct + '%';
        outStockFill.style.width = outPct + '%';
    }
}

function filterAdminProducts() {
    const searchInput = document.getElementById('admin-search');
    const stockSelect = document.getElementById('admin-stock-filter');

    currentSearchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
    currentFilterStock = stockSelect ? stockSelect.value : 'todos';

    renderAdminViews();
}

function getFilteredList() {
    return adminCatalog.filter(p => {
        if (currentFilterCategory === 'papelera') {
            if (!p.isDeleted) return false;
        } else {
            if (p.isDeleted) return false;
            const matchesCategory = currentFilterCategory === 'todas' || 
                p.category === currentFilterCategory || 
                p.saleType === currentFilterCategory;
            if (!matchesCategory) return false;
        }

        const matchesSearch = !currentSearchQuery || 
            p.name.toLowerCase().includes(currentSearchQuery) || 
            p.id.toLowerCase().includes(currentSearchQuery) || 
            (p.category && p.category.toLowerCase().includes(currentSearchQuery)) ||
            (p.saleType && p.saleType.toLowerCase().includes(currentSearchQuery)) ||
            (p.price && p.price.toLowerCase().includes(currentSearchQuery));

        const matchesStock = currentFilterStock === 'todos' || 
            (currentFilterStock === 'en-stock' && p.inStock) || 
            (currentFilterStock === 'agotado' && !p.inStock);

        return matchesSearch && matchesStock;
    });
}

function renderAdminViews() {
    const filtered = getFilteredList();
    renderAdminCardsGrid(filtered);
    renderAdminTableRows(filtered);
}

// 8. Renderizado Vista Cuadrícula (Card Grid Cyberpunk)
function renderAdminCardsGrid(filtered) {
    const grid = document.getElementById('admin-cards-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; color: #888; background: rgba(0,0,0,0.3); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1);">
                <i class="fas fa-search" style="font-size: 2.5rem; margin-bottom: 12px; display: block; opacity: 0.4;"></i>
                <h3 style="color: #bbb; margin-bottom: 6px;">No se encontraron productos</h3>
                <p style="font-size: 0.9rem;">Prueba con otros términos de búsqueda o selecciona otra categoría.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(p => {
        const isCustom = p.isCustomCard || !DEFAULT_PRODUCTS.some(dp => dp.id === p.id);
        const stockBorderClass = !p.inStock ? 'out-of-stock-border' : '';
        const cardBox = document.createElement('div');
        cardBox.className = `admin-card-box ${stockBorderClass}`;
        cardBox.id = `grid-card-${p.id}`;

        cardBox.innerHTML = `
            <div>
                <div class="admin-card-topbar">
                    <span class="badge-id">${p.id}</span>
                    <div>
                        <span class="badge-category">${p.category || 'General'}</span>
                        ${isCustom ? '<span class="badge-custom">NUEVA</span>' : ''}
                        ${p.isDeleted ? '<span class="badge-custom" style="border-color:#ff4444; color:#ff4444; background:rgba(255,68,68,0.2);">PAPELERA</span>' : ''}
                    </div>
                </div>

                <div class="admin-card-media">
                    <img src="${p.image || 'Arcana_Logo.png'}" alt="${p.name}" class="${p.inStock ? '' : 'sold-out-img'}">
                    <span class="media-badge" style="background: ${p.inStock ? 'rgba(0, 255, 128, 0.85); color: black;' : 'rgba(255, 68, 68, 0.85); color: white;'}">
                        ${p.inStock ? 'EN STOCK' : 'AGOTADO'}
                    </span>
                </div>

                <div class="admin-card-body">
                    <h3>${p.name}</h3>
                    <div class="admin-card-price">${p.price}</div>
                    <div class="admin-card-desc" title="${p.description}">${p.description || 'Sin descripción'}</div>
                </div>
            </div>

            <div>
                <!-- Interruptor Cyber Switch -->
                <div class="switch-container">
                    <span class="switch-label" style="color: ${p.inStock ? '#00ff80' : '#ff4444'}">
                        <i class="fas ${p.inStock ? 'fa-check-circle' : 'fa-times-circle'}"></i> 
                        ${p.inStock ? 'En Stock' : 'Agotado'}
                    </span>
                    <label class="cyber-toggle" title="Clic para cambiar stock inmediatamente">
                        <input type="checkbox" ${p.inStock ? 'checked' : ''} onchange="toggleProductStock('${p.id}')">
                        <span class="cyber-slider"></span>
                    </label>
                </div>

                <div class="admin-card-actions">
                    ${!p.isDeleted ? `
                        <button class="action-btn edit-btn" onclick="openEditModal('${p.id}')" title="Editar producto">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="action-btn" onclick="openWhatsAppSimulator('${p.id}')" style="background: rgba(37, 211, 102, 0.15); border: 1px solid #25D366; color: #25D366;" title="Probar mensaje de WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                        <button class="action-btn delete-btn" onclick="deleteCard('${p.id}')" title="Eliminar / Ocultar de la tienda">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    ` : `
                        <button class="action-btn" onclick="restoreCard('${p.id}')" style="background: rgba(0, 255, 128, 0.2); border: 1px solid #00ff80; color: #00ff80; width: 100%;" title="Restaurar a la tienda">
                            <i class="fas fa-undo"></i> Restaurar a la tienda
                        </button>
                    `}
                </div>
            </div>
        `;

        grid.appendChild(cardBox);
    });
}

// 9. Renderizado Vista Tabla
function renderAdminTableRows(filtered) {
    const tbody = document.getElementById('admin-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: #888;">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px; display: block; opacity: 0.5;"></i>
                    No se encontraron productos.
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach(p => {
        const isCustom = p.isCustomCard || !DEFAULT_PRODUCTS.some(dp => dp.id === p.id);
        const stockClass = p.inStock ? 'in-stock' : 'out-of-stock';
        const stockIcon = p.inStock ? 'fa-check' : 'fa-times';
        const stockText = p.inStock ? 'En stock' : 'Agotado';

        tbody.innerHTML += `
            <tr id="row-${p.id}">
                <td>
                    <span class="badge-id">${p.id}</span>
                    ${isCustom ? '<span class="badge-custom">NUEVA</span>' : ''}
                    ${p.isDeleted ? '<span class="badge-custom" style="border-color:#ff4444; color:#ff4444;">PAPELERA</span>' : ''}
                </td>
                <td>
                    <div style="display: flex; align-items: center;">
                        <img src="${p.image || 'Arcana_Logo.png'}" class="admin-thumb" alt="${p.name}">
                        <div>
                            <strong style="color: white;">${p.name}</strong>
                            ${p.customCategoryTitle ? `<div style="font-size: 0.75rem; color: #ffd700;">Subtítulo: ${p.customCategoryTitle}</div>` : ''}
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge-category">${p.saleType || p.category || 'General'}</span>
                </td>
                <td>
                    <span style="color: var(--neon-pink); font-weight: bold;">${p.price}</span>
                </td>
                <td style="max-width: 230px;">
                    <span style="color: #bbb; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 0.85rem;" title="${p.description}">
                        ${p.description || '<em style="color:#666;">Sin descripción</em>'}
                    </span>
                </td>
                <td style="text-align: center;">
                    <button class="stock-btn ${stockClass}" onclick="toggleProductStock('${p.id}')" title="Clic para alternar estado de stock">
                        <i class="fas ${stockIcon}"></i> ${stockText}
                    </button>
                </td>
                <td style="text-align: center;">
                    ${!p.isDeleted ? `
                        <button class="action-btn edit-btn" onclick="openEditModal('${p.id}')" title="Editar precio, descripción y datos">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="action-btn" onclick="openWhatsAppSimulator('${p.id}')" style="background: transparent; border: 1px solid #25D366; color: #25D366;" title="Simular WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                        <button class="action-btn delete-btn" onclick="deleteCard('${p.id}')" title="Eliminar / Ocultar">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    ` : `
                        <button class="action-btn" onclick="restoreCard('${p.id}')" style="background: rgba(0, 255, 128, 0.2); border: 1px solid #00ff80; color: #00ff80;" title="Restaurar">
                            <i class="fas fa-undo"></i> Restaurar
                        </button>
                    `}
                </td>
            </tr>
        `;
    });
}

// 10. Modificar "En stock" individual e independientemente
function toggleProductStock(id) {
    const prod = adminCatalog.find(p => p.id === id);
    if (!prod) return;

    prod.inStock = !prod.inStock;
    playCyberSound(prod.inStock ? 'toggle-on' : 'toggle-off');

    const isCustom = prod.isCustomCard || !DEFAULT_PRODUCTS.some(dp => dp.id === id);
    if (isCustom) {
        const customCards = getCustomCards();
        const idx = customCards.findIndex(c => c.id === id);
        if (idx !== -1) {
            customCards[idx].inStock = prod.inStock;
            localStorage.setItem('arcana_custom_cards', JSON.stringify(customCards));
        }
    } else {
        const overrides = getProductOverrides();
        if (!overrides[id]) overrides[id] = {};
        overrides[id].inStock = prod.inStock;
        localStorage.setItem('arcana_product_overrides', JSON.stringify(overrides));
    }

    notifyStorefrontUpdate();
    renderAdminViews();
    updateAdminKPIs();
    showAdminToast(`Stock de "${prod.name}" cambiado a: ${prod.inStock ? 'En stock' : 'Agotado'}`);
}

// 11. Acciones por Lote (Bulk Category Actions)
function bulkSetCategoryStock(inStock) {
    const cat = currentFilterCategory;
    if (cat === 'papelera') {
        alert('No se puede aplicar a la papelera.');
        return;
    }
    const targetProducts = adminCatalog.filter(p => !p.isDeleted && (cat === 'todas' || p.category === cat || p.saleType === cat));
    if (targetProducts.length === 0) return;

    if (!confirm(`¿Deseas marcar ${targetProducts.length} producto(s) como "${inStock ? 'En stock' : 'Agotado'}"?`)) {
        return;
    }

    playCyberSound(inStock ? 'toggle-on' : 'toggle-off');

    const overrides = getProductOverrides();
    const customCards = getCustomCards();

    targetProducts.forEach(prod => {
        prod.inStock = inStock;
        const isCustom = prod.isCustomCard || !DEFAULT_PRODUCTS.some(dp => dp.id === prod.id);
        if (isCustom) {
            const idx = customCards.findIndex(c => c.id === prod.id);
            if (idx !== -1) customCards[idx].inStock = inStock;
        } else {
            if (!overrides[prod.id]) overrides[prod.id] = {};
            overrides[prod.id].inStock = inStock;
        }
    });

    localStorage.setItem('arcana_product_overrides', JSON.stringify(overrides));
    localStorage.setItem('arcana_custom_cards', JSON.stringify(customCards));

    notifyStorefrontUpdate();
    renderAdminViews();
    updateAdminKPIs();
    showAdminToast(`${targetProducts.length} productos marcados como ${inStock ? 'En stock' : 'Agotado'}`);
}

// 12. Modal de Edición con Live Preview
function openEditModal(id) {
    playCyberSound('click');
    const prod = adminCatalog.find(p => p.id === id);
    if (!prod) return;

    document.getElementById('edit-card-id').value = prod.id;
    document.getElementById('edit-id-display').innerText = prod.id;
    document.getElementById('edit-card-name').value = prod.name;
    document.getElementById('edit-card-price').value = prod.price;
    document.getElementById('edit-card-desc').value = prod.description || '';
    document.getElementById('edit-card-stock').value = prod.inStock ? 'true' : 'false';

    const imageSelect = document.getElementById('edit-card-image');
    if (imageSelect) {
        imageSelect.value = prod.image || 'Arcana_Logo.png';
    }

    updateEditLivePreview();
    document.getElementById('edit-modal').style.display = 'flex';
}

function closeEditModal() {
    playCyberSound('click');
    document.getElementById('edit-modal').style.display = 'none';
}

function updateEditLivePreview() {
    const name = document.getElementById('edit-card-name').value || 'Nombre del producto';
    const price = document.getElementById('edit-card-price').value || '$0.00 MXN';
    const desc = document.getElementById('edit-card-desc').value || 'Descripción del producto...';
    const inStock = document.getElementById('edit-card-stock').value === 'true';
    const image = document.getElementById('edit-card-image').value || 'Arcana_Logo.png';

    const previewContainer = document.getElementById('edit-live-preview');
    if (!previewContainer) return;

    previewContainer.innerHTML = `
        <div class="game-card" style="width: 100%; max-width: 240px; margin: 0 auto; box-shadow: 0 0 15px rgba(0, 217, 255, 0.3);">
            <img src="${image}" alt="${name}" class="${inStock ? '' : 'sold-out-img'}" style="width: 100%; height: 140px; object-fit: cover;">
            <div class="game-info" style="padding: 12px;">
                <h3 style="font-size: 1rem;">${name}</h3>
                <p style="font-size: 0.8rem; margin: 4px 0;">${desc}</p>
                <p class="stock-status" style="color: ${inStock ? '#00ff80' : '#ff4444'}; font-weight: bold; font-size: 0.8rem; margin-top: 4px;">${inStock ? 'En stock' : 'Agotado'}</p>
                <h4 style="color: var(--neon-pink); margin-top: 6px; font-size: 0.95rem;">${price}</h4>
                <button class="cart-add-btn" style="margin-top: 8px; width: 100%; padding: 6px; font-size: 0.8rem; ${inStock ? '' : 'display: none;'}">Añadir al carrito</button>
                ${!inStock ? '<h4 style="color: #ff4444; font-size: 0.85rem; margin-top: 6px; font-weight: bold;">AGOTADO</h4>' : ''}
            </div>
        </div>
    `;
}

function saveCardEdit(e) {
    if (e) e.preventDefault();
    playCyberSound('save');

    const id = document.getElementById('edit-card-id').value;
    const name = document.getElementById('edit-card-name').value.trim();
    const price = document.getElementById('edit-card-price').value.trim();
    const desc = document.getElementById('edit-card-desc').value.trim();
    const inStock = document.getElementById('edit-card-stock').value === 'true';
    const image = document.getElementById('edit-card-image').value;

    const prod = adminCatalog.find(p => p.id === id);
    if (!prod) return;

    prod.name = name;
    prod.price = price;
    prod.description = desc;
    prod.inStock = inStock;
    if (image) prod.image = image;

    const isCustom = prod.isCustomCard || !DEFAULT_PRODUCTS.some(dp => dp.id === id);
    if (isCustom) {
        const customCards = getCustomCards();
        const idx = customCards.findIndex(c => c.id === id);
        if (idx !== -1) {
            customCards[idx].name = name;
            customCards[idx].price = price;
            customCards[idx].description = desc;
            customCards[idx].inStock = inStock;
            if (image) customCards[idx].image = image;
            localStorage.setItem('arcana_custom_cards', JSON.stringify(customCards));
        }
    } else {
        const overrides = getProductOverrides();
        if (!overrides[id]) overrides[id] = {};
        overrides[id].name = name;
        overrides[id].price = price;
        overrides[id].description = desc;
        overrides[id].inStock = inStock;
        overrides[id].image = image || prod.image;
        localStorage.setItem('arcana_product_overrides', JSON.stringify(overrides));
    }

    notifyStorefrontUpdate();
    closeEditModal();
    renderAdminViews();
    updateAdminKPIs();
    showAdminToast(`Producto "${name}" modificado con éxito`);
}

// 13. Modal de Agregar Nueva Carta con Live Preview
function openAddCardModal() {
    playCyberSound('click');
    document.getElementById('add-card-name').value = '';
    document.getElementById('add-card-id').value = '';
    document.getElementById('add-card-price').value = '';
    document.getElementById('add-card-desc').value = '';
    document.getElementById('add-card-stock').value = 'true';
    document.getElementById('add-custom-category-name').value = '';
    document.getElementById('add-card-image-custom').value = '';

    const catGroup = document.getElementById('custom-category-group');
    if (catGroup) catGroup.style.display = 'none';
    const catBtnText = document.getElementById('toggle-cat-btn-text');
    if (catBtnText) catBtnText.innerText = '+ Crear nuevo subtítulo';

    updateAddLivePreview();
    document.getElementById('add-modal').style.display = 'flex';
}

function closeAddModal() {
    playCyberSound('click');
    document.getElementById('add-modal').style.display = 'none';
}

function updateAddLivePreview() {
    const name = document.getElementById('add-card-name').value.trim() || 'Nombre del Producto';
    const price = document.getElementById('add-card-price').value.trim() || 'Precio: $0.00 MXN';
    const desc = document.getElementById('add-card-desc').value.trim() || 'Descripción de las ventajas del producto...';
    const inStock = document.getElementById('add-card-stock').value === 'true';
    const imageCustom = document.getElementById('add-card-image-custom').value.trim();
    const imageSelect = document.getElementById('add-card-image').value;
    const image = imageCustom || imageSelect || 'Arcana_Logo.png';

    const previewContainer = document.getElementById('add-live-preview');
    if (!previewContainer) return;

    previewContainer.innerHTML = `
        <div class="game-card" style="width: 100%; max-width: 240px; margin: 0 auto; box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);">
            <img src="${image}" alt="${name}" class="${inStock ? '' : 'sold-out-img'}" style="width: 100%; height: 140px; object-fit: cover;">
            <div class="game-info" style="padding: 12px;">
                <h3 style="font-size: 1rem;">${name}</h3>
                <p style="font-size: 0.8rem; margin: 4px 0;">${desc}</p>
                <p class="stock-status" style="color: ${inStock ? '#00ff80' : '#ff4444'}; font-weight: bold; font-size: 0.8rem; margin-top: 4px;">${inStock ? 'En stock' : 'Agotado'}</p>
                <h4 style="color: var(--neon-pink); margin-top: 6px; font-size: 0.95rem;">${price}</h4>
                <button class="cart-add-btn" style="margin-top: 8px; width: 100%; padding: 6px; font-size: 0.8rem; ${inStock ? '' : 'display: none;'}">Añadir al carrito</button>
                ${!inStock ? '<h4 style="color: #ff4444; font-size: 0.85rem; margin-top: 6px; font-weight: bold;">AGOTADO</h4>' : ''}
            </div>
        </div>
    `;
}

function toggleCustomCategoryField() {
    playCyberSound('click');
    const catGroup = document.getElementById('custom-category-group');
    const catBtnText = document.getElementById('toggle-cat-btn-text');
    if (!catGroup) return;

    if (catGroup.style.display === 'none') {
        catGroup.style.display = 'block';
        if (catBtnText) catBtnText.innerText = '✕ Cancelar subtítulo nuevo';
        document.getElementById('add-custom-category-name').focus();
    } else {
        catGroup.style.display = 'none';
        document.getElementById('add-custom-category-name').value = '';
        if (catBtnText) catBtnText.innerText = '+ Crear nuevo subtítulo';
    }
}

function autoGenerateCardId() {
    const nameInput = document.getElementById('add-card-name');
    const idInput = document.getElementById('add-card-id');
    if (!nameInput || !idInput) return;
    
    const slug = nameInput.value
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    
    idInput.value = slug;
    updateAddLivePreview();
}

function saveNewCard(e) {
    if (e) e.preventDefault();
    playCyberSound('save');

    const name = document.getElementById('add-card-name').value.trim();
    let id = document.getElementById('add-card-id').value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const category = document.getElementById('add-card-category').value;
    const customCategoryTitle = document.getElementById('add-custom-category-name').value.trim();
    const price = document.getElementById('add-card-price').value.trim();
    const desc = document.getElementById('add-card-desc').value.trim();
    const inStock = document.getElementById('add-card-stock').value === 'true';
    
    const imageCustom = document.getElementById('add-card-image-custom').value.trim();
    const imageSelect = document.getElementById('add-card-image').value;
    const image = imageCustom || imageSelect || 'Arcana_Logo.png';

    if (!id) {
        id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }

    if (adminCatalog.some(p => p.id === id && !p.isDeleted)) {
        alert(`El identificador "${id}" ya está en uso. Por favor ingresa un ID único para la carta.`);
        return;
    }

    let filterClass = '';
    if (category.includes('Completa')) filterClass = 'streaming-item completa';
    if (category.includes('Perfil')) filterClass = 'streaming-item perfil';

    const newCardObj = {
        id: id,
        name: name,
        category: customCategoryTitle || category,
        saleType: customCategoryTitle ? `Subtítulo: ${customCategoryTitle}` : category,
        customCategoryTitle: customCategoryTitle || null,
        price: price.startsWith('Precio:') || price.includes(':') ? price : `Precio: ${price}`,
        description: desc,
        inStock: inStock,
        image: image,
        filterClass: filterClass,
        isCustomCard: true,
        isDeleted: false
    };

    const customCards = getCustomCards();
    customCards.push(newCardObj);
    localStorage.setItem('arcana_custom_cards', JSON.stringify(customCards));

    notifyStorefrontUpdate();
    closeAddModal();
    loadAdminCatalog();
    showAdminToast(`Nueva carta "${name}" agregada a la tienda`);
}

// 14. Eliminar CUALQUIER carta (con papelera de reciclaje)
function deleteCard(id) {
    const prod = adminCatalog.find(p => p.id === id);
    const name = prod ? prod.name : id;

    if (!confirm(`¿Mover la carta "${name}" a la papelera? (Dejará de verse en la tienda, pero podrás restaurarla cuando quieras).`)) {
        return;
    }

    playCyberSound('delete');

    const isCustom = prod.isCustomCard || !DEFAULT_PRODUCTS.some(dp => dp.id === id);
    if (isCustom) {
        const customCards = getCustomCards();
        const idx = customCards.findIndex(c => c.id === id);
        if (idx !== -1) {
            customCards[idx].isDeleted = true;
            localStorage.setItem('arcana_custom_cards', JSON.stringify(customCards));
        }
    } else {
        const overrides = getProductOverrides();
        if (!overrides[id]) overrides[id] = {};
        overrides[id].isDeleted = true;
        localStorage.setItem('arcana_product_overrides', JSON.stringify(overrides));
    }

    notifyStorefrontUpdate();
    loadAdminCatalog();
    showAdminToast(`Carta "${name}" enviada a la papelera`);
}

// 15. Restaurar carta eliminada
function restoreCard(id) {
    playCyberSound('save');
    const prod = adminCatalog.find(p => p.id === id);
    const name = prod ? prod.name : id;

    const isCustom = prod.isCustomCard || !DEFAULT_PRODUCTS.some(dp => dp.id === id);
    if (isCustom) {
        const customCards = getCustomCards();
        const idx = customCards.findIndex(c => c.id === id);
        if (idx !== -1) {
            customCards[idx].isDeleted = false;
            localStorage.setItem('arcana_custom_cards', JSON.stringify(customCards));
        }
    } else {
        const overrides = getProductOverrides();
        if (overrides[id]) {
            overrides[id].isDeleted = false;
            localStorage.setItem('arcana_product_overrides', JSON.stringify(overrides));
        }
    }

    notifyStorefrontUpdate();
    loadAdminCatalog();
    showAdminToast(`Carta "${name}" restaurada a la tienda`);
}

// 16. Configuración de WhatsApp y Mensaje Personalizado
function openWhatsAppConfigModal() {
    playCyberSound('click');
    const config = getWhatsAppConfig();
    const phoneInput = document.getElementById('wa-cfg-phone');
    const templateInput = document.getElementById('wa-cfg-template');
    if (phoneInput) phoneInput.value = config.phone || "528442279216";
    if (templateInput) templateInput.value = config.template || DEFAULT_WHATSAPP_CONFIG.template;

    updateWhatsAppConfigPreview();
    const modal = document.getElementById('whatsapp-config-modal');
    if (modal) modal.style.display = 'flex';
}

function closeWhatsAppConfigModal() {
    playCyberSound('click');
    const modal = document.getElementById('whatsapp-config-modal');
    if (modal) modal.style.display = 'none';
}

function updateWhatsAppConfigPreview() {
    const templateInput = document.getElementById('wa-cfg-template');
    const previewBubble = document.getElementById('wa-preview-bubble');
    if (!templateInput || !previewBubble) return;

    let text = templateInput.value;
    const sampleProducts = "- Netflix - Perfil : $85 MXN\n- Spotify premium De 1 mes : $70 MXN";
    const sampleTotal = "155";

    let preview = text.replace(/{productos}/gi, sampleProducts);
    preview = preview.replace(/{total}/gi, sampleTotal);

    previewBubble.innerText = preview;
}

function restoreDefaultWhatsAppConfig() {
    const phoneInput = document.getElementById('wa-cfg-phone');
    const templateInput = document.getElementById('wa-cfg-template');
    if (phoneInput) phoneInput.value = DEFAULT_WHATSAPP_CONFIG.phone;
    if (templateInput) templateInput.value = DEFAULT_WHATSAPP_CONFIG.template;
    updateWhatsAppConfigPreview();
    playCyberSound('click');
}

function saveWhatsAppConfigFromModal() {
    playCyberSound('save');
    const phone = document.getElementById('wa-cfg-phone').value.trim();
    const template = document.getElementById('wa-cfg-template').value.trim();

    saveWhatsAppConfig(phone, template);
    closeWhatsAppConfigModal();
    showAdminToast('Configuración de WhatsApp guardada con éxito');
}

function testSendWhatsAppConfig() {
    playCyberSound('save');
    const phone = document.getElementById('wa-cfg-phone').value.trim().replace(/[^0-9]/g, '');
    const previewBubble = document.getElementById('wa-preview-bubble');
    if (!previewBubble) return;
    const encoded = encodeURIComponent(previewBubble.innerText);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
}

// Simulador rápido por producto individual
function openWhatsAppSimulator(id) {
    playCyberSound('click');
    const prod = adminCatalog.find(p => p.id === id);
    if (!prod) return;

    const modal = document.getElementById('whatsapp-simulator-modal');
    const titleEl = document.getElementById('wa-sim-title');
    const textEl = document.getElementById('wa-sim-text');
    if (!modal) return;

    const config = getWhatsAppConfig();
    let template = config.template || DEFAULT_WHATSAPP_CONFIG.template;
    let sampleMsg = template.replace(/{productos}/gi, `- ${prod.name} : ${prod.price}`);
    sampleMsg = sampleMsg.replace(/{total}/gi, prod.price);

    if (titleEl) titleEl.innerText = prod.name;
    if (textEl) textEl.value = sampleMsg;

    modal.style.display = 'flex';
}

function closeWhatsAppSimulator() {
    playCyberSound('click');
    const modal = document.getElementById('whatsapp-simulator-modal');
    if (modal) modal.style.display = 'none';
}

function testSendWhatsAppSim() {
    playCyberSound('save');
    const config = getWhatsAppConfig();
    const textEl = document.getElementById('wa-sim-text');
    if (!textEl) return;
    const phone = (config.phone || "528442279216").replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(textEl.value);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
}

// 17. Copia de Seguridad JSON (Exportar e Importar)
function exportBackupJSON() {
    playCyberSound('save');
    const data = {
        version: "2.0",
        date: new Date().toISOString(),
        productOverrides: getProductOverrides(),
        customCards: getCustomCards(),
        whatsappConfig: getWhatsAppConfig()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arcana_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showAdminToast('Copia de seguridad descargada');
}

function importBackupJSON(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.productOverrides) {
                localStorage.setItem('arcana_product_overrides', JSON.stringify(data.productOverrides));
            }
            if (data.customCards) {
                localStorage.setItem('arcana_custom_cards', JSON.stringify(data.customCards));
            }
            if (data.whatsappConfig) {
                localStorage.setItem('arcana_whatsapp_config', JSON.stringify(data.whatsappConfig));
            }
            notifyStorefrontUpdate();
            playCyberSound('save');
            loadAdminCatalog();
            showAdminToast('Copia de seguridad restaurada con éxito');
        } catch(err) {
            alert('Error al leer el archivo JSON de respaldo.');
        }
    };
    reader.readAsText(file);
    fileInput.value = '';
}

// 18. Restablecer valores de fábrica
function resetToDefaults() {
    if (!confirm('¿Restablecer todo el inventario, precios y descripciones a los valores originales de fábrica? Se conservarán los archivos base.')) {
        return;
    }
    playCyberSound('delete');
    localStorage.removeItem('arcana_product_overrides');
    localStorage.removeItem('arcana_custom_cards');
    localStorage.removeItem('arcana_whatsapp_config');
    notifyStorefrontUpdate();
    loadAdminCatalog();
    showAdminToast('Catálogo restablecido a valores originales');
}

// Toast flotante HUD
function showAdminToast(msg) {
    const toast = document.getElementById('admin-toast');
    const toastText = document.getElementById('admin-toast-text');
    if (!toast || !toastText) return;

    toastText.innerText = msg;
    toast.style.display = 'flex';
    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
        toast.style.display = 'none';
    }, 3500);
}

// Export for node unit tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DEFAULT_PRODUCTS,
        ARCANA_IMAGES,
        DEFAULT_WHATSAPP_CONFIG,
        getWhatsAppConfig,
        saveWhatsAppConfig,
        extractPrices,
        getAllCatalogProducts,
        getProductOverrides,
        getCustomCards,
        applyStorefrontCustomizations
    };
}
