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
        "description": "Anime sin límites, cuenta completa.",
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
        "description": "Televisión, películas y series en vivo.",
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
        "description": "Suscripción anual de Vix+ sin restricciones.",
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
        "description": "Membresía por invitación a tu correo.",
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
        "description": "Acceso a tu gimnasio de preferencia y área de peso libre.",
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
        "description": "Impulsa tus videos y llega a más audiencia de forma rápida.",
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
        "description": "Acceso total a herramientas y recursos premium para tus diseños.",
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
        "description": "Aprende idiomas sin anuncios, con vidas ilimitadas y más beneficios.",
        "image": "SuperDuolingo.jpg",
        "inStock": true,
        "filterClass": ""
    },
    {
        "id": "recargas-telefonicas",
        "name": "Recargas Telefónicas / fuera de servicio",
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
    { file: "disney.png", name: "Disney+" },
    { file: "max.jpg", name: "Max (HBO)" },
    { file: "Prime.png", name: "Prime Video" },
    { file: "crunchyroll.jpg", name: "Crunchyroll" },
    { file: "premiumYT.jpg", name: "YouTube Premium" },
    { file: "IPTV.jpg", name: "IPTV" },
    { file: "vix.jpg", name: "Vix+" },
    { file: "netflix.jpg", name: "Netflix" },
    { file: "universal.jpg", name: "Universal+" },
    { file: "chatgpt.png", name: "ChatGPT Plus" },
    { file: "spotify.jpg", name: "Spotify 1 Mes" },
    { file: "Spotify3meses.png", name: "Spotify 3 Meses" },
    { file: "Spotifyfamiliar.jpg", name: "Spotify Familiar" },
    { file: "Fit.jpg", name: "Smart Fit (Plan Fit)" },
    { file: "Smartfit_plan.jpg", name: "Smart Fit (Plan Smart)" },
    { file: "Black.jpg", name: "Smart Fit (Plan Black)" },
    { file: "Tiktok_Instagram.png", name: "Seguidores Instagram y TikTok" },
    { file: "canva.png", name: "Canva Pro" },
    { file: "duolingo.png", name: "Super Duolingo" },
    { file: "recargas.jpg", name: "Recargas Telefónicas" },
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
    broadcastStorefrontSync();
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

// Notifica a todas las pestañas de una actualización local
function notifyStorefrontUpdate() {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('arcana_version', Date.now().toString());
    }
}

// Normaliza el estado de stock ('en-stock' | 'pocas' | 'agotado')
function getProductStockState(p) {
    if (p.stockState) return p.stockState;
    return p.inStock ? 'en-stock' : 'agotado';
}

// Combina el catálogo base + overrides + cartas personalizadas (con soporte de papelera)
function getAllCatalogProducts(includeDeleted = true) {
    const overrides = getProductOverrides();
    const customCards = getCustomCards();

    const mergedDefaults = DEFAULT_PRODUCTS.map(p => {
        const custom = overrides[p.id];
        if (custom) {
            const inStockVal = custom.inStock !== undefined ? custom.inStock : p.inStock;
            const stockStateVal = custom.stockState || (inStockVal ? 'en-stock' : 'agotado');
            return {
                ...p,
                name: custom.name !== undefined ? custom.name : p.name,
                price: custom.price !== undefined ? custom.price : p.price,
                description: custom.description !== undefined ? custom.description : p.description,
                inStock: inStockVal,
                stockState: stockStateVal,
                image: custom.image !== undefined ? custom.image : p.image,
                isDeleted: !!custom.isDeleted
            };
        }
        return { ...p, stockState: p.inStock ? 'en-stock' : 'agotado', isDeleted: false };
    });

    const customCardsMapped = customCards.map(c => ({
        ...c,
        stockState: c.stockState || (c.inStock ? 'en-stock' : 'agotado')
    }));

    const all = [...mergedDefaults, ...customCardsMapped];
    return includeDeleted ? all : all.filter(p => !p.isDeleted);
}

// =========================================================================
// 4. MOTOR DE SINCRONIZACIÓN MULTI-CANAL EN TIEMPO REAL
// (Garantiza actualización instantánea en file:///, localhost y web)
// =========================================================================
let openedStorefrontTabs = [];
let syncBroadcastChannel = null;

if (typeof window !== 'undefined' && typeof BroadcastChannel !== 'undefined') {
    try {
        syncBroadcastChannel = new BroadcastChannel('arcana_sync_bus');
        syncBroadcastChannel.onmessage = (event) => {
            if (event.data && event.data.type === 'ARCANA_SYNC_PAYLOAD') {
                applySyncedStorePayload(event.data.payload);
            }
        };
    } catch(e) {}
}

function getStoreSyncPayload() {
    return {
        overrides: getProductOverrides(),
        customCards: getCustomCards(),
        whatsappConfig: getWhatsAppConfig(),
        v: Date.now()
    };
}

function broadcastStorefrontSync() {
    const payload = getStoreSyncPayload();

    // 1. BroadcastChannel (para pestañas del mismo origen/localhost)
    if (syncBroadcastChannel) {
        try {
            syncBroadcastChannel.postMessage({ type: 'ARCANA_SYNC_PAYLOAD', payload });
        } catch(e) {}
    }

    // 2. postMessage a todas las pestañas de tienda abiertas por este panel
    openedStorefrontTabs = openedStorefrontTabs.filter(w => w && !w.closed);
    openedStorefrontTabs.forEach(w => {
        try {
            w.postMessage({ type: 'ARCANA_SYNC_PAYLOAD', payload }, '*');
        } catch(e) {}
    });

    // 3. postMessage a ventana abridora si existe
    if (typeof window !== 'undefined' && window.opener && !window.opener.closed) {
        try {
            window.opener.postMessage({ type: 'ARCANA_SYNC_PAYLOAD', payload }, '*');
        } catch(e) {}
    }
}

