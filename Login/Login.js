let compareProductsIds = [];

// Catálogo inicial predeterminado
const defaultProducts = [
  {
    id: 101,
    name: "Apple iPhone 12 (128GB)",
    category: "iphones",
    price: 320,
    stock: 5,
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=600&q=80",
    desc: "Chip A14 Bionic, pantalla Super Retina XDR OLED de 6.1'', conectividad 5G y doble cámara con modo noche."
  },
  {
    id: 102,
    name: "Apple iPhone 13 (128GB)",
    category: "iphones",
    price: 430,
    stock: 4,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
    desc: "Chip A15 Bionic, mayor autonomía de batería, estabilización óptica por desplazamiento y modo cine."
  },
  {
    id: 103,
    name: "Apple iPhone 14 Pro (256GB)",
    category: "iphones",
    price: 640,
    stock: 3,
    image: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&w=600&q=80",
    desc: "Dynamic Island interactiva, chip A16 Bionic, pantalla Always-On a 120Hz ProMotion y cámara principal de 48MP."
  },
  {
    id: 104,
    name: "Apple iPhone 15 (128GB) USB-C",
    category: "iphones",
    price: 680,
    stock: 5,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    desc: "Conexión USB-C estándar, Dynamic Island integrada, cámara de 48MP con zoom óptico 2x y cristal tintado en masa."
  },
  {
    id: 105,
    name: "Apple iPhone 16 Pro Max (256GB)",
    category: "iphones",
    price: 1090,
    stock: 2,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
    desc: "Diseño en titanio grado 5, botón Capture Control dedicado, chip A18 Pro y zoom periscópico de 5 aumentos."
  },
  {
    id: 106,
    name: "Apple iPhone 17 Pro Max (256GB)",
    category: "iphones",
    price: 1250,
    stock: 3,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    desc: "Chip A19 Pro optimizado para inteligencia artificial, sistema térmico con cámara de vapor y pantalla de 6.9'' ultra brillante."
  },
  {
    id: 107,
    name: "Apple iPhone 18 Pro (256GB)",
    category: "iphones",
    price: 1380,
    stock: 2,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=600&q=80",
    desc: "Procesador A20 Pro de 2nm, sensor con apertura variable avanzada, Dynamic Island compacta y batería de grafeno."
  },
  {
    id: 201,
    name: "Samsung Galaxy S24 Ultra (512GB)",
    category: "celulares",
    price: 990,
    stock: 4,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    desc: "Marco de titanio, pantalla plana Dynamic AMOLED 2X, S-Pen integrado y funciones Galaxy AI en vivo."
  },
  {
    id: 202,
    name: "Xiaomi Redmi Note 13 Pro+ 5G",
    category: "celulares",
    price: 330,
    stock: 6,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    desc: "Cámara insignia de 200MP OIS, carga hiperrápida de 120W y protección certificada IP68 contra agua y polvo."
  },
  {
    id: 203,
    name: "Motorola Edge 50 Ultra",
    category: "celulares",
    price: 720,
    stock: 3,
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80",
    desc: "Snapdragon 8s Gen 3, pantalla pOLED 144Hz, acabado en madera natural o cuero vegano y teleobjetivo 3x."
  },
  {
    id: 301,
    name: "PlayStation 4 Slim (1TB)",
    category: "consolas",
    price: 210,
    stock: 5,
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=600&q=80",
    desc: "Incluye mando DualShock 4 original, cables de alimentación y HDMI. Gran catálogo de títulos exclusivos."
  },
  {
    id: 302,
    name: "PlayStation 4 Pro (1TB) 4K",
    category: "consolas",
    price: 270,
    stock: 4,
    image: "https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&w=600&q=80",
    desc: "Mayor potencia gráfica para juegos a resolución dinámica 4K y tasas de fotogramas por segundo más estables."
  },
  {
    id: 303,
    name: "PlayStation 5 Slim Edición Digital",
    category: "consolas",
    price: 440,
    stock: 5,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
    desc: "Chasis ultra compacto, 1TB SSD ultrarrápido, retroalimentación háptica en gatillos del mando inalámbrico DualSense."
  },
  {
    id: 304,
    name: "PlayStation 5 Slim (Lector de Disco)",
    category: "consolas",
    price: 495,
    stock: 4,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    desc: "Compatibilidad con juegos físicos en Blu-Ray 4K Ultra HD y discos de PS4. Incluye base de soporte y DualSense."
  },
  {
    id: 305,
    name: "PlayStation 5 Pro (2TB SSD)",
    category: "consolas",
    price: 780,
    stock: 2,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    desc: "PlayStation Spectral Super Resolution (PSSR), trazado de rayos (Ray Tracing) acelerado y rendimiento constante a 60-120 FPS."
  },
  {
    id: 401,
    name: "Apple AirPods (3ra Generación)",
    category: "audio",
    price: 155,
    stock: 8,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
    desc: "Audio espacial personalizado con seguimiento dinámico de cabeza, estuche de carga Lightning/MagSafe y resistencia al sudor."
  },
  {
    id: 402,
    name: "Apple AirPods Pro (2da Gen) USB-C",
    category: "audio",
    price: 215,
    stock: 6,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=600&q=80",
    desc: "Cancelación activa de ruido 2x superior, modo ambiente adaptativo, audio Lossless y estuche con altavoz localizador."
  },
  {
    id: 403,
    name: "Apple AirPods Max Diadema",
    category: "audio",
    price: 480,
    stock: 3,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    desc: "Almohadillas viscoelásticas de diseño acústico, ecualización adaptativa, transductor dinámico diseñado por Apple."
  },
  {
    id: 501,
    name: "Memoria Kingston DataTraveler 32GB USB 3.2",
    category: "almacenamiento",
    price: 6,
    stock: 20,
    image: "https://images.unsplash.com/photo-1624823183493-559591e1d034?auto=format&fit=crop&w=600&q=80",
    desc: "Diseño retráctil práctico, velocidad USB 3.2 Gen 1 para transferencias ágiles de documentos y trabajos."
  },
  {
    id: 502,
    name: "Memoria SanDisk Ultra Flare 64GB USB 3.0",
    category: "almacenamiento",
    price: 10,
    stock: 15,
    image: "https://images.unsplash.com/photo-1618764400608-9e7115eabb74?auto=format&fit=crop&w=600&q=80",
    desc: "Cuerpo metálico resistente y disipador, velocidades de lectura de hasta 150MB/s con protección por contraseña."
  },
  {
    id: 503,
    name: "Memoria Kingston Exodia M 128GB USB 3.2",
    category: "almacenamiento",
    price: 15,
    stock: 12,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
    desc: "Capacidad ideal para llevar instaladores de sistemas, películas, música y respaldos completos."
  },
  {
    id: 504,
    name: "Memoria SanDisk Ultra Dual Drive 256GB USB-C/A",
    category: "almacenamiento",
    price: 26,
    stock: 8,
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=600&q=80",
    desc: "Doble conector reversible Tipo C y Tipo A: pasa fotos directo desde tu celular a la PC sin cables."
  },
  {
    id: 505,
    name: "SSD NVMe Kingston NV2 1TB PCIe 4.0",
    category: "almacenamiento",
    price: 65,
    stock: 10,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
    desc: "Lectura hasta 3500MB/s. Aumenta drásticamente la velocidad de arranque y carga de programas en laptops y PCs."
  },
  {
    id: 506,
    name: "SSD Samsung 990 PRO 2TB NVMe M.2 (Con Disipador)",
    category: "almacenamiento",
    price: 165,
    stock: 5,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    desc: "Velocidad tope de hasta 7450MB/s. 100% compatible y recomendado para expandir el almacenamiento en PlayStation 5."
  },
  {
    id: 507,
    name: "Disco Duro Externo WD Elements 2TB USB 3.0",
    category: "almacenamiento",
    price: 68,
    stock: 6,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    desc: "Copia de seguridad externa para fotos, videos y juegos de PS4/PS5. Conexión plug and play sin enchufes extra."
  },
  {
    id: 508,
    name: "Disco Duro Interno Seagate Barracuda 2TB 3.5''",
    category: "almacenamiento",
    price: 52,
    stock: 7,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
    desc: "7200 RPM, 256MB caché, conexión SATA 6Gb/s. Almacenamiento masivo confiable para torres de escritorio."
  },
  {
    id: 601,
    name: "Memoria RAM Kingston Fury Beast 16GB DDR4 3200MHz",
    category: "hardware",
    price: 42,
    stock: 12,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
    desc: "Disipador de calor de perfil bajo en color negro. Soporta perfiles Intel XMP y AMD Ryzen para máxima estabilidad."
  },
  {
    id: 602,
    name: "Kit RAM Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz",
    category: "hardware",
    price: 118,
    stock: 4,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    desc: "Rendimiento extremo de última generación para placas base Intel de 14va generación y AMD AM5."
  },
  {
    id: 603,
    name: "Memoria RAM Crucial 8GB DDR4 SODIMM (Para Laptop)",
    category: "hardware",
    price: 24,
    stock: 9,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
    desc: "Actualización económica para acelerar laptops lentas que tienen 4GB u 8GB de fábrica. Instalación inmediata."
  },
  {
    id: 701,
    name: "PC Gamer KEHO Ryzen 5 + RTX 4060",
    category: "computadoras",
    price: 890,
    stock: 3,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
    desc: "Ryzen 5 5600X, 16GB DDR4, SSD NVMe 1TB, Fuente 650W 80+ Bronze, gabinete con cristal templado y 4 ventiladores RGB."
  },
  {
    id: 702,
    name: "Apple MacBook Air 13'' Chip M2 (256GB)",
    category: "computadoras",
    price: 980,
    stock: 2,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    desc: "Diseño ultraligero y silencioso (sin ventiladores), pantalla Liquid Retina de 13.6'' y batería de hasta 18 horas."
  },
  {
    id: 703,
    name: "Laptop ASUS TUF Gaming A15",
    category: "computadoras",
    price: 840,
    stock: 3,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    desc: "AMD Ryzen 7, 16GB RAM, RTX 4050 6GB, pantalla IPS 144Hz y certificación de durabilidad militar."
  },
  {
    id: 801,
    name: "Pantalla Netflix 4K UHD (1 Mes)",
    category: "streaming",
    price: 4,
    stock: 25,
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&q=80",
    desc: "Perfil privado con pin de seguridad propio, resolución 4K Ultra HD y audio espacial. Garantía mensual completa."
  },
  {
    id: 802,
    name: "Cuenta Disney+ & Star+ (1 Mes)",
    category: "streaming",
    price: 3.5,
    stock: 20,
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&q=80",
    desc: "Acceso total a películas familiares, series de Marvel, Star Wars y todos los eventos deportivos en vivo de ESPN."
  },
  {
    id: 803,
    name: "Suscripción Max (HBO) Estándar",
    category: "streaming",
    price: 3.5,
    stock: 20,
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=600&q=80",
    desc: "Series de calidad, estrenos de cine de Warner Bros, Champions League en vivo y contenido para toda la familia."
  },
  {
    id: 804,
    name: "Spotify Premium Individual (3 Meses)",
    category: "streaming",
    price: 7,
    stock: 18,
    image: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=600&q=80",
    desc: "Música sin anuncios publicitarios, saltos ilimitados de canciones y opción de descarga offline en alta fidelidad."
  },
  {
    id: 901,
    name: "Licencia Microsoft 365 Personal (1 Año)",
    category: "licencias",
    price: 45,
    stock: 15,
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=600&q=80",
    desc: "Suscripción oficial directa para tu cuenta. Incluye Word, Excel, PowerPoint y 1TB de almacenamiento en OneDrive."
  },
  {
    id: 902,
    name: "Licencia Windows 11 Pro OEM Original",
    category: "licencias",
    price: 28,
    stock: 20,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80",
    desc: "Clave digital para activación de por vida en 1 equipo. Habilita BitLocker, escritorio remoto y actualizaciones."
  },
  {
    id: 903,
    name: "Mantenimiento Preventivo y Limpieza",
    category: "servicios",
    price: 25,
    stock: 10,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
    desc: "Limpieza interna exhaustiva con aire comprimido, cambio de pasta térmica de alta conductividad y diagnóstico."
  },
  {
    id: 904,
    name: "Formateo e Instalación de Sistema",
    category: "servicios",
    price: 20,
    stock: 10,
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80",
    desc: "Instalación desde cero de Windows 10/11 o Linux con utilitarios, antivirus, paquetería de oficina y optimización."
  }
];

