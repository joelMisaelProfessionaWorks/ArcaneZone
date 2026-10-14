const fs = require('fs');
let html = fs.readFileSync('productos.html', 'utf-8');

// 1. Remove anual/12M strings from h4
html = html.replace(/\s*\|\s*Anual:\s*\$\d+\s*MXN/gi, '');
html = html.replace(/\s*\|\s*12M:\s*\$\d+\s*MXN/gi, '');
html = html.replace(/\s*\|\s*anual en\s*\$\d+\s*MXN/gi, '');

// 2. Add "Vix+ - Anual" card to the Streaming section (I will inject it after Vix+ Completa)
const vixCompleta = `<div class="game-card streaming-item completa">
                <img src="vix.jpg" alt="Vix Completa">
                <div class="game-info">
                    <h3>Vix+ - Completa</h3>
                    <p>Todo el contenido de Vix sin restricciones.</p>
                    <h4 style="color: var(--neon-pink); margin-top: 10px;">Precio: $75 x mes</h4>
                </div>
            </div>`;

const vixAnual = `
            <div class="game-card streaming-item completa">
                <img src="vix.jpg" alt="Vix Anual">
                <div class="game-info">
                    <h3>Vix+ - Anual</h3>
                    <p>Suscripción anual de Vix+ sin restricciones.</p>
                    <h4 style="color: var(--neon-pink); margin-top: 10px;">Precio: $170 MXN</h4>
                </div>
            </div>`;

if (html.includes('Vix+ - Completa')) {
    html = html.replace(
        /(<h3>Vix\+ - Completa<\/h3>[\s\S]*?<h4 style="color: var\(--neon-pink\); margin-top: 10px;">Precio: \$75 x mes)<\/h4>/g,
        '$1</h4>'
    ); // Ensure no trailing pipe
    // Actually just use indexOf and inject.
}

// Safer injection:
const injectTarget = '<h3>Vix+ - Completa</h3>';
if (html.includes(injectTarget)) {
    // Find the end of this game-card div
    const idx = html.indexOf(injectTarget);
    const endDiv = html.indexOf('</div>\n            </div>', idx);
    if (endDiv !== -1) {
        html = html.substring(0, endDiv + 30) + vixAnual + html.substring(endDiv + 30);
    }
}

// 3. Add "En stock" to streaming cards ONLY
// We will find all <div class="game-card streaming-item ...">
// and inject the <p class="stock-status"> inside <div class="game-info">
html = html.replace(
    /(<div class="game-card streaming-item[^>]*>[\s\S]*?<div class="game-info">)([\s\S]*?)(<h4)/g,
    `$1$2<p class="stock-status" style="color: #00ff00; font-weight: bold; font-size: 0.9rem; margin-top: 5px;">En stock</p>\n                    $3`
);

// 4. Add "Añadir al carrito" to ALL cards
html = html.replace(
    /(<h4 style="color: var\(--neon-pink\); margin-top: 10px;">.*?<\/h4>)/g,
    `$1\n                    <button class="cart-add-btn" onclick="addToCart(this)" style="margin-top: 10px; width: 100%; padding: 8px; border-radius: 5px; background: transparent; border: 1px solid var(--neon-pink); color: var(--neon-pink); cursor: pointer;">Añadir al carrito</button>`
);

// 5. Add Cart UI to the body (a floating button and a modal)
const cartUI = `
    <!-- Carrito Flotante -->
    <div id="cart-float" onclick="openCart()" style="position: fixed; bottom: 20px; right: 20px; background: var(--neon-pink); color: white; padding: 15px; border-radius: 50%; cursor: pointer; box-shadow: 0 0 10px var(--neon-pink); z-index: 1000; display: flex; align-items: center; justify-content: center;">
        <i class="fas fa-shopping-cart" style="font-size: 1.5rem;"></i>
        <span id="cart-count" style="position: absolute; top: -5px; right: -5px; background: white; color: var(--neon-pink); border-radius: 50%; padding: 2px 6px; font-size: 0.8rem; font-weight: bold;">0</span>
    </div>

    <!-- Modal del Carrito -->
    <div id="cart-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1001; justify-content: center; align-items: center;">
        <div style="background: var(--dark-bg); border: 2px solid var(--neon-pink); padding: 20px; border-radius: 10px; width: 90%; max-width: 400px; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: var(--neon-pink);">Tu Pedido</h2>
                <i class="fas fa-times" onclick="closeCart()" style="cursor: pointer; font-size: 1.5rem; color: white;"></i>
            </div>
            <div id="cart-items" style="margin-bottom: 20px;"></div>
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem; margin-bottom: 20px;">
                <span>Total:</span>
                <span style="color: var(--neon-pink);">$<span id="cart-total">0</span> MXN</span>
            </div>
            <button onclick="checkoutWhatsApp()" style="width: 100%; padding: 10px; border: none; background: #25D366; color: white; font-weight: bold; border-radius: 5px; cursor: pointer; font-size: 1.1rem;"><i class="fab fa-whatsapp"></i> Pedir por WhatsApp</button>
        </div>
    </div>
`;
html = html.replace('</body>', cartUI + '\n</body>');

fs.writeFileSync('productos.html', html, 'utf-8');
console.log("HTML Modified.");