function openSyncStorefront() {
    const payload = getStoreSyncPayload();
    const encoded = encodeURIComponent(JSON.stringify(payload));
    const url = 'productos.html#sync=' + encoded;
    const win = window.open(url, 'arcana_storefront_tab');
    if (win) {
        openedStorefrontTabs.push(win);
        win.focus();
        if (typeof showAdminToast === 'function') {
            showAdminToast('Tienda sincronizada y abierta en nueva pestaña');
        }
    }
}

function copyStorefrontSyncLink() {
    const payload = getStoreSyncPayload();
    const encoded = encodeURIComponent(JSON.stringify(payload));
    const base = window.location.href.replace(/admin\.html.*$/, 'productos.html');
    const fullUrl = base + '#sync=' + encoded;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullUrl).then(() => {
            if (typeof showAdminToast === 'function') showAdminToast('Enlace de tienda sincronizada copiado al portapapeles');
        }).catch(() => {
            prompt('Copia este enlace de la tienda sincronizada:', fullUrl);
        });
    } else {
        prompt('Copia este enlace de la tienda sincronizada:', fullUrl);
    }
}

function applySyncedStorePayload(payload) {
    if (!payload) return;
    try {
        if (typeof localStorage !== 'undefined') {
            if (payload.overrides) localStorage.setItem('arcana_product_overrides', JSON.stringify(payload.overrides));
            if (payload.customCards) localStorage.setItem('arcana_custom_cards', JSON.stringify(payload.customCards));
            if (payload.whatsappConfig) localStorage.setItem('arcana_whatsapp_config', JSON.stringify(payload.whatsappConfig));
            if (payload.v) localStorage.setItem('arcana_version', payload.v.toString());
        }
        applyStorefrontCustomizations();
    } catch(e) {
        console.error('Error al aplicar datos sincronizados:', e);
    }
}

// =========================================================================
// 5. LÓGICA DE TIENDA: productos.html (Renderizado y Estados de Stock)
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
            if (custom.inStock !== undefined || custom.stockState !== undefined) {
                const effectiveInStock = custom.inStock !== undefined ? custom.inStock : (custom.stockState !== 'agotado');
                const effectiveState = custom.stockState || (effectiveInStock ? 'en-stock' : 'agotado');
                card.setAttribute('data-stock', effectiveInStock ? 'En stock' : 'Agotado');
                card.setAttribute('data-stock-state', effectiveState);
                updateCardStockUI(card, effectiveInStock, effectiveState);
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

function updateCardStockUI(card, inStock, stockState) {
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

    const state = stockState || (inStock ? 'en-stock' : 'agotado');

    if (state === 'agotado') {
        if (stockStatus) {
            stockStatus.style.display = 'block';
            stockStatus.style.color = '#ff4444';
            stockStatus.className = 'stock-status';
            stockStatus.innerHTML = '<i class="fas fa-times-circle"></i> Agotado';
        }
        if (img) img.classList.add('sold-out-img');
        if (addBtn) {
            addBtn.style.display = 'none';
        }
        const soldOutTag = document.createElement('h4');
        soldOutTag.className = 'sold-out-text';
        soldOutTag.style.cssText = 'color: #ff4444; margin-top: 10px; font-weight: bold; letter-spacing: 1px;';
        soldOutTag.innerHTML = '<i class="fas fa-ban"></i> AGOTADO';
        if (info) info.appendChild(soldOutTag);
    } else if (state === 'pocas') {
        if (stockStatus) {
            stockStatus.style.display = 'block';
            stockStatus.style.color = '#ffd700';
            stockStatus.className = 'stock-status stock-pulse-gold';
            stockStatus.innerHTML = '<i class="fas fa-bolt"></i> ¡ÚLTIMAS PIEZAS DISPONIBLES!';
        }
        if (img) img.classList.remove('sold-out-img');
        if (addBtn) {
            addBtn.style.display = 'block';
            addBtn.disabled = false;
            addBtn.style.borderColor = '#ffd700';
            addBtn.style.color = '#ffd700';
        }
    } else { // 'en-stock'
        if (stockStatus) {
            stockStatus.style.display = 'block';
            stockStatus.style.color = '#00ff80';
            stockStatus.className = 'stock-status';
            stockStatus.innerHTML = '<i class="fas fa-check-circle"></i> En stock';
        }
        if (img) img.classList.remove('sold-out-img');
        if (addBtn) {
            addBtn.style.display = 'block';
            addBtn.disabled = false;
            addBtn.style.borderColor = 'var(--neon-pink)';
            addBtn.style.color = 'var(--neon-pink)';
        }
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

    const state = cardData.stockState || (cardData.inStock ? 'en-stock' : 'agotado');
    const isOut = state === 'agotado';
    const isLow = state === 'pocas';

    let statusHtml = '';
    if (isOut) {
        statusHtml = '<p class="stock-status" style="color: #ff4444; font-weight: bold; font-size: 0.9rem; margin-top: 5px;"><i class="fas fa-times-circle"></i> Agotado</p>';
    } else if (isLow) {
        statusHtml = '<p class="stock-status stock-pulse-gold" style="color: #ffd700; font-weight: bold; font-size: 0.9rem; margin-top: 5px;"><i class="fas fa-bolt"></i> ¡ÚLTIMAS PIEZAS DISPONIBLES!</p>';
    } else {
        statusHtml = '<p class="stock-status" style="color: #00ff80; font-weight: bold; font-size: 0.9rem; margin-top: 5px;"><i class="fas fa-check-circle"></i> En stock</p>';
    }

    const newCard = document.createElement('div');
    newCard.className = `game-card custom-admin-card ${cardData.filterClass || ''}`;
    newCard.id = 'card-' + cardData.id;
    newCard.setAttribute('data-id', cardData.id);
    newCard.setAttribute('data-category', cardData.category);
    newCard.setAttribute('data-sale-type', cardData.saleType || cardData.category);
    newCard.setAttribute('data-stock', !isOut ? 'En stock' : 'Agotado');
    newCard.setAttribute('data-stock-state', state);

    newCard.innerHTML = `
        <img src="${cardData.image || 'Arcana_Logo.png'}" alt="${cardData.name}" class="${isOut ? 'sold-out-img' : ''}">
        <div class="game-info">
            <h3>${cardData.name}</h3>
            <p>${cardData.description || ''}</p>
            ${statusHtml}
            <h4 style="color: var(--neon-pink); margin-top: 10px;">${cardData.price}</h4>
            <button class="cart-add-btn" onclick="addToCart(this)" style="margin-top: 10px; width: 100%; padding: 8px; border-radius: 5px; background: transparent; border: 1px solid ${isLow ? '#ffd700' : 'var(--neon-pink)'}; color: ${isLow ? '#ffd700' : 'var(--neon-pink)'}; cursor: pointer; ${isOut ? 'display: none;' : ''}">Añadir al carrito</button>
            ${isOut ? '<h4 class="sold-out-text" style="color: #ff4444; margin-top: 10px; font-weight: bold; letter-spacing: 1px;"><i class="fas fa-ban"></i> AGOTADO</h4>' : ''}
        </div>
    `;

    container.appendChild(newCard);
}

// Inicializador de Sincronización Continua e Inmediata
if (typeof window !== 'undefined') {
    // 1. Escuchar mensajes postMessage (para cuando admin y tienda están abiertas en simultáneo)
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'ARCANA_SYNC_PAYLOAD') {
            applySyncedStorePayload(event.data.payload);
        } else if (event.data && event.data.type === 'ARCANA_PING_SYNC') {
            broadcastStorefrontSync();
        }
    });

    // 2. Al cargar, revisar si viene payload en el hash (#sync=...)
    function checkUrlSyncPayload() {
        if (window.location.hash && window.location.hash.includes('sync=')) {
            try {
                const raw = decodeURIComponent(window.location.hash.split('sync=')[1]);
                const payload = JSON.parse(raw);
                applySyncedStorePayload(payload);
                if (window.history && window.history.replaceState) {
                    window.history.replaceState(null, null, window.location.pathname + window.location.search);
                }
            } catch(e) {}
        }
    }
    checkUrlSyncPayload();

    // 3. Ejecutar de inmediato al cargar el script
    applyStorefrontCustomizations();
    
    // 4. Al estar listo el DOM
    document.addEventListener('DOMContentLoaded', () => {
        checkUrlSyncPayload();
        applyStorefrontCustomizations();
    });
    window.addEventListener('load', () => {
        checkUrlSyncPayload();
        applyStorefrontCustomizations();
    });
    
    // 5. Al dispararse evento storage de otra pestaña
    window.addEventListener('storage', (e) => {
        applyStorefrontCustomizations();
    });

    // 6. Polling ligero cada 350ms para verificar cambios de timestamp
    setInterval(() => {
        if (typeof localStorage === 'undefined') return;
        const currentStamp = (localStorage.getItem('arcana_version') || '') + 
                             (localStorage.getItem('arcana_product_overrides') || '') + 
                             (localStorage.getItem('arcana_custom_cards') || '');
        if (currentStamp !== lastStorefrontStamp) {
            lastStorefrontStamp = currentStamp;
            applyStorefrontCustomizations();
        }
    }, 350);

    // 7. Si fue abierta desde el panel admin, pedir estado actual
    if (window.opener && !window.opener.closed) {
        try {
            window.opener.postMessage({ type: 'ARCANA_PING_SYNC' }, '*');
        } catch(e) {}
    }
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
// 6. CARRITO DE COMPRAS Y PEDIDO A WHATSAPP
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

