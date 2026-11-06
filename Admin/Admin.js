// ==========================================
// CREDENCIALES DEL ADMINISTRADOR
// ==========================================
const ADMIN_CREDENTIALS = {
  user: "admin",
  email: "admin@keho.com",
  pass: "Keho2026*"
};

// Referencias del DOM
const adminAuthOverlay = document.getElementById("adminAuthOverlay");
const adminLoginForm = document.getElementById("adminLoginForm");
const adminUser = document.getElementById("adminUser");
const adminPass = document.getElementById("adminPass");
const adminAuthError = document.getElementById("adminAuthError");
const adminApp = document.getElementById("adminApp");
const adminLogoutBtn = document.getElementById("adminLogoutBtn");

// Pestañas
const tabOrdersBtn = document.getElementById("tabOrdersBtn");
const tabProductsBtn = document.getElementById("tabProductsBtn");
const sectionOrders = document.getElementById("sectionOrders");
const sectionProducts = document.getElementById("sectionProducts");

// Modal de Productos (Crear / Editar)
const openAddProductModalBtn = document.getElementById("openAddProductModalBtn");
const productModal = document.getElementById("productModal");
const productModalTitle = document.getElementById("productModalTitle");
const closeProductModalBtn = document.getElementById("closeProductModalBtn");
const cancelProductBtn = document.getElementById("cancelProductBtn");
const productForm = document.getElementById("productForm");
const editingProductId = document.getElementById("editingProductId");

// Modal de Rechazo
const rejectOrderModal = document.getElementById("rejectOrderModal");
const closeRejectModalBtn = document.getElementById("closeRejectModalBtn");
const cancelRejectBtn = document.getElementById("cancelRejectBtn");
const rejectOrderForm = document.getElementById("rejectOrderForm");
const rejectOrderCodeBadge = document.getElementById("rejectOrderCodeBadge");
const rejectReasonSelect = document.getElementById("rejectReasonSelect");
const customReasonWrapper = document.getElementById("customReasonWrapper");
const rejectCustomReason = document.getElementById("rejectCustomReason");
let orderIndexToReject = null;

// Estados de filtro y búsqueda
let orderSearchTerm = "";
let currentStatusFilter = "todos";
let productSearchTerm = "";

// ==========================================
// 1. CONTROL DE AUTENTICACIÓN
// ==========================================
function checkAdminAuth() {
  const session = sessionStorage.getItem("keho_admin_session");
  if (session && session === "active") {
    adminAuthOverlay.style.display = "none";
    adminApp.classList.add("authenticated");
    loadAndRenderOrders();
    loadAndRenderAdminProducts();
  } else {
    adminAuthOverlay.style.display = "flex";
    adminApp.classList.remove("authenticated");
  }
}

if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    adminAuthError.style.display = "none";

    const userVal = adminUser.value.trim().toLowerCase();
    const passVal = adminPass.value;

    const isUserValid = (userVal === ADMIN_CREDENTIALS.user || userVal === ADMIN_CREDENTIALS.email);
    const isPassValid = (passVal === ADMIN_CREDENTIALS.pass);

    if (isUserValid && isPassValid) {
      sessionStorage.setItem("keho_admin_session", "active");
      adminUser.value = "";
      adminPass.value = "";
      checkAdminAuth();
      showToast("Bienvenido al Panel de Administración", "success");
    } else {
      adminAuthError.style.display = "block";
      adminAuthError.textContent = "Credenciales inválidas. Verifica tu usuario y contraseña.";
      adminPass.value = "";
      adminPass.focus();
    }
  });
}

if (adminLogoutBtn) {
  adminLogoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("keho_admin_session");
    checkAdminAuth();
  });
}

// ==========================================
// 2. ALTERNANCIA DE PESTAÑAS (PEDIDOS / PRODUCTOS)
// ==========================================
if (tabOrdersBtn && tabProductsBtn) {
  tabOrdersBtn.onclick = () => {
    tabOrdersBtn.classList.add("active");
    tabProductsBtn.classList.remove("active");
    sectionOrders.classList.add("active");
    sectionProducts.classList.remove("active");
    loadAndRenderOrders();
  };

  tabProductsBtn.onclick = () => {
    tabProductsBtn.classList.add("active");
    tabOrdersBtn.classList.remove("active");
    sectionProducts.classList.add("active");
    sectionOrders.classList.remove("active");
    loadAndRenderAdminProducts();
  };
}

