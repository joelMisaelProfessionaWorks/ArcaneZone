const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf-8');

const regexAddToCart = /function addToCart\(btnElement\) \{[\s\S]*?\}\s*function updateCartUI\(\)/;

const newAddToCart = `function addToCart(btnElement) {
    const card = btnElement.closest('.game-card');
    const title = card.querySelector('h3').innerText;
    const priceElement = card.querySelector('h4[style*="color: var(--neon-pink)"]');
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
    document.getElementById('variant-title').innerText = title;
    const container = document.getElementById('variant-options');
    container.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = \`\${opt.name} - $\${opt.price} MXN\`;
        btn.style.cssText = "padding: 10px; background: transparent; border: 1px solid var(--neon-pink); color: white; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 1rem; transition: 0.3s; text-align: left; display: flex; justify-content: space-between;";
        btn.onmouseover = () => { btn.style.background = "var(--neon-pink)"; btn.style.color = "var(--dark-bg)"; };
        btn.onmouseout = () => { btn.style.background = "transparent"; btn.style.color = "white"; };
        btn.onclick = () => {
            finishAddToCart(title, opt);
            closeVariantModal();
        };
        container.appendChild(btn);
    });
    document.getElementById('variant-modal').style.display = 'flex';
}

function closeVariantModal() {
    document.getElementById('variant-modal').style.display = 'none';
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

function updateCartUI()`;

js = js.replace(regexAddToCart, newAddToCart);
fs.writeFileSync('script.js', js, 'utf-8');
console.log("JS Modified.");