function finishAddToCart(name, option) {
    cart.push({ name: name, price: option.price, variant: option.name });
    updateCartUI();
    showToastFeedback(`${name} (${option.name}) añadido`);
}

function showToastFeedback(text) {
    let toast = document.getElementById('store-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'store-toast';
        toast.style.cssText = "position: fixed; bottom: 85px; right: 25px; background: rgba(10, 10, 15, 0.95); border: 1px solid var(--neon-pink); color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 0 15px rgba(255, 0, 255, 0.4); z-index: 9999; font-weight: bold; transition: opacity 0.3s; font-size: 0.9rem;";
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-cart-plus" style="color: var(--neon-pink); margin-right: 8px;"></i> ${text}`;
    toast.style.opacity = '1';
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.style.display = 'none', 300);
    }, 2000);
}

function updateCartUI() {
    const countEl = document.getElementById('cart-count');
    const floatEl = document.getElementById('cart-float');
    if (countEl) countEl.innerText = cart.length;
    if (floatEl) {
        floatEl.style.display = cart.length > 0 ? 'flex' : 'none';
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
// 7. MOTOR DE AUDIO SINTETIZADO CYBERPUNK (Web Audio API)
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
        } else if (type === 'toggle-low') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(580, now);
            osc.frequency.setValueAtTime(740, now + 0.05);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
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
            gain.gain.setValueAtTime(0.09, now);
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
            btn.innerHTML = '<i class="fas fa-volume-up"></i> <span class="nav-text">Sonido: ON</span>';
            playCyberSound('click');
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="fas fa-volume-mute"></i> <span class="nav-text">Sonido: OFF</span>';
        }
    }
}

// =========================================================================
// 8. PANEL DE ADMINISTRACIÓN CYBERPUNK HUD (admin.html)
// =========================================================================
let currentViewMode = 'grid'; // 'grid' | 'table'
let currentFilterCategory = 'todas';
let adminCatalog = [];