// ==========================================
// 3. GESTIÓN Y RENDERIZADO DE PEDIDOS (CON FILTROS Y RECHAZO)
// ==========================================
function loadAndRenderOrders() {
  const tbody = document.getElementById("ordersTableBody");
  const totalCountEl = document.getElementById("totalOrdersCount");
  const pendingCountEl = document.getElementById("pendingOrdersCount");

  const orders = JSON.parse(localStorage.getItem("keho_orders_db") || "[]");

  if (totalCountEl) totalCountEl.textContent = orders.length;
  if (pendingCountEl) {
    const pending = orders.filter(o => o.status === "Pendiente").length;
    pendingCountEl.textContent = pending;
  }

  if (!tbody) return;

  const filteredOrders = orders.map((o, idx) => ({ ...o, originalIndex: idx })).filter(order => {
    const matchesStatus = currentStatusFilter === "todos" || order.status === currentStatusFilter;
    const term = orderSearchTerm.toLowerCase();
    const matchesSearch = 
      (order.code || "").toLowerCase().includes(term) ||
      (order.clientName || "").toLowerCase().includes(term) ||
      (order.clientEmail || "").toLowerCase().includes(term) ||
      (order.phone || "").toLowerCase().includes(term) ||
      (order.address || "").toLowerCase().includes(term) ||
      (order.zone || "").toLowerCase().includes(term);

    return matchesStatus && matchesSearch;
  });

  if (filteredOrders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 3rem 1rem;">
          No se encontraron pedidos con los filtros aplicados.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filteredOrders.slice().reverse().map(order => {
    const rawPhone = (order.phone || "").replace(/\D/g, "");
    const waPhone = rawPhone.startsWith("505") ? rawPhone : `505${rawPhone}`;
    const waMsg = encodeURIComponent(
      `¡Hola ${order.clientName}! Te contactamos de KEHO-Technology para validar los datos de tu orden ${order.code} por valor de $${order.total.toFixed(2)}. ¿Confirmamos tu dirección de entrega en ${order.zone}?`
    );
    const waLink = `https://wa.me/${waPhone}?text=${waMsg}`;

    const itemsHtml = order.items.map(item => `
      <span class="item-bullet">
        <strong>${item.name}</strong> (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
      </span>
    `).join("");

    return `
      <tr>
        <td>
          <strong style="color: var(--accent-cyan); font-size: 0.95rem;">${order.code}</strong><br>
          <small style="color: var(--text-muted);">${order.date}</small>
        </td>
        <td>
          <strong>${order.clientName}</strong><br>
          <small style="color: var(--text-muted);">${order.clientEmail}</small><br>
          <small style="color: #34d399; font-weight: 700;">📞 ${order.phone}</small>
        </td>
        <td>
          <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700;">Zona: ${order.zone}</span><br>
          <strong>${order.address}</strong><br>
          <small style="color: var(--text-muted);">Ref: ${order.reference}</small>
        </td>
        <td>${itemsHtml}</td>
        <td>
          <strong style="font-size: 1.05rem; color: #fff;">$${order.total.toFixed(2)}</strong><br>
          <small style="color: var(--text-muted);">Envío: $${order.deliveryCost.toFixed(2)}</small><br>
          <small style="color: var(--accent-cyan); font-weight: 600;">${order.paymentMethod}</small>
        </td>
        <td>
          <span class="badge-status ${order.status}">${order.status}</span>
          ${order.status === "Rechazada" && order.rejectReason ? `
            <div style="font-size: 0.72rem; color: #f87171; margin-top: 4px; line-height: 1.2;">
              <strong>Motivo:</strong> ${order.rejectReason}
            </div>
          ` : ''}
        </td>
        <td>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <a href="${waLink}" target="_blank" class="btn-act btn-whatsapp-direct">
              💬 Validar WhatsApp
            </a>
            ${order.status === "Pendiente" ? `
              <button type="button" class="btn-act btn-approve-order" onclick="window.confirmarCompraAdmin(${order.originalIndex})">
                ✓ Confirmar Compra
              </button>
              <button type="button" class="btn-act btn-cancel-order" onclick="window.abrirModalRechazo(${order.originalIndex})">
                ✕ Rechazar
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// Búsqueda y Filtros de Pedidos
const orderSearchInput = document.getElementById("orderSearchInput");
const orderStatusFilters = document.getElementById("orderStatusFilters");

if (orderSearchInput) {
  orderSearchInput.addEventListener("input", (e) => {
    orderSearchTerm = e.target.value.trim();
    loadAndRenderOrders();
  });
}

if (orderStatusFilters) {
  orderStatusFilters.addEventListener("click", (e) => {
    if (e.target.classList.contains("pill-filter-btn")) {
      document.querySelectorAll("#orderStatusFilters .pill-filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentStatusFilter = e.target.getAttribute("data-status");
      loadAndRenderOrders();
    }
  });
}

// Confirmar compra con descuento de stock
window.confirmarCompraAdmin = function(index) {
  const orders = JSON.parse(localStorage.getItem("keho_orders_db") || "[]");
  if (!orders[index]) return;

  const order = orders[index];
  const products = getStoredProducts();
  let stockError = false;

  for (const item of order.items) {
    const prod = products.find(p => p.id === item.id);
    if (prod && prod.stock < item.quantity) {
      showToast(`Stock insuficiente para "${item.name}". Solo quedan ${prod.stock} uds.`, "warning");
      stockError = true;
      break;
    }
  }

  if (stockError) return;

  order.items.forEach(item => {
    const prodIndex = products.findIndex(p => p.id === item.id);
    if (prodIndex !== -1) {
      products[prodIndex].stock -= item.quantity;
      if (products[prodIndex].stock <= 0) {
        products[prodIndex].stock = 0;
        products[prodIndex].isUnavailable = true;
      }
    }
  });

  saveStoredProducts(products);
  loadAndRenderAdminProducts();

  order.status = "Confirmada";
  localStorage.setItem("keho_orders_db", JSON.stringify(orders));
  loadAndRenderOrders();
  showToast(`¡Orden ${order.code} confirmada con éxito!`, "success");
};

// Modal de Rechazo
window.abrirModalRechazo = function(index) {
  const orders = JSON.parse(localStorage.getItem("keho_orders_db") || "[]");
  if (!orders[index]) return;

  orderIndexToReject = index;
  if (rejectOrderCodeBadge) rejectOrderCodeBadge.textContent = orders[index].code;
  if (rejectReasonSelect) rejectReasonSelect.value = "Dirección fuera de cobertura o zona de difícil acceso";
  if (customReasonWrapper) customReasonWrapper.style.display = "none";
  if (rejectCustomReason) rejectCustomReason.value = "";

  if (rejectOrderModal) rejectOrderModal.classList.add("open");
};

const cerrarModalRechazo = () => {
  if (rejectOrderModal) rejectOrderModal.classList.remove("open");
  orderIndexToReject = null;
};

if (closeRejectModalBtn) closeRejectModalBtn.onclick = cerrarModalRechazo;
if (cancelRejectBtn) cancelRejectBtn.onclick = cerrarModalRechazo;

if (rejectReasonSelect) {
  rejectReasonSelect.onchange = (e) => {
    if (e.target.value === "otro") {
      customReasonWrapper.style.display = "flex";
      rejectCustomReason.focus();
    } else {
      customReasonWrapper.style.display = "none";
    }
  };
}

if (rejectOrderForm) {
  rejectOrderForm.onsubmit = (e) => {
    e.preventDefault();
    if (orderIndexToReject === null) return;

    const orders = JSON.parse(localStorage.getItem("keho_orders_db") || "[]");
    const order = orders[orderIndexToReject];
    if (!order) return;

    let finalReason = rejectReasonSelect.value;
    if (finalReason === "otro") {
      finalReason = rejectCustomReason.value.trim() || "Cancelado por el asesor tras contacto.";
    }

    order.status = "Rechazada";
    order.rejectReason = finalReason;

    localStorage.setItem("keho_orders_db", JSON.stringify(orders));
    cerrarModalRechazo();
    loadAndRenderOrders();
    showToast(`Orden ${order.code} rechazada.`, "warning");
  };
}

// ==========================================
// 4. GESTIÓN DE PRODUCTOS (BUSCADOR & EDICIÓN COMPLETA)
// ==========================================
function getStoredProducts() {
  const stored = localStorage.getItem("keho_products_db");
  return stored ? JSON.parse(stored) : [];
}

function saveStoredProducts(prods) {
  localStorage.setItem("keho_products_db", JSON.stringify(prods));
}

function loadAndRenderAdminProducts() {
  const tbody = document.getElementById("productsTableBody");
  const countBadge = document.getElementById("productsCountBadge");
  if (!tbody) return;

  const prods = getStoredProducts();

  const filteredProds = prods.map((p, idx) => ({ ...p, originalIndex: idx })).filter(p => {
    const term = productSearchTerm.toLowerCase();
    return p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term);
  });

  if (countBadge) {
    countBadge.textContent = `${filteredProds.length} de ${prods.length} productos`;
  }

  if (filteredProds.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 3rem;">No se encontraron productos que coincidan con la búsqueda.</td></tr>`;
    return;
  }

  tbody.innerHTML = filteredProds.map(p => {
    const isOut = p.isUnavailable || p.stock <= 0;
    return `
      <tr style="${isOut ? 'opacity: 0.65; background: rgba(0,0,0,0.2);' : ''}">
        <td>
          <img class="prod-mini-thumb" src="${p.image}" alt="${p.name}">
        </td>
        <td>
          <strong>${p.name}</strong><br>
          <small style="color: var(--accent-cyan); text-transform: uppercase;">${p.category}</small>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span>$</span>
            <input type="number" step="0.01" class="input-table-edit" value="${p.price}" onchange="window.actualizarPrecioProd(${p.originalIndex}, this.value)">
          </div>
        </td>
        <td>
          <input type="number" min="0" class="input-table-edit" style="width: 70px;" value="${p.stock}" onchange="window.actualizarStockProd(${p.originalIndex}, this.value)">
        </td>
        <td>
          <span class="badge-stock ${isOut ? 'out' : 'available'}">
            ${isOut ? 'Agotado / Inexistente' : 'Disponible'}
          </span>
        </td>
        <td>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button type="button" class="btn-act" style="background: rgba(6, 182, 212, 0.15); color: var(--accent-cyan); border: 1px solid rgba(6, 182, 212, 0.4);" onclick="window.abrirModalEditarProducto(${p.originalIndex})">
              ✏️ Editar
            </button>
            <button type="button" class="btn-act" style="background: #1e293b; color: #fff; border: 1px solid var(--border-color);" onclick="window.alternarDisponibilidadProd(${p.originalIndex})">
              ${p.isUnavailable ? '✓ Habilitar' : '🚫 Deshabilitar'}
            </button>
            <button type="button" class="btn-act btn-cancel-order" onclick="window.eliminarProducto(${p.originalIndex})">
              🗑 Borrar
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// Buscador de productos
const productSearchInput = document.getElementById("productSearchInput");
if (productSearchInput) {
  productSearchInput.addEventListener("input", (e) => {
    productSearchTerm = e.target.value.trim();
    loadAndRenderAdminProducts();
  });
}

// Acciones rápidas de tabla
window.actualizarPrecioProd = function(index, nuevoPrecio) {
  const prods = getStoredProducts();
  const precio = parseFloat(nuevoPrecio);
  if (!isNaN(precio) && precio > 0) {
    prods[index].price = precio;
    saveStoredProducts(prods);
    showToast(`Precio actualizado a $${precio.toFixed(2)}`, "success");
    loadAndRenderAdminProducts();
  }
};

window.actualizarStockProd = function(index, nuevoStock) {
  const prods = getStoredProducts();
  const stock = parseInt(nuevoStock);
  if (!isNaN(stock) && stock >= 0) {
    prods[index].stock = stock;
    prods[index].isUnavailable = (stock === 0);
    saveStoredProducts(prods);
    showToast(`Stock actualizado a ${stock} unidades.`, "success");
    loadAndRenderAdminProducts();
  }
};

window.alternarDisponibilidadProd = function(index) {
  const prods = getStoredProducts();
  prods[index].isUnavailable = !prods[index].isUnavailable;
  saveStoredProducts(prods);
  showToast(`Estado de producto actualizado.`, "success");
  loadAndRenderAdminProducts();
};

window.eliminarProducto = function(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este producto del catálogo?")) {
    const prods = getStoredProducts();
    const removedName = prods[index].name;
    prods.splice(index, 1);
    saveStoredProducts(prods);
    showToast(`"${removedName}" ha sido eliminado.`, "warning");
    loadAndRenderAdminProducts();
  }
};

// ==========================================
// CONTROL DEL MODAL (CREAR & EDITAR COMPLETO)
// ==========================================
if (openAddProductModalBtn) {
  openAddProductModalBtn.onclick = () => {
    productForm.reset();
    editingProductId.value = "";
    productModalTitle.textContent = "Añadir Nuevo Producto";
    productModal.classList.add("open");
  };
}

window.abrirModalEditarProducto = function(index) {
  const prods = getStoredProducts();
  const p = prods[index];
  if (!p) return;

  editingProductId.value = p.id;
  document.getElementById("prodName").value = p.name || "";
  document.getElementById("prodCategory").value = p.category || "iphones";
  document.getElementById("prodPrice").value = p.price || 0;
  document.getElementById("prodStock").value = p.stock || 0;
  document.getElementById("prodImage").value = p.image || "";
  document.getElementById("prodDesc").value = p.desc || "";

  productModalTitle.textContent = `Editar: ${p.name}`;
  productModal.classList.add("open");
};

const cerrarModalProducto = () => {
  if (productModal) productModal.classList.remove("open");
  if (productForm) productForm.reset();
  editingProductId.value = "";
};

if (closeProductModalBtn) closeProductModalBtn.onclick = cerrarModalProducto;
if (cancelProductBtn) cancelProductBtn.onclick = cerrarModalProducto;

if (productForm) {
  productForm.onsubmit = (e) => {
    e.preventDefault();
    const idToEdit = editingProductId.value;
    const name = document.getElementById("prodName").value.trim();
    const category = document.getElementById("prodCategory").value;
    const price = parseFloat(document.getElementById("prodPrice").value) || 0;
    const stock = parseInt(document.getElementById("prodStock").value) || 0;
    const image = document.getElementById("prodImage").value.trim();
    const desc = document.getElementById("prodDesc").value.trim();

    if (!name || price <= 0 || !image) {
      alert("Por favor completa los datos obligatorios.");
      return;
    }

    const prods = getStoredProducts();

    if (idToEdit) {
      // MODO EDICIÓN
      const targetIndex = prods.findIndex(p => String(p.id) === String(idToEdit));
      if (targetIndex !== -1) {
        prods[targetIndex].name = name;
        prods[targetIndex].category = category;
        prods[targetIndex].price = price;
        prods[targetIndex].stock = stock;
        prods[targetIndex].image = image;
        prods[targetIndex].desc = desc;
        prods[targetIndex].isUnavailable = (stock <= 0);
        showToast(`"${name}" actualizado correctamente.`, "success");
      }
    } else {
      // MODO CREACIÓN
      const newProd = {
        id: Date.now(),
        name,
        category,
        price,
        stock,
        image,
        desc,
        isUnavailable: (stock <= 0)
      };
      prods.unshift(newProd);
      showToast(`¡"${name}" añadido al catálogo!`, "success");
    }

    saveStoredProducts(prods);
    cerrarModalProducto();
    loadAndRenderAdminProducts();
  };
}

// ==========================================
// 5. SONIDO Y NOTIFICACIÓN DE NUEVO PEDIDO
// ==========================================
function playNotificationChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
    gain1.gain.setValueAtTime(0.15, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.35);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
    gain2.gain.setValueAtTime(0.18, ctx.currentTime + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.15);
    osc2.stop(ctx.currentTime + 0.6);
  } catch (err) {}
}

window.addEventListener("storage", (e) => {
  if (e.key === "keho_orders_db") {
    loadAndRenderOrders();
    const session = sessionStorage.getItem("keho_admin_session");
    if (session === "active") {
      playNotificationChime();
      showToast("🔔 ¡Nueva solicitud de pedido recibida!", "success");
    }
  }
});

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<div class="toast-content"><span>${message}</span></div><div class="toast-progress"></div>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 250);
  }, 2500);
}

// Arranque
checkAdminAuth();