function getLiveProducts() {
  const stored = localStorage.getItem("keho_products_db");
  if (!stored) {
    localStorage.setItem("keho_products_db", JSON.stringify(defaultProducts));
    return defaultProducts;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultProducts;
  }
}

const availableCoupons = {
  "KEHO10": 0.10,
  "SUPERVIP": 0.20
};

// Variables de estado
let cart = [];
let favorites = [];
let currentUser = null;
let currentCategory = "todos";
let searchTerm = "";
let selectedProductForQty = null;
let appliedDiscountRate = 0;
let currentDeliveryCost = 3.00;

// ==========================================
// 1. GESTIÓN DE SESIÓN Y MENÚ DE PERFIL
// ==========================================
function loadSavedUser() {
  const saved = localStorage.getItem("keho_user");
  currentUser = saved ? JSON.parse(saved) : null;
  renderUserUI();
}

function renderUserUI() {
  const userArea = document.getElementById("userArea");
  if (!userArea) return;

  if (!currentUser) {
    userArea.innerHTML = `
      <a href="../Iniciar/Iniciar.html" class="btn btn-outline" style="text-decoration: none; display: inline-flex; align-items: center; justify-content: center;">Ingresar</a>
    `;
    return;
  }

  const initial = (currentUser.name || "U").charAt(0).toUpperCase();
  const fullName = currentUser.fullName || currentUser.name || "Usuario";
  const email = currentUser.email || "usuario@correo.com";
  const authType = currentUser.authMethod === "google" ? "Cuenta Google" : "Cliente Verificado";

  userArea.innerHTML = `
    <button class="user-profile-trigger" id="userProfileBtn" type="button">
      <div class="user-avatar-small">${initial}</div>
      <span class="user-name-label">${currentUser.name}</span>
      <span class="user-chevron">▼</span>
    </button>

    <div class="profile-dropdown" id="profileDropdown">
      <div class="dropdown-user-header">
        <span class="dropdown-full-name">${fullName}</span>
        <span class="dropdown-email">${email}</span>
        <span class="dropdown-auth-badge">${authType}</span>
      </div>

      <button type="button" class="btn-dropdown-option" id="openClientOrdersBtn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <span>Mis Pedidos & Compras</span>
      </button>

      <button type="button" class="btn-trigger-logout" id="triggerLogoutBtn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span>Cerrar sesión</span>
      </button>
    </div>
  `;

  const btn = document.getElementById("userProfileBtn");
  const dropdown = document.getElementById("profileDropdown");
  const openOrdersBtn = document.getElementById("openClientOrdersBtn");
  const logoutBtn = document.getElementById("triggerLogoutBtn");
  const logoutModal = document.getElementById("logoutModal");

  if (btn && dropdown) {
    btn.onclick = (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    };
  }

  if (openOrdersBtn) {
    openOrdersBtn.onclick = () => {
      if (dropdown) dropdown.classList.remove("open");
      abrirModalHistorialCliente();
    };
  }

  if (logoutBtn && logoutModal) {
    logoutBtn.onclick = () => {
      if (dropdown) dropdown.classList.remove("open");
      logoutModal.classList.add("open");
    };
  }
}

