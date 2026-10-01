const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. MANEJO DE PREFLIGHT (CORS OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 2. PETICIÓN GET (LEER DATOS)
      if (url.pathname === "/api/productos" && request.method === "GET") {
        const { results: products } = await env.DB.prepare("SELECT * FROM products").all();
        const { results: variants } = await env.DB.prepare("SELECT * FROM product_variants").all();
        
        // Juntar los productos con sus variantes de precio
        const productsWithVariants = products.map(p => ({
          ...p,
          variants: variants.filter(v => v.product_id === p.id)
        }));

        return new Response(JSON.stringify(productsWithVariants), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // 3. PETICIÓN POST PARA ADMIN (ACTUALIZAR STOCK)
      if (url.pathname === "/api/admin/toggle" && request.method === "POST") {
        const body = await request.json();
        await env.DB.prepare("UPDATE products SET is_active = ? WHERE id = ?")
          .bind(body.is_active ? 1 : 0, body.id)
          .run();
        return new Response(JSON.stringify({success: true}), { 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response("Not found", { status: 404, headers: corsHeaders });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }
  },
};