function login() {
    initAudio();
    const passInput = document.getElementById('admin-pass');
    const pass = passInput ? passInput.value : '';
    if (pass === 'arcana2026' || pass === '') {
        playCyberSound('save');
        const loginBox = document.getElementById('login-box');
        const dashboard = document.getElementById('dashboard');
        const logoutBtn = document.getElementById('logout-btn');
        const headerPulse = document.getElementById('header-pulse');
        const fab = document.getElementById('admin-mobile-fab');

        if (loginBox) loginBox.style.display = 'none';
        if (dashboard) dashboard.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (headerPulse) headerPulse.style.display = 'inline-flex';
        if (fab) fab.classList.add('fab-visible');

        initAdminDashboard();
        showAdminToast('Sesión iniciada. Bienvenido al Terminal Arcana.');
    } else {
        playCyberSound('delete');
        alert('Contraseña incorrecta. (Pista: usa arcana2026 o déjala vacía).');
    }
}

function logout() {
    playCyberSound('click');
    const loginBox = document.getElementById('login-box');
    const dashboard = document.getElementById('dashboard');
    const logoutBtn = document.getElementById('logout-btn');
    const headerPulse = document.getElementById('header-pulse');
    const fab = document.getElementById('admin-mobile-fab');

    if (loginBox) loginBox.style.display = 'block';
    if (dashboard) dashboard.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (headerPulse) headerPulse.style.display = 'none';
    if (fab) fab.classList.remove('fab-visible');
}

function initAdminDashboard() {
    populateImageSelects();
    loadAdminCatalog();
    initChipsBar();
}

function populateImageSelects() {
    const editSelect = document.getElementById('edit-card-image');
    const addSelect = document.getElementById('add-card-image');

    const optionsHtml = ARCANA_IMAGES.map(img => 
        `<option value="${img.file}">${img.name} (${img.file})</option>`
    ).join('');

    if (editSelect) editSelect.innerHTML = optionsHtml;
    if (addSelect) addSelect.innerHTML = optionsHtml;
}

function loadAdminCatalog() {
    adminCatalog = getAllCatalogProducts(true);
    updateAdminKPIs();
    renderCategoryChips();
    renderAdminViews();
}

// 9. KPIs del Dashboard
function updateAdminKPIs() {
    const totalEl = document.getElementById('kpi-total');
    const inStockEl = document.getElementById('kpi-in-stock');
    const lowStockEl = document.getElementById('kpi-low-stock');
    const outStockEl = document.getElementById('kpi-out-stock');
    const categoriesEl = document.getElementById('kpi-categories');

    const barInStock = document.getElementById('kpi-bar-in-stock');
    const barLowStock = document.getElementById('kpi-bar-low-stock');
    const barOutStock = document.getElementById('kpi-bar-out-stock');

    const activeProducts = adminCatalog.filter(p => !p.isDeleted);
    const total = activeProducts.length;

    let inCount = 0;
    let lowCount = 0;
    let outCount = 0;

    activeProducts.forEach(p => {
        const state = getProductStockState(p);
        if (state === 'agotado') outCount++;
        else if (state === 'pocas') lowCount++;
        else inCount++;
    });

    const categoriesSet = new Set(activeProducts.map(p => p.saleType || p.category));

    if (totalEl) totalEl.innerText = total;
    if (inStockEl) inStockEl.innerText = inCount;
    if (lowStockEl) lowStockEl.innerText = lowCount;
    if (outStockEl) outStockEl.innerText = outCount;
    if (categoriesEl) categoriesEl.innerText = categoriesSet.size;

    if (total > 0) {
        if (barInStock) barInStock.style.width = `${(inCount / total) * 100}%`;
        if (barLowStock) barLowStock.style.width = `${(lowCount / total) * 100}%`;
        if (barOutStock) barOutStock.style.width = `${(outCount / total) * 100}%`;
    }
}

// 10. Barra de Filtro Rápido con Chips
function initChipsBar() {
    renderCategoryChips();
}

function renderCategoryChips() {
    const container = document.getElementById('admin-category-chips');
    if (!container) return;

    const activeProducts = adminCatalog.filter(p => !p.isDeleted);
    const categoriesMap = {};

    activeProducts.forEach(p => {
        const cat = p.saleType || p.category || 'General';
        categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
    });

    const deletedCount = adminCatalog.filter(p => p.isDeleted).length;

    let html = `
        <button class="admin-chip ${currentFilterCategory === 'todas' ? 'active' : ''}" onclick="filterByChip('todas')">
            <i class="fas fa-layer-group"></i> Todas
            <span class="chip-count">${activeProducts.length}</span>
        </button>
    `;

    Object.keys(categoriesMap).sort().forEach(cat => {
        const isActive = currentFilterCategory === cat;
        html += `
            <button class="admin-chip ${isActive ? 'active' : ''}" onclick="filterByChip('${cat}')">
                ${cat}
                <span class="chip-count">${categoriesMap[cat]}</span>
            </button>
        `;
    });

    if (deletedCount > 0) {
        html += `
            <button class="admin-chip ${currentFilterCategory === 'papelera' ? 'active' : ''}" style="border-color: rgba(255, 68, 68, 0.4); color: #ff6666;" onclick="filterByChip('papelera')">
                <i class="fas fa-trash-alt"></i> Papelera
                <span class="chip-count">${deletedCount}</span>
            </button>
        `;
    }

    container.innerHTML = html;
}

function filterByChip(cat) {
    playCyberSound('click');
    currentFilterCategory = cat;
    renderCategoryChips();
    renderAdminViews();
}

function setViewMode(mode) {
    playCyberSound('click');
    currentViewMode = mode;
    const btnGrid = document.getElementById('view-btn-grid');
    const btnTable = document.getElementById('view-btn-table');
    const gridEl = document.getElementById('admin-cards-grid');
    const tableEl = document.getElementById('admin-table-container');

    if (mode === 'grid') {
        if (btnGrid) btnGrid.classList.add('active');
        if (btnTable) btnTable.classList.remove('active');
        if (gridEl) gridEl.style.display = 'grid';
        if (tableEl) tableEl.style.display = 'none';
    } else {
        if (btnGrid) btnGrid.classList.remove('active');
        if (btnTable) btnTable.classList.add('active');
        if (gridEl) gridEl.style.display = 'none';
        if (tableEl) tableEl.style.display = 'block';
    }
}