// ==========================================
// 2. FAVORITOS (WISHLIST)
// ==========================================
function loadFavoritesFromStorage() {
  const saved = localStorage.getItem("keho_favorites");
  if (saved) {
    try {
      favorites = JSON.parse(saved);
    } catch (e) {
      favorites = [];
    }
  }
  updateFavoritesUI();
}

function saveFavoritesToStorage() {
  localStorage.setItem("keho_favorites", JSON.stringify(favorites));
}

window.toggleFavorito = function(productId) {
  const savedUser = localStorage.getItem("keho_user");
  if (!savedUser) {
    const authModal = document.getElementById("authRequiredModal");
    if (authModal) authModal.classList.add("open");
    return;
  }

  const productsList = getLiveProducts();
  const product = productsList.find(p => p.id === productId);
  if (!product) return;

  const index = favorites.findIndex(f => f.id === productId);

  if (index !== -1) {
    favorites.splice(index, 1);
    showModernToast(`Eliminado de favoritos: "${product.name}"`, "warning");
  } else {
    favorites.push(product);
    showModernToast(`❤️ ¡Guardado en tus favoritos!`, "success");
  }

  saveFavoritesToStorage();
  updateFavoritesUI();
  renderProducts();
};

function updateFavoritesUI() {
  const countEl = document.getElementById("favoritesCount");
  const listEl = document.getElementById("favoritesItemsList");

  if (countEl) countEl.textContent = favorites.length;
  if (!listEl) return;

  if (favorites.length === 0) {
    listEl.innerHTML = `<p class="empty-cart-msg">Aún no has guardado productos favoritos.</p>`;
    return;
  }

  listEl.innerHTML = favorites.map(item => `
    <div class="cart-item">
      <div style="display: flex; gap: 10px; align-items: center;">
        <img src="${item.image}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 6px;">
        <div>
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
      </div>
      <div style="display: flex; gap: 6px; align-items: center;">
        <button type="button" class="btn btn-outline btn-add-product" data-target-id="${item.id}" style="padding: 4px 8px; font-size: 0.75rem;">Añadir</button>
        <button class="btn-remove-item" onclick="window.toggleFavorito(${item.id})">✕</button>
      </div>
    </div>
  `).join("");
}

// ==========================================
// 3. MODO CLARO / OSCURO (TOGGLE TEMA)
// ==========================================
function setupThemeToggle() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  const savedTheme = localStorage.getItem("keho_catalog_theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    if (themeToggleBtn) themeToggleBtn.textContent = "🌙";
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const isLight = document.body.classList.contains("light-theme");

      themeToggleBtn.textContent = isLight ? "🌙" : "☀️";
      localStorage.setItem("keho_catalog_theme", isLight ? "light" : "dark");
    });
  }
}

