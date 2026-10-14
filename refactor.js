const fs = require('fs');

// 1. UPDATE STYLE.CSS
let css = fs.readFileSync('style.css', 'utf-8');

const newCSS = `

/* -----------------------------------------
   13. COMPONENTES Y UTILIDADES NUEVAS (Carrito, Modales, Botones)
   ----------------------------------------- */
.games-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 0 5%;
}
.game-price {
    color: var(--neon-pink);
    margin-top: 10px;
}
.stock-status {
    color: #00ff00;
    font-weight: bold;
    font-size: 0.9rem;
    margin-top: 5px;
}
.stock-status.agotado {
    color: #ff0000;
}
.cart-add-btn {
    margin-top: 10px;
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    background: transparent;
    border: 1px solid var(--neon-pink);
    color: var(--neon-pink);
    cursor: pointer;
    transition: 0.3s;
}
.cart-add-btn:hover {
    background: var(--neon-pink);
    color: var(--dark-bg);
}

/* Float Cart */
#cart-float {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--neon-pink);
    color: white;
    padding: 15px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px var(--neon-pink);
    z-index: 1000;
    display: none; /* controlled by JS */
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
}
#cart-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background: white;
    color: var(--neon-pink);
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.8rem;
    font-weight: bold;
}

/* Modals */
.modal-overlay {
    display: none; /* controlled by JS */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 1001;
    justify-content: center;
    align-items: center;
}
.modal-content {
    background: var(--dark-bg);
    border: 2px solid var(--neon-pink);
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    text-align: left;
}
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.modal-title {
    color: var(--neon-pink);
    font-size: 1.5rem;
}
#variant-title {
    color: var(--neon-blue);
}
.modal-close {
    cursor: pointer;
    font-size: 1.5rem;
    color: white;
}
.modal-close:hover {
    color: var(--neon-pink);
}

/* Cart Items */
.cart-items-container {
    margin-bottom: 20px;
}
.cart-item-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 5px;
}
.cart-item-name {
    color: white;
}
.cart-item-variant {
    color: gray;
    font-size: 0.85em;
    margin-left: 5px;
}
.cart-item-price {
    color: var(--neon-pink);
    margin-right: 10px;
}
.cart-item-delete {
    color: #ff4444;
    cursor: pointer;
}
.cart-item-delete:hover {
    color: #ff0000;
}
.cart-total-row {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 20px;
}
.cart-total-price {
    color: var(--neon-pink);
}
.whatsapp-btn {
    width: 100%;
    padding: 10px;
    border: none;
    background: #25D366;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: 0.3s;
}
.whatsapp-btn:hover {
    background: #1eb955;
}

/* Variant Options */
.variant-options-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.variant-btn {
    padding: 10px;
    background: transparent;
    border: 1px solid var(--neon-pink);
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    transition: 0.3s;
    text-align: left;
    display: flex;
    justify-content: space-between;
}
.variant-btn:hover {
    background: var(--neon-pink);
    color: var(--dark-bg);
}
`;

if (!css.includes('COMPONENTS Y UTILIDADES NUEVAS') && !css.includes('COMPONENTES Y UTILIDADES NUEVAS')) {
    css += newCSS;
    fs.writeFileSync('style.css', css, 'utf-8');
}


// 2. UPDATE HTML
let html = fs.readFileSync('productos.html', 'utf-8');

