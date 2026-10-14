const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf-8');

const regex = /itemsContainer\.innerHTML \+= `[\s\S]*?`;/g;
const newStr = `itemsContainer.innerHTML += \`
            <div class="cart-item-row">
                <span class="cart-item-name">\${item.name} <span class="cart-item-variant">\${variantText}</span></span>
                <span><span class="cart-item-price">$\${item.price}</span> <i class="fas fa-trash cart-item-delete" onclick="removeFromCart(\${index})"></i></span>
            </div>
        \`;`;

js = js.replace(regex, newStr);

// Let's also verify we don't have .style.display left around for things that should use classes
// wait, we changed display to flex/none for cart-float using cart-float-hidden and cart-float-visible
fs.writeFileSync('script.js', js, 'utf-8');
console.log('Fixed script.js inline styles');