// ==========================================
// 4. RENDERIZADO DEL CATÁLOGO
// ==========================================
function renderProducts() {
  const productsGrid = document.getElementById("productsGrid");
  if (!productsGrid) return;

  const productsList = getLiveProducts();

  const filtered = productsList.filter(item => {
    const matchesCategory = currentCategory === "todos" || item.category === currentCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-catalog-box">
        <div class="empty-icon">🔍</div>
        <h3>No se encontraron resultados</h3>
        <p style="color: var(--text-muted); font-size: 0.88rem;">No existen productos que coincidan con "${searchTerm}".</p>
        <button class="btn btn-outline" onclick="resetFilters()">Ver todos los productos</button>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(item => {
    const isOutOfStock = item.isUnavailable || item.stock <= 0;
    const isFav = favorites.some(f => f.id === item.id);

    return `
      <article class="product-card" style="${isOutOfStock ? 'opacity: 0.7;' : ''}">
        <div class="card-img-wrapper">
          <img class="product-img" src="${item.image}" alt="${item.name}" loading="lazy">
          <span class="category-tag">${item.category}</span>
          
          <!-- BOTÓN CORAZÓN DE FAVORITOS -->
          <button type="button" class="btn-fav-heart ${isFav ? 'active' : ''}" onclick="window.toggleFavorito(${item.id})" title="${isFav ? 'Quitar de favoritos' : 'Guardar en favoritos'}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          ${isOutOfStock ? `<span style="position: absolute; bottom: 8px; right: 8px; background: rgba(239, 68, 68, 0.9); color: #fff; font-size: 0.68rem; font-weight: 800; padding: 2px 8px; border-radius: 4px;">NO DISPONIBLE</span>` : ''}
        </div>
        <div class="card-body">
          <h3 class="product-title">${item.name}</h3>
          <p class="product-desc">${item.desc}</p>

          <div class="compare-action">
    <button
        type="button"
        class="btn-compare-product ${compareProductsIds.includes(item.id) ? 'selected' : ''}"
        onclick="window.toggleCompareProduct(${item.id})">

        ${compareProductsIds.includes(item.id)
            ? '✓ Seleccionado'
            : '⇄ Comparar'}
    </button>
</div>
          <div class="card-bottom">
            <span class="product-price">$${item.price.toFixed(2)}</span>
            ${isOutOfStock ? `
              <button type="button" class="btn btn-outline" disabled style="opacity: 0.5; cursor: not-allowed;">Agotado</button>
            ` : `
              <button type="button" class="btn btn-outline btn-add-product" data-target-id="${item.id}">Añadir</button>
            `}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

window.resetFilters = function() {
  const searchInput = document.getElementById("searchInput");
  searchTerm = "";
  if (searchInput) searchInput.value = "";
  currentCategory = "todos";
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-category") === "todos");
  });
  renderProducts();
};

// ==========================================
// 5. AÑADIR AL CARRITO (CONTROL DE SESIÓN Y STOCK)
// ==========================================
function ejecutarAccionAnadir(productId) {
  const saved = localStorage.getItem("keho_user");
  currentUser = saved ? JSON.parse(saved) : null;

  if (!currentUser) {
    const authModal = document.getElementById("authRequiredModal");
    if (authModal) authModal.classList.add("open");
    return;
  }

  const productsList = getLiveProducts();
  const product = productsList.find(p => p.id === productId);
  if (!product || product.isUnavailable || product.stock <= 0) {
    showModernToast("Este producto no se encuentra disponible actualmente.", "warning");
    return;
  }

  selectedProductForQty = product;

  const qtyModal = document.getElementById("qtyModal");
  const qtyProductImg = document.getElementById("qtyProductImg");
  const qtyProductTitle = document.getElementById("qtyProductTitle");
  const qtyProductPrice = document.getElementById("qtyProductPrice");
  const qtyStockBadge = document.getElementById("qtyStockBadge");
  const qtyInput = document.getElementById("qtyInput");
  const qtyWarningText = document.getElementById("qtyWarningText");

  if (qtyProductImg) qtyProductImg.src = product.image;
  if (qtyProductTitle) qtyProductTitle.textContent = product.name;
  if (qtyProductPrice) qtyProductPrice.textContent = `$${product.price.toFixed(2)} c/u`;

  const maxStock = product.stock || 5;
  if (qtyInput) {
    qtyInput.value = "1";
    qtyInput.max = maxStock;
  }
  if (qtyWarningText) qtyWarningText.textContent = "";

  if (qtyStockBadge) {
    if (maxStock <= 3) {
      qtyStockBadge.className = "stock-badge low";
      qtyStockBadge.textContent = `¡Últimas ${maxStock} unidades disponibles!`;
    } else {
      qtyStockBadge.className = "stock-badge";
      qtyStockBadge.textContent = `En inventario: ${maxStock} disponibles`;
    }
  }

  recalcularSubtotalModal();
  if (qtyModal) qtyModal.classList.add("open");
}

function recalcularSubtotalModal() {
  if (!selectedProductForQty) return;
  const qtyInput = document.getElementById("qtyInput");
  const qtySubtotalDisplay = document.getElementById("qtySubtotalDisplay");
  const qtyWarningText = document.getElementById("qtyWarningText");
  const qtyModalCard = document.getElementById("qtyModalCard");

  if (!qtyInput) return;

  const maxStock = selectedProductForQty.stock || 5;
  let q = parseInt(qtyInput.value) || 1;

  if (q > maxStock) {
    if (qtyWarningText) qtyWarningText.textContent = `Solo puedes pedir hasta ${maxStock} unidades.`;
    if (qtyModalCard) {
      qtyModalCard.classList.add("shake");
      setTimeout(() => qtyModalCard.classList.remove("shake"), 400);
    }
    q = maxStock;
    qtyInput.value = q;
  } else if (q < 1) {
    q = 1;
    qtyInput.value = 1;
  } else {
    if (qtyWarningText) qtyWarningText.textContent = "";
  }

  const sub = selectedProductForQty.price * q;
  if (qtySubtotalDisplay) qtySubtotalDisplay.textContent = `$${sub.toFixed(2)}`;
}

// ==========================================
// 6. DELEGACIÓN DE EVENTOS
// ==========================================
document.addEventListener("click", (e) => {
  const btnAnadir = e.target.closest(".btn-add-product");
  if (btnAnadir) {
    e.preventDefault();
    e.stopPropagation();
    const id = Number(btnAnadir.getAttribute("data-target-id"));
    if (id) ejecutarAccionAnadir(id);
    return;
  }

  const userArea = document.getElementById("userArea");
  const dropdown = document.getElementById("profileDropdown");
  if (userArea && dropdown && !userArea.contains(e.target)) {
    dropdown.classList.remove("open");
  }
});

// ==========================================
// 7. CARRITO Y PERSISTENCIA
// ==========================================
function saveCartToStorage() {
  localStorage.setItem("keho_cart", JSON.stringify(cart));
}

function loadCartFromStorage() {
  const saved = localStorage.getItem("keho_cart");
  if (saved) {
    try {
      cart = JSON.parse(saved);
      updateCartUI();
    } catch (e) {
      cart = [];
    }
  }
}

window.quitarDelCarrito = function(index) {
  cart.splice(index, 1);
  saveCartToStorage();
  updateCartUI();
  showModernToast("Producto removido del carrito.", "warning");
};

function updateCartUI() {
  const cartCount = document.getElementById("cartCount");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartTotalDisplay = document.getElementById("cartTotalDisplay");

  const totalUnits = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (cartCount) cartCount.textContent = totalUnits;

  if (!cartItemsList || !cartTotalDisplay) return;

  if (cart.length === 0) {
    cartItemsList.innerHTML = `<p class="empty-cart-msg">Aún no has añadido productos.</p>`;
    cartTotalDisplay.textContent = "$0.00";
    return;
  }

  let totalMoney = 0;
  cartItemsList.innerHTML = cart.map((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    totalMoney += itemSubtotal;
    return `
      <div class="cart-item">
        <div>
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${itemSubtotal.toFixed(2)}</div>
          <div class="cart-item-qty">Cantidad: <strong>${item.quantity}</strong> ($${item.price.toFixed(2)} c/u)</div>
        </div>
        <button class="btn-remove-item" onclick="window.quitarDelCarrito(${index})">Quitar</button>
      </div>
    `;
  }).join("");

  cartTotalDisplay.textContent = `$${totalMoney.toFixed(2)}`;
}

function bumpCartIcon() {
  const openCartBtn = document.getElementById("openCartBtn");
  if (!openCartBtn) return;
  openCartBtn.style.transform = "scale(1.15)";
  setTimeout(() => { openCartBtn.style.transform = "scale(1)"; }, 180);
}

// ==========================================
// 8. TOAST NOTIFICACIONES
// ==========================================
function showModernToast(message, type = "success") {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const iconSvg = type === "success" 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    <div class="toast-content">
      ${iconSvg}
      <span>${message}</span>
    </div>
    <div class="toast-progress"></div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

// ==========================================
// 9. CONTROLES Y CHECKOUT
// ==========================================
function setupEventListeners() {
  const openFavoritesBtn = document.getElementById("openFavoritesBtn");
  const closeFavoritesBtn = document.getElementById("closeFavoritesBtn");
  const favoritesOverlay = document.getElementById("favoritesOverlay");

  if (openFavoritesBtn && favoritesOverlay) {
    openFavoritesBtn.onclick = () => favoritesOverlay.classList.add("open");
  }

  if (closeFavoritesBtn && favoritesOverlay) {
    closeFavoritesBtn.onclick = () => favoritesOverlay.classList.remove("open");
  }

  if (favoritesOverlay) {
    favoritesOverlay.onclick = (e) => {
      if (e.target === favoritesOverlay) favoritesOverlay.classList.remove("open");
    };
  }

  const qtyModal = document.getElementById("qtyModal");
  const closeQtyModalBtn = document.getElementById("closeQtyModalBtn");
  const cancelQtyBtn = document.getElementById("cancelQtyBtn");
  const confirmAddQtyBtn = document.getElementById("confirmAddQtyBtn");
  const qtyMinusBtn = document.getElementById("qtyMinusBtn");
  const qtyPlusBtn = document.getElementById("qtyPlusBtn");
  const qtyInput = document.getElementById("qtyInput");
  const qtyModalCard = document.getElementById("qtyModalCard");

  const cerrarModalCantidad = () => {
    if (qtyModal) qtyModal.classList.remove("open");
  };

  if (closeQtyModalBtn) closeQtyModalBtn.onclick = cerrarModalCantidad;
  if (cancelQtyBtn) cancelQtyBtn.onclick = cerrarModalCantidad;

  if (qtyMinusBtn && qtyInput) {
    qtyMinusBtn.onclick = () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) {
        qtyInput.value = val - 1;
        recalcularSubtotalModal();
      }
    };
  }

  if (qtyPlusBtn && qtyInput) {
    qtyPlusBtn.onclick = () => {
      if (!selectedProductForQty) return;
      const maxStock = selectedProductForQty.stock || 5;
      let val = parseInt(qtyInput.value) || 1;

      if (val < maxStock) {
        qtyInput.value = val + 1;
        recalcularSubtotalModal();
      } else {
        const warning = document.getElementById("qtyWarningText");
        if (warning) warning.textContent = `Alcanzaste el tope de stock (${maxStock} uds).`;
        if (qtyModalCard) {
          qtyModalCard.classList.add("shake");
          setTimeout(() => qtyModalCard.classList.remove("shake"), 400);
        }
      }
    };
  }

  if (qtyInput) qtyInput.oninput = recalcularSubtotalModal;

  if (confirmAddQtyBtn) {
    confirmAddQtyBtn.onclick = () => {
      if (!selectedProductForQty || !qtyInput) return;
      const maxStock = selectedProductForQty.stock || 5;
      const quantityToAdd = parseInt(qtyInput.value) || 1;

      const existingItem = cart.find(item => item.id === selectedProductForQty.id);
      const currentInCart = existingItem ? existingItem.quantity : 0;

      if (currentInCart + quantityToAdd > maxStock) {
        const warning = document.getElementById("qtyWarningText");
        if (warning) warning.textContent = `Ya tienes ${currentInCart} en carrito. Stock total: ${maxStock}.`;
        if (qtyModalCard) {
          qtyModalCard.classList.add("shake");
          setTimeout(() => qtyModalCard.classList.remove("shake"), 400);
        }
        return;
      }

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        cart.push({
          ...selectedProductForQty,
          quantity: quantityToAdd
        });
      }

      saveCartToStorage();
      updateCartUI();
      showModernToast(`✓ Añadido (${quantityToAdd}) "${selectedProductForQty.name}"`, "success");
      bumpCartIcon();
      cerrarModalCantidad();
    };
  }

  const authRequiredModal = document.getElementById("authRequiredModal");
  const closeAuthReqBtn = document.getElementById("closeAuthReqBtn");
  
  const cerrarAuthModal = () => {
    if (authRequiredModal) authRequiredModal.classList.remove("open");
  };

  if (closeAuthReqBtn) closeAuthReqBtn.onclick = cerrarAuthModal;
  if (authRequiredModal) {
    authRequiredModal.onclick = (e) => {
      if (e.target === authRequiredModal) cerrarAuthModal();
    };
  }

  const openCartBtn = document.getElementById("openCartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartOverlay = document.getElementById("cartOverlay");

  if (openCartBtn && cartOverlay) {
    openCartBtn.onclick = () => cartOverlay.classList.add("open");
  }

  const cerrarCarrito = () => {
    if (cartOverlay) cartOverlay.classList.remove("open");
  };

  if (closeCartBtn) closeCartBtn.onclick = cerrarCarrito;
  if (cartOverlay) {
    cartOverlay.onclick = (e) => {
      if (e.target === cartOverlay) cerrarCarrito();
    };
  }

  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");

  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      if (cart.length === 0) {
        showModernToast("El carrito está vacío. Agrega algún producto.", "warning");
        return;
      }

      const saved = localStorage.getItem("keho_user");
      currentUser = saved ? JSON.parse(saved) : null;

      if (!currentUser) {
        cerrarCarrito();
        if (authRequiredModal) authRequiredModal.classList.add("open");
        return;
      }

      cerrarCarrito();
      abrirModalCheckout();
    };
  }

  function abrirModalCheckout() {
    if (!checkoutModal) return;

    const checkoutContent = document.getElementById("checkoutContent");
    const checkoutProcessing = document.getElementById("checkoutProcessing");
    const checkoutSuccess = document.getElementById("checkoutSuccess");
    const couponInput = document.getElementById("couponInput");
    const couponFeedback = document.getElementById("couponFeedback");
    const discountRow = document.getElementById("discountRow");
    const originalPriceDisplay = document.getElementById("originalPriceDisplay");
    const checkoutPhoneInput = document.getElementById("checkoutPhoneInput");
    const checkoutAddressInput = document.getElementById("checkoutAddressInput");
    const checkoutReferenceInput = document.getElementById("checkoutReferenceInput");
    const checkoutZoneSelect = document.getElementById("checkoutZoneSelect");

    if (checkoutContent) checkoutContent.style.display = "block";
    if (checkoutProcessing) checkoutProcessing.classList.remove("active");
    if (checkoutSuccess) checkoutSuccess.classList.remove("active");

    appliedDiscountRate = 0;
    if (couponInput) couponInput.value = "";
    if (couponFeedback) couponFeedback.textContent = "";
    if (discountRow) discountRow.style.display = "none";
    if (originalPriceDisplay) originalPriceDisplay.style.display = "none";

    const initial = (currentUser.name || "U").charAt(0).toUpperCase();
    const checkoutBuyerInitial = document.getElementById("checkoutBuyerInitial");
    const checkoutBuyerName = document.getElementById("checkoutBuyerName");
    const checkoutBuyerEmail = document.getElementById("checkoutBuyerEmail");

    if (checkoutBuyerInitial) checkoutBuyerInitial.textContent = initial;
    if (checkoutBuyerName) checkoutBuyerName.textContent = currentUser.fullName || currentUser.name;
    if (checkoutBuyerEmail) checkoutBuyerEmail.textContent = currentUser.email || "correo@ejemplo.com";

    if (checkoutPhoneInput) checkoutPhoneInput.value = "";
    if (checkoutAddressInput) checkoutAddressInput.value = "";
    if (checkoutReferenceInput) checkoutReferenceInput.value = "";

    if (checkoutZoneSelect) {
      checkoutZoneSelect.value = "Managua";
      currentDeliveryCost = 3.00;
      document.getElementById("deliveryCostDisplay").textContent = "$3.00";
    }

    validarFormularioCompleto();
    recalcularCheckout();
    checkoutModal.classList.add("open");
  }

  const cerrarCheckout = () => {
    if (checkoutModal) checkoutModal.classList.remove("open");
  };

  const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
  const cancelCheckoutBtn = document.getElementById("cancelCheckoutBtn");
  if (closeCheckoutBtn) closeCheckoutBtn.onclick = cerrarCheckout;
  if (cancelCheckoutBtn) cancelCheckoutBtn.onclick = cerrarCheckout;

  const checkoutZoneSelect = document.getElementById("checkoutZoneSelect");
  const deliveryCostDisplay = document.getElementById("deliveryCostDisplay");

  if (checkoutZoneSelect) {
    checkoutZoneSelect.onchange = (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      currentDeliveryCost = parseFloat(selectedOption.getAttribute("data-cost")) || 0;
      if (deliveryCostDisplay) {
        deliveryCostDisplay.textContent = currentDeliveryCost === 0 ? "GRATIS" : `$${currentDeliveryCost.toFixed(2)}`;
      }
      recalcularCheckout();
    };
  }

  const checkoutPhoneInput = document.getElementById("checkoutPhoneInput");
  const checkoutAddressInput = document.getElementById("checkoutAddressInput");
  const confirmOrderBtn = document.getElementById("confirmOrderBtn");

  if (checkoutPhoneInput) {
    checkoutPhoneInput.oninput = (e) => {
      let val = e.target.value.replace(/\D/g, "");
      if (val.startsWith("505")) val = val.substring(3);
      val = val.substring(0, 8);

      if (val.length > 4) {
        e.target.value = `+505 ${val.substring(0, 4)}-${val.substring(4)}`;
      } else if (val.length > 0) {
        e.target.value = `+505 ${val}`;
      } else {
        e.target.value = "";
      }
      validarFormularioCompleto();
    };
  }

  if (checkoutAddressInput) {
    checkoutAddressInput.oninput = validarFormularioCompleto;
  }

  function validarFormularioCompleto() {
    const phoneStatusIcon = document.getElementById("phoneStatusIcon");
    const phoneHelper = document.getElementById("phoneHelper");
    const btnLockIcon = document.getElementById("btnLockIcon");
    if (!checkoutPhoneInput || !confirmOrderBtn) return;

    const digits = checkoutPhoneInput.value.replace(/\D/g, "");
    const isPhoneValid = digits.length === 11 || (digits.length === 8 && !digits.startsWith("505"));
    const isAddressValid = checkoutAddressInput ? checkoutAddressInput.value.trim().length >= 8 : false;

    if (isPhoneValid) {
      checkoutPhoneInput.classList.add("valid");
      if (phoneStatusIcon) {
        phoneStatusIcon.textContent = "✓";
        phoneStatusIcon.style.color = "var(--success-color)";
      }
    } else {
      checkoutPhoneInput.classList.remove("valid");
      if (phoneStatusIcon) {
        phoneStatusIcon.textContent = "⚪";
        phoneStatusIcon.style.color = "var(--text-muted)";
      }
    }

    if (isPhoneValid && isAddressValid) {
      confirmOrderBtn.disabled = false;
      if (btnLockIcon) btnLockIcon.textContent = "🔓";
      if (phoneHelper) {
        phoneHelper.textContent = "Datos listos para enviar solicitud.";
        phoneHelper.style.color = "var(--success-color)";
      }
    } else {
      confirmOrderBtn.disabled = true;
      if (btnLockIcon) btnLockIcon.textContent = "🔒";
      if (phoneHelper) {
        if (!isPhoneValid) {
          phoneHelper.textContent = "Ingresa un número válido de 8 dígitos para coordinar tu entrega.";
          phoneHelper.style.color = "var(--text-muted)";
        } else {
          phoneHelper.textContent = "Ingresa tu dirección domiciliar completa para habilitar el botón.";
          phoneHelper.style.color = "var(--warning-color)";
        }
      }
    }
  }

  const applyCouponBtn = document.getElementById("applyCouponBtn");
  const couponInput = document.getElementById("couponInput");

  if (applyCouponBtn && couponInput) {
    applyCouponBtn.onclick = () => {
      const code = couponInput.value.trim().toUpperCase();
      const couponFeedback = document.getElementById("couponFeedback");
      if (!code) return;

      if (availableCoupons[code]) {
        appliedDiscountRate = availableCoupons[code];
        if (couponFeedback) {
          couponFeedback.className = "coupon-feedback success";
          couponFeedback.textContent = `¡Cupón ${code} aplicado! Descuento del ${(appliedDiscountRate * 100)}% otorgado.`;
        }
        showModernToast(`¡Descuento del ${(appliedDiscountRate * 100)}% aplicado!`, "success");
      } else {
        appliedDiscountRate = 0;
        if (couponFeedback) {
          couponFeedback.className = "coupon-feedback error";
          couponFeedback.textContent = "El cupón ingresado no es válido o ha expirado.";
        }
      }
      recalcularCheckout();
    };
  }

  function recalcularCheckout() {
    const checkoutItemsList = document.getElementById("checkoutItemsList");
    const checkoutSubtotalDisplay = document.getElementById("checkoutSubtotalDisplay");
    const checkoutTotalDisplay = document.getElementById("checkoutTotalDisplay");
    const discountRow = document.getElementById("discountRow");
    const discountDisplay = document.getElementById("discountDisplay");
    const originalPriceDisplay = document.getElementById("originalPriceDisplay");

    if (!checkoutItemsList || !checkoutSubtotalDisplay || !checkoutTotalDisplay) return;

    let subtotal = 0;
    checkoutItemsList.innerHTML = cart.map(item => {
      const itemSub = item.price * item.quantity;
      subtotal += itemSub;
      return `
        <div class="checkout-item-row">
          <span class="checkout-item-title">${item.name} <strong>x${item.quantity}</strong></span>
          <span class="checkout-item-price">$${itemSub.toFixed(2)}</span>
        </div>
      `;
    }).join("");

    checkoutSubtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;

    let finalTotal = subtotal + currentDeliveryCost;

    if (appliedDiscountRate > 0) {
      const discountAmount = subtotal * appliedDiscountRate;
      finalTotal = (subtotal - discountAmount) + currentDeliveryCost;

      if (discountRow) {
        discountRow.style.display = "flex";
        if (discountDisplay) discountDisplay.textContent = `-$${discountAmount.toFixed(2)}`;
      }

      if (originalPriceDisplay) {
        originalPriceDisplay.style.display = "inline";
        originalPriceDisplay.textContent = `$${(subtotal + currentDeliveryCost).toFixed(2)}`;
      }
    } else {
      if (discountRow) discountRow.style.display = "none";
      if (originalPriceDisplay) originalPriceDisplay.style.display = "none";
    }

    checkoutTotalDisplay.textContent = `$${finalTotal.toFixed(2)}`;
  }

  if (confirmOrderBtn) {
    confirmOrderBtn.onclick = () => {
      const checkoutContent = document.getElementById("checkoutContent");
      const checkoutProcessing = document.getElementById("checkoutProcessing");
      const checkoutSuccess = document.getElementById("checkoutSuccess");
      const successOrderCode = document.getElementById("successOrderCode");

      const phoneVal = document.getElementById("checkoutPhoneInput").value.trim();
      const zoneVal = document.getElementById("checkoutZoneSelect").value;
      const addressVal = document.getElementById("checkoutAddressInput").value.trim();
      const referenceVal = document.getElementById("checkoutReferenceInput").value.trim();
      const paymentVal = document.querySelector('input[name="payOption"]:checked')?.value || "Pago contra entrega";

      const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const discountAmount = appliedDiscountRate > 0 ? (subtotal * appliedDiscountRate) : 0;
      const finalTotal = (subtotal - discountAmount) + currentDeliveryCost;
      const randomCode = "#KEHO-" + Math.floor(10000 + Math.random() * 90000);

      const newOrder = {
        code: randomCode,
        date: new Date().toLocaleString(),
        clientName: currentUser.fullName || currentUser.name,
        clientEmail: currentUser.email,
        phone: phoneVal,
        zone: zoneVal,
        address: addressVal,
        reference: referenceVal || "Ninguna especificada",
        paymentMethod: paymentVal,
        items: [...cart],
        deliveryCost: currentDeliveryCost,
        discount: discountAmount,
        total: finalTotal,
        status: "Pendiente"
      };

      const orders = JSON.parse(localStorage.getItem("keho_orders_db") || "[]");
      orders.push(newOrder);
      localStorage.setItem("keho_orders_db", JSON.stringify(orders));

      if (checkoutContent) checkoutContent.style.display = "none";
      if (checkoutProcessing) checkoutProcessing.classList.add("active");

      setTimeout(() => {
        if (checkoutProcessing) checkoutProcessing.classList.remove("active");
        if (checkoutSuccess) checkoutSuccess.classList.add("active");

        if (successOrderCode) successOrderCode.textContent = randomCode;

        cart = [];
        saveCartToStorage();
        updateCartUI();
        showModernToast("¡Solicitud enviada a validación!", "success");
      }, 1200);
    };
  }

  const finishSuccessBtn = document.getElementById("finishSuccessBtn");
  if (finishSuccessBtn) finishSuccessBtn.onclick = cerrarCheckout;

  const logoutModal = document.getElementById("logoutModal");
  const cancelLogoutBtn = document.getElementById("cancelLogoutBtn");
  const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
  const logoutLoadingState = document.getElementById("logoutLoadingState");

  const cerrarModalLogout = () => {
    if (logoutModal) logoutModal.classList.remove("open");
  };

  if (cancelLogoutBtn) cancelLogoutBtn.onclick = cerrarModalLogout;

  if (confirmLogoutBtn && logoutModal) {
    confirmLogoutBtn.onclick = () => {
      const title = document.querySelector(".logout-modal-title");
      const desc = document.querySelector(".logout-modal-desc");
      const actions = document.querySelector(".logout-modal-actions");

      if (title) title.style.display = "none";
      if (desc) desc.style.display = "none";
      if (actions) actions.style.display = "none";
      if (logoutLoadingState) logoutLoadingState.classList.add("active");

      setTimeout(() => {
        localStorage.removeItem("keho_user");
        currentUser = null;
        cerrarModalLogout();

        if (title) title.style.display = "block";
        if (desc) desc.style.display = "block";
        if (actions) actions.style.display = "flex";
        if (logoutLoadingState) logoutLoadingState.classList.remove("active");

        renderUserUI();
        showModernToast("Has cerrado sesión correctamente.", "info");
      }, 1000);
    };
  }

  const filterContainer = document.getElementById("filterContainer");
  if (filterContainer) {
    filterContainer.onclick = (e) => {
      if (e.target.classList.contains("filter-btn")) {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        currentCategory = e.target.getAttribute("data-category");
        renderProducts();
      }
    };
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchTerm = e.target.value.trim();
      renderProducts();
    };
  }
}

// ==========================================
// 10. SINCRONIZACIÓN EN VIVO ENTRE PESTAÑAS
// ==========================================
window.addEventListener("storage", (e) => {
  if (e.key === "keho_products_db") {
    renderProducts();
  }
  if (e.key === "keho_orders_db") {
    const modal = document.getElementById("clientOrdersModal");
    if (modal && modal.classList.contains("open")) {
      abrirModalHistorialCliente();
    }
  }
});

// Arranque
loadSavedUser();
loadCartFromStorage();
loadFavoritesFromStorage();
setupThemeToggle();
renderProducts();
setupEventListeners();

// ==========================================
// COMPARADOR DE PRODUCTOS - KEHO TECHNOLOGY
// ==========================================

window.toggleCompareProduct = function (productId) {

    const index = compareProductsIds.indexOf(productId);

    if (index !== -1) {

        // Quitar producto de la comparación
        compareProductsIds.splice(index, 1);

    } else {

        // Máximo de 3 productos
        if (compareProductsIds.length >= 3) {

            alert("Solo puedes comparar un máximo de 3 productos.");

            return;
        }

        compareProductsIds.push(productId);
    }

    renderProducts();
    updateCompareBar();
};


// Crear barra inferior del comparador
function updateCompareBar() {

    let bar = document.getElementById("compareBar");

    if (!bar) {

        bar = document.createElement("div");

        bar.id = "compareBar";
        bar.className = "compare-bar";

        document.body.appendChild(bar);
    }

    if (compareProductsIds.length === 0) {

        bar.style.display = "none";

        return;
    }

    bar.style.display = "flex";

    bar.innerHTML = `
        <div class="compare-bar-info">
            <strong>⚖️ Comparador de productos</strong>
            <span>
                ${compareProductsIds.length} de 3 productos seleccionados
            </span>
        </div>

        <div class="compare-bar-actions">

            <button
                type="button"
                class="btn-compare-clear"
                onclick="window.clearCompareProducts()">

                Limpiar
            </button>

            <button
                type="button"
                class="btn-compare-open"
                onclick="window.openCompareModal()"
                ${compareProductsIds.length < 2 ? "disabled" : ""}>

                Comparar ahora
            </button>

        </div>
    `;
}


// Limpiar selección
window.clearCompareProducts = function () {

    compareProductsIds = [];

    renderProducts();
    updateCompareBar();
};


// Abrir tabla comparativa
window.openCompareModal = function () {

    if (compareProductsIds.length < 2) {

        alert("Selecciona al menos 2 productos para compararlos.");

        return;
    }

    const productsList = getLiveProducts();

    const selectedProducts = compareProductsIds
        .map(id => productsList.find(product => product.id === id))
        .filter(Boolean);

    let modal = document.getElementById("compareModal");

    if (!modal) {

        modal = document.createElement("div");

        modal.id = "compareModal";
        modal.className = "compare-modal-overlay";

        document.body.appendChild(modal);
    }

    const escapeHTML = value => String(value ?? "").replace(
        /[&<>"']/g,
        character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]
    );

    const rows = [
        {
            label: "Producto",
            value: product => escapeHTML(product.name)
        },
        {
            label: "Categoría",
            value: product => escapeHTML(product.category)
        },
        {
            label: "Precio",
            value: product => `$${Number(product.price).toFixed(2)}`
        },
        {
            label: "Disponibilidad",
            value: product =>
                product.isUnavailable || product.stock <= 0
                    ? "Agotado"
                    : "Disponible"
        },
        {
            label: "Unidades en stock",
            value: product => escapeHTML(product.stock)
        },
        {
            label: "Descripción",
            value: product => escapeHTML(product.desc)
        }
    ];

    modal.innerHTML = `
        <div class="compare-modal-card">

            <div class="compare-modal-header">

                <div>
                    <h2>⚖️ Comparar productos</h2>
                    <p>Compara sus características antes de elegir.</p>
                </div>

                <button
                    type="button"
                    class="compare-modal-close"
                    onclick="window.closeCompareModal()"
                    aria-label="Cerrar comparador">

                    ×
                </button>

            </div>

            <div class="compare-table-wrapper">

                <table class="compare-table">

                    <thead>
                        <tr>
                            <th>Característica</th>

                            ${selectedProducts.map(product => `
                                <th>
                                    <img
                                        src="${escapeHTML(product.image)}"
                                        alt="${escapeHTML(product.name)}">

                                    <div>
                                        ${escapeHTML(product.name)}
                                    </div>

                                    <button
                                        type="button"
                                        class="compare-remove"
                                        onclick="window.removeCompareProduct(${Number(product.id)})">

                                        Quitar
                                    </button>
                                </th>
                            `).join("")}

                        </tr>
                    </thead>

                    <tbody>

                        ${rows.map(row => `
                            <tr>
                                <th>${row.label}</th>

                                ${selectedProducts.map(product => `
                                    <td>${row.value(product)}</td>
                                `).join("")}
                            </tr>
                        `).join("")}

                    </tbody>

                </table>

            </div>

            <div class="compare-modal-footer">

                <span>
                    Puedes seleccionar hasta 3 productos.
                </span>

                <button
                    type="button"
                    class="btn-compare-open"
                    onclick="window.closeCompareModal()">

                    Volver al catálogo
                </button>

            </div>

        </div>
    `;

    modal.style.display = "flex";
};


// Cerrar tabla comparativa
window.closeCompareModal = function () {

    const modal = document.getElementById("compareModal");

    if (modal) {
        modal.style.display = "none";
    }
};


// Quitar producto desde la tabla comparativa
window.removeCompareProduct = function (productId) {

    compareProductsIds = compareProductsIds.filter(
        id => id !== productId
    );

    renderProducts();
    updateCompareBar();

    if (compareProductsIds.length < 2) {

        closeCompareModal();

        return;
    }

    openCompareModal();
};


// Cerrar el comparador al pulsar fuera de la tabla
document.addEventListener("click", function (event) {

    const modal = document.getElementById("compareModal");

    if (modal && event.target === modal) {
        closeCompareModal();
    }

});

// ==========================================
// 11. HISTORIAL DE PEDIDOS Y FACTURACIÓN (SIMPLIFICADO)
// ==========================================

// 1. Abrir el modal
window.abrirModalHistorialCliente = function() {
  const modal = document.getElementById("clientOrdersModal");
  if (modal) {
    modal.classList.add("open");
    renderClientOrders();
  }
};

// 2. Cerrar el modal
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("closeClientOrdersBtn");
  const modal = document.getElementById("clientOrdersModal");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (modal) modal.classList.remove("open");
    });
  }
});

// 3. Renderizar las compras (Sin barra de pasos, solo estado directo)
function renderClientOrders() {
  const listEl = document.getElementById("clientOrdersList");
  const countEl = document.getElementById("clientConfirmedCount");
  const totalEl = document.getElementById("clientTotalSpent");
  
  if (!currentUser) return;
  
  const allOrders = JSON.parse(localStorage.getItem("keho_orders_db") || "[]");
  // Filtrar solo los pedidos del cliente actual (los más recientes primero)
  const myOrders = allOrders.filter(o => o.clientEmail === currentUser.email).reverse(); 
  
  if (myOrders.length === 0) {
    listEl.innerHTML = `<p class="empty-cart-msg">Aún no tienes compras registradas en tu historial.</p>`;
    countEl.textContent = "0 compras";
    totalEl.textContent = "$0.00";
    return;
  }
  
  let confirmedCount = 0;
  let totalSpent = 0;
  
  listEl.innerHTML = myOrders.map((order) => {
    if (order.status !== "Rechazada") {
      confirmedCount++;
      totalSpent += order.total;
    }
    
    // Determinar el texto de estado simplificado
    let statusText = "";
    if (order.status === "Pendiente") {
        statusText = "⏳ Compra en Proceso";
    } else if (order.status === "Confirmada") {
        statusText = "✓ Compra Realizada";
    } else if (order.status === "Rechazada") {
        statusText = "✕ Compra Rechazada";
    } else {
        statusText = order.status; // Por si hay otro estado
    }

    const rejectInfo = order.status === "Rechazada" 
      ? `<div style="color: #f87171; font-size: 0.85rem; margin-top: 10px; background: rgba(239, 68, 68, 0.1); padding: 8px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.3);"><strong>Motivo de rechazo:</strong> ${order.rejectReason || "Cancelado"}</div>`
      : ``;

    // Botón para generar factura (No se muestra si está rechazada)
    const invoiceBtn = order.status !== "Rechazada" 
      ? `<button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.75rem; border-color: var(--accent-cyan); color: var(--accent-cyan);" onclick="generarFactura('${order.code}')">📄 Generar Factura</button>` 
      : ``;

    return `
      <div class="order-history-card">
        <div class="order-top-info">
          <div>
            <strong style="color: var(--accent-cyan); font-size: 0.95rem;">${order.code}</strong>
            <span style="color: var(--text-muted); font-size: 0.75rem; margin-left: 8px;">${order.date}</span>
          </div>
          <span class="status-pill ${order.status}">${statusText}</span>
        </div>
        
        ${rejectInfo}
        
        <div style="margin-top: 10px; font-size: 0.85rem; color: var(--text-main); display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div><strong>Total pagado:</strong> <span style="color: #34d399; font-size: 1.05rem;">$${order.total.toFixed(2)}</span></div>
            <div style="color: var(--text-muted); font-size: 0.75rem; margin-top: 2px;">Método: ${order.paymentMethod}</div>
            <div style="color: var(--text-muted); font-size: 0.75rem; margin-top: 4px;">
              ${order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
            </div>
          </div>
          <div>
            ${invoiceBtn}
          </div>
        </div>
      </div>
    `;
  }).join("");
  
  countEl.textContent = `${confirmedCount} compras`;
  totalEl.textContent = `$${totalSpent.toFixed(2)}`;
}

// 4. Generador de Factura Imprimible / PDF
window.generarFactura = function(orderCode) {
  const allOrders = JSON.parse(localStorage.getItem("keho_orders_db") || "[]");
  const order = allOrders.find(o => o.code === orderCode);
  if (!order) return;

  const printWindow = window.open('', '_blank');
  
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${item.price.toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const html = `
    <html>
      <head>
        <title>Factura ${order.code}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; padding: 40px; max-width: 800px; margin: 0 auto; background: #fff; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #06b6d4; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 28px; font-weight: 900; color: #0f172a; }
          .logo span { color: #06b6d4; }
          .invoice-details { text-align: right; }
          h1 { margin: 0 0 10px 0; color: #0f172a; font-size: 32px; letter-spacing: 2px; }
          .client-info { margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background: #0f172a; color: white; padding: 12px 10px; text-align: left; font-size: 14px; }
          th.center { text-align: center; }
          th.right { text-align: right; }
          .totals { width: 50%; margin-left: auto; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;}
          .totals table { margin-bottom: 0; }
          .totals td { padding: 8px; border-bottom: 1px solid #ddd; font-size: 14px;}
          .totals tr:last-child td { border-bottom: none; }
          .grand-total { font-size: 20px; font-weight: 900; color: #0f172a; }
          .footer { margin-top: 50px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">KEHO<span>-Technology</span><br><small style="font-size:13px; color:#64748b; font-weight: normal;">Tecnología & Servicios Integrales</small></div>
          <div class="invoice-details">
            <h1>FACTURA</h1>
            <p style="margin: 3px 0;"><strong>Orden:</strong> ${order.code}</p>
            <p style="margin: 3px 0;"><strong>Fecha:</strong> ${order.date}</p>
            <p style="margin: 3px 0;"><strong>Estado:</strong> ${order.status}</p>
          </div>
        </div>
        
        <div class="client-info">
          <h3 style="margin-top:0; color: #0f172a;">Facturar a:</h3>
          <p style="margin: 5px 0;"><strong>Cliente:</strong> ${order.clientName}</p>
          <p style="margin: 5px 0;"><strong>Correo:</strong> ${order.clientEmail}</p>
          <p style="margin: 5px 0;"><strong>Teléfono:</strong> ${order.phone}</p>
          <p style="margin: 5px 0;"><strong>Dirección:</strong> ${order.address} (${order.zone})</p>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Descripción del Artículo</th>
              <th class="center">Cant.</th>
              <th class="right">Precio Unit.</th>
              <th class="right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        
        <div class="totals">
          <table>
            <tr>
              <td>Subtotal:</td>
              <td style="text-align: right;">$${(order.total - order.deliveryCost + order.discount).toFixed(2)}</td>
            </tr>
            ${order.discount > 0 ? `
            <tr>
              <td>Descuento:</td>
              <td style="text-align: right; color: #ef4444;">-$${order.discount.toFixed(2)}</td>
            </tr>` : ''}
            <tr>
              <td>Delivery (${order.zone}):</td>
              <td style="text-align: right;">$${order.deliveryCost.toFixed(2)}</td>
            </tr>
            <tr class="grand-total">
              <td style="padding-top: 15px;">TOTAL USD:</td>
              <td style="text-align: right; padding-top: 15px; color: #06b6d4;">$${order.total.toFixed(2)}</td>
            </tr>
          </table>
          <p style="text-align: right; margin-top: 15px; font-size: 13px; color: #64748b;"><strong>Pago vía:</strong> ${order.paymentMethod}</p>
        </div>
        
        <div class="footer">
          <p>Gracias por tu preferencia en KEHO-Technology.</p>
          <p>Este documento es un comprobante electrónico válido. Si tienes dudas, contáctanos a soporte@keho.com</p>
        </div>
        <script>
          // Abre el cuadro de diálogo de impresión automáticamente
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;
  
  printWindow.document.write(html);
  printWindow.document.close();
};