// Replace inline styles with classes
html = html.replace(/<div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; padding: 0 5%;">/g, '<div class="games-container">');

html = html.replace(/style="color: var\(--neon-pink\); margin-top: 10px;"/g, 'class="game-price"');

html = html.replace(/style="color: #00ff00; font-weight: bold; font-size: 0.9rem; margin-top: 5px;"/g, '');

html = html.replace(/style="margin-top: 10px; width: 100%; padding: 8px; border-radius: 5px; background: transparent; border: 1px solid var\(--neon-pink\); color: var\(--neon-pink\); cursor: pointer;"/g, '');

const oldCartModal = `    <!-- Carrito Flotante -->
    <div id="cart-float" onclick="openCart()" style="position: fixed; bottom: 20px; right: 20px; background: var(--neon-pink); color: white; padding: 15px; border-radius: 50%; cursor: pointer; box-shadow: 0 0 10px var(--neon-pink); z-index: 1000; display: none; align-items: center; justify-content: center;">
        <i class="fas fa-shopping-cart" style="font-size: 1.5rem;"></i>
        <span id="cart-count" style="position: absolute; top: -5px; right: -5px; background: white; color: var(--neon-pink); border-radius: 50%; padding: 2px 6px; font-size: 0.8rem; font-weight: bold;">0</span>
    </div>

    <!-- Modal de Variantes -->
    <div id="variant-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1002; justify-content: center; align-items: center;">
        <div style="background: var(--dark-bg); border: 2px solid var(--neon-pink); padding: 20px; border-radius: 10px; width: 90%; max-width: 400px; text-align: center;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 id="variant-title" style="color: var(--neon-blue); font-size: 1.5rem; text-align: left;">Elige una opción</h2>
                <i class="fas fa-times" onclick="closeVariantModal()" style="cursor: pointer; font-size: 1.5rem; color: white;"></i>
            </div>
            <div id="variant-options" style="display: flex; flex-direction: column; gap: 10px;">
                <!-- Botones generados dinámicamente -->
            </div>
        </div>
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
    </div>`;

const newCartModal = `    <!-- Carrito Flotante -->
    <div id="cart-float" onclick="openCart()">
        <i class="fas fa-shopping-cart" style="font-size: 1.5rem;"></i>
        <span id="cart-count">0</span>
    </div>

    <!-- Modal de Variantes -->
    <div id="variant-modal" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="variant-title" class="modal-title">Elige una opción</h2>
                <i class="fas fa-times modal-close" onclick="closeVariantModal()"></i>
            </div>
            <div id="variant-options" class="variant-options-container">
                <!-- Botones generados dinámicamente -->
            </div>
        </div>
    </div>

    <!-- Modal del Carrito -->
    <div id="cart-modal" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Tu Pedido</h2>
                <i class="fas fa-times modal-close" onclick="closeCart()"></i>
            </div>
            <div id="cart-items" class="cart-items-container"></div>
            <div class="cart-total-row">
                <span>Total:</span>
                <span class="cart-total-price">$<span id="cart-total">0</span> MXN</span>
            </div>
            <button onclick="checkoutWhatsApp()" class="whatsapp-btn"><i class="fab fa-whatsapp"></i> Pedir por WhatsApp</button>
        </div>
    </div>`;

html = html.replace(oldCartModal, newCartModal);

// Also replace any lingering spaces inside tags
html = html.replace(/<p class="stock-status"\s*>/g, '<p class="stock-status">');
html = html.replace(/<button class="cart-add-btn"\s*onclick="addToCart\(this\)"\s*>/g, '<button class="cart-add-btn" onclick="addToCart(this)">');

fs.writeFileSync('productos.html', html, 'utf-8');

// 3. UPDATE SCRIPT.JS
let js = fs.readFileSync('script.js', 'utf-8');

js = js.replace(/btn\.style\.cssText = ".*?";/g, 'btn.className = "variant-btn";');
js = js.replace(/btn\.onmouseover = .*?;/g, '');
js = js.replace(/btn\.onmouseout = .*?;/g, '');

const oldCartItemHtml = `<div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;">
                <span style="color: white;">\${item.name} <small style="color: gray;">\${variantText}</small></span>
                <span><span style="color: var(--neon-pink); margin-right: 10px;">$\${item.price}</span> <i class="fas fa-trash" style="color: red; cursor:pointer;" onclick="removeFromCart(\${index})"></i></span>
            </div>`;

const newCartItemHtml = `<div class="cart-item-row">
                <span class="cart-item-name">\${item.name} <span class="cart-item-variant">\${variantText}</span></span>
                <span><span class="cart-item-price">$\${item.price}</span> <i class="fas fa-trash cart-item-delete" onclick="removeFromCart(\${index})"></i></span>
            </div>`;

js = js.replace(oldCartItemHtml, newCartItemHtml);

// 4. FIX SPELLING/GRAMMAR IN HTML
let indexHtml = fs.readFileSync('index.html', 'utf-8');
indexHtml = indexHtml.replace(/Precios acce[cs]ibles/gi, 'Precios accesibles');
indexHtml = indexHtml.replace(/Garanti[aá] sobre/gi, 'Garantía sobre');
fs.writeFileSync('index.html', indexHtml, 'utf-8');

console.log("Refactoring complete");