function filterAdminProducts() {
    renderAdminViews();
}

function getFilteredProducts() {
    const searchInput = document.getElementById('admin-search');
    const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const stockFilter = document.getElementById('admin-stock-filter');
    const stockVal = stockFilter ? stockFilter.value : 'todos';

    return adminCatalog.filter(p => {
        // Filtro papelera
        if (currentFilterCategory === 'papelera') {
            if (!p.isDeleted) return false;
        } else {
            if (p.isDeleted) return false;
            if (currentFilterCategory !== 'todas') {
                const cat = p.saleType || p.category || '';
                if (cat !== currentFilterCategory && p.category !== currentFilterCategory) {
                    return false;
                }
            }
        }

        // Filtro de Stock de 3 estados
        const state = getProductStockState(p);
        if (stockVal === 'en-stock' && state !== 'en-stock') return false;
        if (stockVal === 'pocas' && state !== 'pocas') return false;
        if (stockVal === 'agotado' && state !== 'agotado') return false;

        // Búsqueda de texto
        if (searchVal) {
            const matchName = (p.name || '').toLowerCase().includes(searchVal);
            const matchId = (p.id || '').toLowerCase().includes(searchVal);
            const matchCat = (p.category || '').toLowerCase().includes(searchVal);
            const matchSale = (p.saleType || '').toLowerCase().includes(searchVal);
            const matchPrice = (p.price || '').toLowerCase().includes(searchVal);
            const matchDesc = (p.description || '').toLowerCase().includes(searchVal);
            if (!matchName && !matchId && !matchCat && !matchSale && !matchPrice && !matchDesc) {
                return false;
            }
        }

        return true;
    });
}

function renderAdminViews() {
    const filtered = getFilteredProducts();
    renderAdminCards(filtered);
    renderAdminTableRows(filtered);
}

