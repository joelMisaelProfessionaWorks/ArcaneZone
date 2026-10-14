const fs = require('fs');

let html = fs.readFileSync('productos.html', 'utf-8');

const variantModal = `
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
`;

if (!html.includes('id="variant-modal"')) {
    html = html.replace('<!-- Modal del Carrito -->', variantModal + '\n    <!-- Modal del Carrito -->');
    fs.writeFileSync('productos.html', html, 'utf-8');
}
console.log("HTML Modified.");
