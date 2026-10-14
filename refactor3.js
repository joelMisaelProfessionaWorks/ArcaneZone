const fs = require('fs');
let html = fs.readFileSync('productos.html', 'utf-8');

const oldCartModal = `<div id="cart-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1001; justify-content: center; align-items: center;">
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

const newCartModal = `<div id="cart-modal" class="modal-overlay">
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

// And replace the lingering games-container inline style
html = html.replace(/<div class="streaming-grid" style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; padding: 0 5%;">/g, '<div class="streaming-grid games-container">');
html = html.replace(/<div style="padding-top: 100px; background: var\(--dark-bg\);"><\/div>/g, '<div class="spacer"></div>');

fs.writeFileSync('productos.html', html, 'utf-8');

let css = fs.readFileSync('style.css', 'utf-8');
if (!css.includes('.spacer')) {
    css += `\n.spacer { padding-top: 100px; background: var(--dark-bg); }\n`;
    fs.writeFileSync('style.css', css, 'utf-8');
}
console.log("Fixed cart modal");