// 11. Renderizado Vista Cuadrícula con Botón de Stock HUD Avanzado
function renderAdminCards(filtered) {
    const grid = document.getElementById('admin-cards-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; color: #888;">
                <i class="fas fa-search" style="font-size: 2.5rem; margin-bottom: 12px; color: #555;"></i>
                <p>No se encontraron productos que coincidan con los filtros aplicados.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(p => {
        const isCustom = p.isCustomCard || !DEFAULT_PRODUCTS.some(dp => dp.id === p.id);
        const state = getProductStockState(p);
        
        let stockClassBox = 'stock-state-in-stock';
        let badgeClass = 'badge-in-stock';
        let ledClass = 'led-green';
        let statusLabel = 'EN STOCK';

        if (state === 'pocas') {
            stockClassBox = 'stock-state-low';
            badgeClass = 'badge-low';
            ledClass = 'led-yellow';
            statusLabel = 'POCAS UNIDADES';
        } else if (state === 'agotado') {
            stockClassBox = 'stock-state-out-of-stock';
            badgeClass = 'badge-out-of-stock';
            ledClass = 'led-red';
            statusLabel = 'AGOTADO';
        }

        const cardBox = document.createElement('div');
        cardBox.className = `admin-card-box ${state === 'agotado' ? 'out-of-stock-border' : ''}`;
        cardBox.id = `admin-card-${p.id}`;

        cardBox.innerHTML = `
            <div>
                <div class="admin-card-topbar">
                    <span class="badge-id" title="Identificador único">${p.id}</span>
                    <span class="badge-category">${p.saleType || p.category || 'General'}</span>
                </div>

                <div class="admin-card-media">
                    <img src="${p.image || 'Arcana_Logo.png'}" alt="${p.name}">
                    ${isCustom ? '<span class="badge-custom media-badge">NUEVA CARTA</span>' : ''}
                    ${p.isDeleted ? '<span class="badge-custom media-badge" style="border-color:#ff4444; color:#ff4444;">PAPELERA</span>' : ''}
                </div>

                <div class="admin-card-body">
                    <h3>${p.name}</h3>
                    ${p.customCategoryTitle ? `<div style="font-size: 0.8rem; color: #ffd700; margin-bottom: 4px;"><i class="fas fa-heading"></i> ${p.customCategoryTitle}</div>` : ''}
                    <div class="admin-card-price">${p.price}</div>
                    <div class="admin-card-desc" title="${p.description}">${p.description || '<em style="color:#666;">Sin descripción</em>'}</div>
                </div>
            </div>

            <div>
                <!-- CONTROL DE STOCK AVANZADO CYBER HUD -->
                <div class="hud-stock-control ${stockClassBox}" id="hud-ctrl-${p.id}">
                    <div class="hud-stock-header">
                        <span class="hud-stock-badge ${badgeClass}">
                            <span class="hud-led ${ledClass}"></span>
                            ${statusLabel}
                        </span>
                        <button type="button" onclick="cycleProductStock('${p.id}')" style="background: transparent; border: none; color: #888; cursor: pointer; font-size: 0.75rem;" title="Alternar rápidamente">
                            <i class="fas fa-sync-alt"></i> Alternar
                        </button>
                    </div>

                    <!-- Pastillas de 3 Estados -->
                    <div class="hud-stock-pills">
                        <button type="button" class="hud-pill-btn pill-in-stock ${state === 'en-stock' ? 'active' : ''}" 
                                onclick="setProductStockAdvanced('${p.id}', 'en-stock')" title="Marcar como En Stock (Disponible)">
                            <i class="fas fa-check"></i> Stock
                        </button>
                        <button type="button" class="hud-pill-btn pill-low ${state === 'pocas' ? 'active' : ''}" 
                                onclick="setProductStockAdvanced('${p.id}', 'pocas')" title="Marcar como Pocas Unidades (Alerta ¡Últimas Piezas!)">
                            <i class="fas fa-bolt"></i> Pocas
                        </button>
                        <button type="button" class="hud-pill-btn pill-out-of-stock ${state === 'agotado' ? 'active' : ''}" 
                                onclick="setProductStockAdvanced('${p.id}', 'agotado')" title="Marcar como Agotado (Bloquea compras)">
                            <i class="fas fa-ban"></i> Agotado
                        </button>
                    </div>
                </div>

                <div class="admin-card-actions">
                    ${!p.isDeleted ? `
                        <button class="action-btn edit-btn" onclick="openEditModal('${p.id}')" title="Editar precio, descripción y datos">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="action-btn" onclick="openWhatsAppSimulator('${p.id}')" style="background: rgba(37, 211, 102, 0.15); border: 1px solid #25D366; color: #25D366;" title="Probar mensaje de WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                        <button class="action-btn delete-btn" onclick="deleteCard('${p.id}')" title="Eliminar / Mover a papelera">
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

// 12. Renderizado Vista Tabla con Botón de Stock Avanzado
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
        const state = getProductStockState(p);

        let stockClass = 'adv-in-stock';
        let stockIcon = 'fa-check-circle';
        let stockText = 'En stock';

        if (state === 'pocas') {
            stockClass = 'adv-low';
            stockIcon = 'fa-bolt';
            stockText = 'Pocas Unidades';
        } else if (state === 'agotado') {
            stockClass = 'adv-out-of-stock';
            stockIcon = 'fa-ban';
            stockText = 'Agotado';
        }

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
                    <button class="stock-btn-adv ${stockClass}" onclick="cycleProductStock('${p.id}')" title="Clic para alternar entre En Stock, Pocas Unidades y Agotado">
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
                        <button class="action-btn delete-btn" onclick="deleteCard('${p.id}')" title="Eliminar / Mover a papelera">
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

// 13. Modificar Estado de Stock Individual e Independiente (Sistema Avanzado)
function setProductStockAdvanced(id, newState) {
    const prod = adminCatalog.find(p => p.id === id);
    if (!prod) return;

    prod.stockState = newState;
    prod.inStock = (newState !== 'agotado');

    if (newState === 'en-stock') playCyberSound('toggle-on');
    else if (newState === 'pocas') playCyberSound('toggle-low');
    else playCyberSound('toggle-off');

    const isCustom = prod.isCustomCard || !DEFAULT_PRODUCTS.some(dp => dp.id === id);
    if (isCustom) {
        const customCards = getCustomCards();
        const idx = customCards.findIndex(c => c.id === id);
        if (idx !== -1) {
            customCards[idx].inStock = prod.inStock;
            customCards[idx].stockState = newState;
            localStorage.setItem('arcana_custom_cards', JSON.stringify(customCards));
        }
    } else {
        const overrides = getProductOverrides();
        if (!overrides[id]) overrides[id] = {};
        overrides[id].inStock = prod.inStock;
        overrides[id].stockState = newState;
        localStorage.setItem('arcana_product_overrides', JSON.stringify(overrides));
    }

    notifyStorefrontUpdate();
    broadcastStorefrontSync();
    renderAdminViews();
    updateAdminKPIs();

    const labelMap = { 'en-stock': '🟢 En stock (Disponible)', 'pocas': '🟡 Pocas unidades (Alerta)', 'agotado': '🔴 Agotado' };
    showAdminToast(`Stock de "${prod.name}": ${labelMap[newState]}`);
}

function cycleProductStock(id) {
    const prod = adminCatalog.find(p => p.id === id);
    if (!prod) return;
    const current = getProductStockState(prod);
    let nextState = 'en-stock';
    if (current === 'en-stock') nextState = 'pocas';
    else if (current === 'pocas') nextState = 'agotado';
    else if (current === 'agotado') nextState = 'en-stock';
    setProductStockAdvanced(id, nextState);
}

// Compatibilidad con llamadas heredadas
function toggleProductStock(id) {
    cycleProductStock(id);
}

// 14. Acciones de Stock por Lote
function bulkSetCategoryStockState(targetState) {
    const cat = currentFilterCategory;
    if (cat === 'papelera') {
        alert('No se puede aplicar a la papelera.');
        return;
    }
    const targetProducts = adminCatalog.filter(p => !p.isDeleted && (cat === 'todas' || p.category === cat || p.saleType === cat));
    if (targetProducts.length === 0) return;

    const labelMap = { 'en-stock': 'En stock', 'pocas': 'Pocas unidades', 'agotado': 'Agotado' };
    if (!confirm(`¿Deseas marcar ${targetProducts.length} producto(s) de "${cat}" como "${labelMap[targetState]}"?`)) {
        return;
    }

    if (targetState === 'en-stock') playCyberSound('toggle-on');
    else if (targetState === 'pocas') playCyberSound('toggle-low');
    else playCyberSound('toggle-off');

    const overrides = getProductOverrides();
    const customCards = getCustomCards();

    targetProducts.forEach(prod => {
        prod.stockState = targetState;
        prod.inStock = (targetState !== 'agotado');
        const isCustom = prod.isCustomCard || !DEFAULT_PRODUCTS.some(dp => dp.id === prod.id);
        if (isCustom) {
            const idx = customCards.findIndex(c => c.id === prod.id);
            if (idx !== -1) {
                customCards[idx].inStock = prod.inStock;
                customCards[idx].stockState = targetState;
            }
        } else {
            if (!overrides[prod.id]) overrides[prod.id] = {};
            overrides[prod.id].inStock = prod.inStock;
            overrides[prod.id].stockState = targetState;
        }
    });

    localStorage.setItem('arcana_product_overrides', JSON.stringify(overrides));
    localStorage.setItem('arcana_custom_cards', JSON.stringify(customCards));

    notifyStorefrontUpdate();
    broadcastStorefrontSync();
    renderAdminViews();
    updateAdminKPIs();
    showAdminToast(`${targetProducts.length} producto(s) actualizados a: ${labelMap[targetState]}`);
}

function bulkSetCategoryStock(inStock) {
    bulkSetCategoryStockState(inStock ? 'en-stock' : 'agotado');
}

// 15. Modal de Edición con Live Preview
function openEditModal(id) {
    playCyberSound('click');
    const prod = adminCatalog.find(p => p.id === id);
    if (!prod) return;

    document.getElementById('edit-card-id').value = prod.id;
    document.getElementById('edit-id-display').innerText = prod.id;
    document.getElementById('edit-card-name').value = prod.name;
    document.getElementById('edit-card-price').value = prod.price;
    document.getElementById('edit-card-desc').value = prod.description || '';
    
    const stockSelect = document.getElementById('edit-card-stock');
    if (stockSelect) stockSelect.value = getProductStockState(prod);

    const imageSelect = document.getElementById('edit-card-image');
    if (imageSelect) {
        imageSelect.value = prod.image || 'Arcana_Logo.png';
        if (!imageSelect.value) imageSelect.selectedIndex = 0;
    }

    updateEditLivePreview();
    document.getElementById('edit-modal').style.display = 'flex';
}

function closeEditModal() {
    playCyberSound('click');
    document.getElementById('edit-modal').style.display = 'none';
}

function updateEditLivePreview() {
    const name = document.getElementById('edit-card-name').value;
    const price = document.getElementById('edit-card-price').value;
    const desc = document.getElementById('edit-card-desc').value;
    const stockStateVal = document.getElementById('edit-card-stock').value;
    const inStock = (stockStateVal !== 'agotado');
    const image = document.getElementById('edit-card-image').value;

    const previewContainer = document.getElementById('edit-live-preview');
    if (!previewContainer) return;

    let stockText = 'En stock';
    let stockColor = '#00ff80';
    if (stockStateVal === 'pocas') {
        stockText = '¡ÚLTIMAS PIEZAS!';
        stockColor = '#ffd700';
    } else if (stockStateVal === 'agotado') {
        stockText = 'Agotado';
        stockColor = '#ff4444';
    }

    previewContainer.innerHTML = `
        <div class="game-card" style="width: 100%; max-width: 240px; margin: 0 auto; box-shadow: 0 0 15px rgba(0, 217, 255, 0.3);">
            <img src="${image}" alt="${name}" class="${!inStock ? 'sold-out-img' : ''}" style="width: 100%; height: 140px; object-fit: cover;">
            <div class="game-info" style="padding: 12px;">
                <h3 style="font-size: 1rem;">${name}</h3>
                <p style="font-size: 0.8rem; margin: 4px 0;">${desc}</p>
                <p class="stock-status" style="color: ${stockColor}; font-weight: bold; font-size: 0.8rem; margin-top: 4px;">${stockText}</p>
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
    const stockStateVal = document.getElementById('edit-card-stock').value;
    const inStock = (stockStateVal !== 'agotado');
    const image = document.getElementById('edit-card-image').value;

    const prod = adminCatalog.find(p => p.id === id);
    if (!prod) return;

    prod.name = name;
    prod.price = price;
    prod.description = desc;
    prod.inStock = inStock;
    prod.stockState = stockStateVal;
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
            customCards[idx].stockState = stockStateVal;
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
        overrides[id].stockState = stockStateVal;
        overrides[id].image = image || prod.image;
        localStorage.setItem('arcana_product_overrides', JSON.stringify(overrides));
    }

    notifyStorefrontUpdate();
    broadcastStorefrontSync();
    closeEditModal();
    renderAdminViews();
    updateAdminKPIs();
    showAdminToast(`Producto "${name}" modificado con éxito`);
}

// 16. Modal de Agregar Nueva Carta con Live Preview
function openAddCardModal() {
    playCyberSound('click');
    document.getElementById('add-card-name').value = '';
    document.getElementById('add-card-id').value = '';
    document.getElementById('add-card-price').value = '';
    document.getElementById('add-card-desc').value = '';
    document.getElementById('add-card-stock').value = 'en-stock';
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
    const stockStateVal = document.getElementById('add-card-stock').value;
    const inStock = (stockStateVal !== 'agotado');
    const imageCustom = document.getElementById('add-card-image-custom').value.trim();
    const imageSelect = document.getElementById('add-card-image').value;
    const image = imageCustom || imageSelect || 'Arcana_Logo.png';

    const previewContainer = document.getElementById('add-live-preview');
    if (!previewContainer) return;

    let stockText = 'En stock';
    let stockColor = '#00ff80';
    if (stockStateVal === 'pocas') {
        stockText = '¡ÚLTIMAS PIEZAS!';
        stockColor = '#ffd700';
    } else if (stockStateVal === 'agotado') {
        stockText = 'Agotado';
        stockColor = '#ff4444';
    }

    previewContainer.innerHTML = `
        <div class="game-card" style="width: 100%; max-width: 240px; margin: 0 auto; box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);">
            <img src="${image}" alt="${name}" class="${!inStock ? 'sold-out-img' : ''}" style="width: 100%; height: 140px; object-fit: cover;">
            <div class="game-info" style="padding: 12px;">
                <h3 style="font-size: 1rem;">${name}</h3>
                <p style="font-size: 0.8rem; margin: 4px 0;">${desc}</p>
                <p class="stock-status" style="color: ${stockColor}; font-weight: bold; font-size: 0.8rem; margin-top: 4px;">${stockText}</p>
                <h4 style="color: var(--neon-pink); margin-top: 6px; font-size: 0.95rem;">${price}</h4>
                <button class="cart-add-btn" style="margin-top: 8px; width: 100%; padding: 6px; font-size: 0.8rem; ${inStock ? '' : 'display: none;'}">Añadir al carrito</button>
                ${!inStock ? '<h4 style="color: #ff4444; font-size: 0.85rem; margin-top: 6px; font-weight: bold;">AGOTADO</h4>' : ''}
            </div>
        </div>
    `;
}

function toggleCustomCategoryInput() {
    playCyberSound('click');
    const group = document.getElementById('custom-category-group');
    const btnText = document.getElementById('toggle-cat-btn-text');
    if (group.style.display === 'none') {
        group.style.display = 'block';
        btnText.innerText = '- Usar punto de venta existente';
    } else {
        group.style.display = 'none';
        btnText.innerText = '+ Crear nuevo subtítulo';
        document.getElementById('add-custom-category-name').value = '';
    }
}

function saveNewCard(e) {
    if (e) e.preventDefault();
    playCyberSound('save');

    const name = document.getElementById('add-card-name').value.trim();
    let id = document.getElementById('add-card-id').value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const price = document.getElementById('add-card-price').value.trim();
    const desc = document.getElementById('add-card-desc').value.trim();
    const stockStateVal = document.getElementById('add-card-stock').value;
    const inStock = (stockStateVal !== 'agotado');
    const category = document.getElementById('add-card-category').value;
    const customTitle = document.getElementById('add-custom-category-name').value.trim();
    const imageCustom = document.getElementById('add-card-image-custom').value.trim();
    const imageSelect = document.getElementById('add-card-image').value;
    const image = imageCustom || imageSelect || 'Arcana_Logo.png';

    if (!id) {
        id = name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString().slice(-4);
    }

    if (adminCatalog.some(p => p.id === id)) {
        alert('Ya existe una carta con el ID "' + id + '". Por favor elige otro ID.');
        return;
    }

    const newCardObj = {
        id: id,
        name: name,
        category: category,
        saleType: customTitle ? `${category} (${customTitle})` : category,
        customCategoryTitle: customTitle,
        price: price,
        description: desc,
        image: image,
        inStock: inStock,
        stockState: stockStateVal,
        isCustomCard: true,
        filterClass: category.toLowerCase().replace(/[^a-z0-9]/g, '-')
    };

    const customCards = getCustomCards();
    customCards.push(newCardObj);
    localStorage.setItem('arcana_custom_cards', JSON.stringify(customCards));

    notifyStorefrontUpdate();
    broadcastStorefrontSync();
    closeAddModal();
    loadAdminCatalog();
    showAdminToast(`Nueva carta "${name}" agregada con éxito`);
}

// 17. Eliminar / Restaurar Cartas (Con Papelera Segura)
function deleteCard(id) {
    const prod = adminCatalog.find(p => p.id === id);
    if (!prod) return;

    if (!confirm(`¿Seguro que deseas eliminar la carta "${prod.name}" (ID: ${id}) de la tienda?`)) {
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
    broadcastStorefrontSync();
    loadAdminCatalog();
    showAdminToast(`Carta "${prod.name}" movida a la papelera`);
}

function restoreCard(id) {
    playCyberSound('save');
    const isCustom = !DEFAULT_PRODUCTS.some(dp => dp.id === id);
    let name = id;

    if (isCustom) {
        const customCards = getCustomCards();
        const idx = customCards.findIndex(c => c.id === id);
        if (idx !== -1) {
            name = customCards[idx].name;
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
    broadcastStorefrontSync();
    loadAdminCatalog();
    showAdminToast(`Carta "${name}" restaurada a la tienda`);
}

// 18. Configuración de WhatsApp y Mensaje Personalizado
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
    const phone = (config.phone || "528442279216").replace(/[^0-9]/g, '');
    const textEl = document.getElementById('wa-sim-text');
    if (!textEl) return;
    const encoded = encodeURIComponent(textEl.value);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
}

// 19. Respaldo y Restauración JSON
function exportBackupJSON() {
    playCyberSound('save');
    const data = {
        overrides: getProductOverrides(),
        customCards: getCustomCards(),
        whatsappConfig: getWhatsAppConfig(),
        version: "2.3",
        date: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arcana_respaldo_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showAdminToast('Copia de seguridad JSON descargada');
}

function importBackupJSON(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.overrides) localStorage.setItem('arcana_product_overrides', JSON.stringify(data.overrides));
            if (data.customCards) localStorage.setItem('arcana_custom_cards', JSON.stringify(data.customCards));
            if (data.whatsappConfig) localStorage.setItem('arcana_whatsapp_config', JSON.stringify(data.whatsappConfig));
            notifyStorefrontUpdate();
            broadcastStorefrontSync();
            loadAdminCatalog();
            playCyberSound('save');
            showAdminToast('Respaldo restaurado con éxito');
        } catch(err) {
            playCyberSound('delete');
            alert('Error: Archivo de respaldo no válido.');
        }
    };
    reader.readAsText(file);
    input.value = '';
}

function resetToDefaults() {
    if (confirm('¿Restablecer todo a los valores de fábrica? Se borrarán las cartas creadas y modificaciones.')) {
        playCyberSound('delete');
        localStorage.removeItem('arcana_product_overrides');
        localStorage.removeItem('arcana_custom_cards');
        localStorage.removeItem('arcana_whatsapp_config');
        notifyStorefrontUpdate();
        broadcastStorefrontSync();
        loadAdminCatalog();
        showAdminToast('Configuración restablecida a valores originales');
    }
}

// 20. Toast Cyber HUD
let adminToastTimeout = null;
function showAdminToast(message) {
    const toast = document.getElementById('admin-toast');
    const text = document.getElementById('admin-toast-text');
    if (!toast || !text) return;

    text.innerText = message;
    toast.style.display = 'flex';
    toast.style.opacity = '1';

    if (adminToastTimeout) clearTimeout(adminToastTimeout);
    adminToastTimeout = setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.style.display = 'none', 300);
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
        applyStorefrontCustomizations,
        getProductStockState,
        setProductStockAdvanced
    };
}
