const fs = require('fs');
let html = fs.readFileSync('productos.html', 'utf-8');
html = html.replace('<i class="fas fa-shopping-cart" style="font-size: 1.5rem;"></i>', '<i class="fas fa-shopping-cart cart-icon"></i>');
fs.writeFileSync('productos.html', html, 'utf-8');

let css = fs.readFileSync('style.css', 'utf-8');
if (!css.includes('.cart-icon')) {
    css += '\n.cart-icon { font-size: 1.5rem; }\n';
    fs.writeFileSync('style.css', css, 'utf-8');
}
