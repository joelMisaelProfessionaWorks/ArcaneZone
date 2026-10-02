// ==========================================
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
