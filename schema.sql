DROP TABLE IF EXISTS product_variants;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT 1
);

CREATE TABLE product_variants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER,
  name TEXT, -- Ej: "1 Mes", "12 Meses", "QR", "Normal"
  price REAL NOT NULL,
  FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Datos iniciales de prueba (se pueden editar luego en el admin)
INSERT INTO products (id, name, description, category, image_url) VALUES 
(1, 'Netflix - Perfil', 'Perfil individual para disfrutar tus series.', 'perfil', 'netflix.jpg'),
(2, 'Vix+ - Perfil', 'Perfil individual para novelas y deportes.', 'perfil', 'vix.jpg'),
(3, 'Paramount+ - Completa', 'Cuenta completa para todos tus dispositivos.', 'completa', 'paramount.png'),
(4, 'Spotify premium De 1 mes', 'Disfruta de canciones y playlist sin anuncios.', 'spotify', 'spotify.jpg');

INSERT INTO product_variants (product_id, name, price) VALUES 
(1, 'Normal', 85),
(1, 'QR', 80),
(2, '1 Mes', 45),
(2, '2 Meses', 65),
(2, '12 Meses', 175),
(3, 'Único', 85),
(4, 'Único', 70);
