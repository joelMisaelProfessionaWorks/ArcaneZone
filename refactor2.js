const fs = require('fs');
let html = fs.readFileSync('productos.html', 'utf-8');

// Replace the old modals with the new clean ones using regex to match the id
const cartFloatRegex = /<div id="cart-float"[\s\S]*?<\/div>/;
const cartModalRegex = /<div id="cart-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const variantModalRegex = /<div id="variant-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newCartFloat = `    <div id="cart-float" class="cart-float-hidden" onclick="openCart()">
        <i class="fas fa-shopping-cart" style="font-size: 1.5rem;"></i>
        <span id="cart-count">0</span>
    </div>`;

const newVariantModal = `    <div id="variant-modal" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="variant-title" class="modal-title">Elige una opción</h2>
                <i class="fas fa-times modal-close" onclick="closeVariantModal()"></i>
            </div>
            <div id="variant-options" class="variant-options-container">
            </div>
        </div>
    </div>`;

const newCartModal = `    <div id="cart-modal" class="modal-overlay">
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

html = html.replace(cartFloatRegex, newCartFloat);
html = html.replace(variantModalRegex, newVariantModal);
html = html.replace(cartModalRegex, newCartModal);

fs.writeFileSync('productos.html', html, 'utf-8');

// Also update script.js to change cartFloat class instead of style
let js = fs.readFileSync('script.js', 'utf-8');
js = js.replace(/cartFloat\.style\.display = 'flex';/g, 'cartFloat.className = "cart-float-visible";');
js = js.replace(/cartFloat\.style\.display = 'none';/g, 'cartFloat.className = "cart-float-hidden";');
js = js.replace(/document\.getElementById\('variant-modal'\)\.style\.display = 'flex';/g, 'document.getElementById("variant-modal").style.display = "flex";');

fs.writeFileSync('script.js', js, 'utf-8');

// Also add cart-float-visible to style.css
let css = fs.readFileSync('style.css', 'utf-8');
css += `
.cart-float-hidden { display: none !important; }
.cart-float-visible { display: flex !important; }
`;
fs.writeFileSync('style.css', css, 'utf-8');

console.log('Fixed');
