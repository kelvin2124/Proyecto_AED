console.log("¡El archivo iniciar.js se cargó correctamente!");

let isRegisterMode = false;

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const authCardTitle = document.getElementById("authCardTitle");
const authCardSubtitle = document.getElementById("authCardSubtitle");
const authErrorMsg = document.getElementById("authErrorMsg");
const toggleText = document.getElementById("toggleText");
const toggleAuthBtn = document.getElementById("toggleAuthBtn");

const googleModal = document.getElementById("googleModal");
const btnGoogleLogin = document.getElementById("btnGoogleLogin");
const btnGoogleRegister = document.getElementById("btnGoogleRegister");
const btnCloseGoogleModal = document.getElementById("btnCloseGoogleModal");

// Cambiar entre formulario Iniciar y Crear
if (toggleAuthBtn) {
  toggleAuthBtn.onclick = () => {
    isRegisterMode = !isRegisterMode;
    hideError();

    if (isRegisterMode) {
      loginForm.classList.remove("active");
      registerForm.classList.add("active");
      authCardTitle.textContent = "Crear Cuenta Nueva";
      authCardSubtitle.textContent = "Regístrate gratis para realizar compras y dar seguimiento";
      toggleText.textContent = "¿Ya tienes una cuenta?";
      toggleAuthBtn.textContent = "Inicia sesión aquí";
    } else {
      registerForm.classList.remove("active");
      loginForm.classList.add("active");
      authCardTitle.textContent = "Ingresar a tu Cuenta";
      authCardSubtitle.textContent = "Accede para gestionar tus pedidos y compras en KEHO-Technology";
      toggleText.textContent = "¿No tienes una cuenta aún?";
      toggleAuthBtn.textContent = "Regístrate aquí";
    }
  };
}

function showError(msg) {
  if (authErrorMsg) {
    authErrorMsg.textContent = msg;
    authErrorMsg.style.display = "block";
  }
}

function hideError() {
  if (authErrorMsg) {
    authErrorMsg.style.display = "none";
  }
}

// Abrir y cerrar Modal de Google
function abrirModalGoogle() {
  if (googleModal) googleModal.classList.add("open");
}

function cerrarModalGoogle() {
  if (googleModal) googleModal.classList.remove("open");
}

if (btnGoogleLogin) btnGoogleLogin.onclick = abrirModalGoogle;
if (btnGoogleRegister) btnGoogleRegister.onclick = abrirModalGoogle;
if (btnCloseGoogleModal) btnCloseGoogleModal.onclick = cerrarModalGoogle;

function seleccionarCuentaGoogle(fullName, email) {
  const activeUser = {
    name: fullName.split(" ")[0],
    fullName: fullName,
    email: email,
    authMethod: "google"
  };

  localStorage.setItem("keho_user", JSON.stringify(activeUser));
  cerrarModalGoogle();
  showToast(`¡Bienvenido/a, ${activeUser.name}!`, "success");

  setTimeout(() => {
    window.location.href = "../Login/Login.html";
  }, 800);
}

function usarOtraCuentaGoogle() {
  const userEmail = prompt("Ingresa el correo electrónico de tu cuenta:");
  if (!userEmail || !userEmail.trim()) return;

  const cleanEmail = userEmail.trim().toLowerCase();
  const namePart = cleanEmail.split("@")[0].replace(/[\._]/g, " ");
  const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

  seleccionarCuentaGoogle(formattedName, cleanEmail);
}

// ==========================================
// CONEXIÓN CON EL BACKEND (SQL SERVER)
// ==========================================

// 1. INICIAR SESIÓN (LOGIN)
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const pass = document.getElementById("loginPass").value;

    if (!email || !pass) {
      showError("Por favor completa tu correo y contraseña.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pass })
      });

      const resultado = await respuesta.json();

      if (resultado.success) {
        showToast("¡Sesión iniciada con éxito!", "success");
        // Usamos la misma llave "keho_user" que usa Google para que la tienda lo reconozca
        localStorage.setItem('keho_user', JSON.stringify(resultado.user));
        
        setTimeout(() => {
          // Cambia esto al archivo donde está tu catálogo o menú principal real
          window.location.href = "../Login/Login.html"; 
        }, 800);
      } else {
        showError(resultado.message || "Correo o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      showError("No se pudo conectar con el servidor backend (puerto 3000).");
    }
  });
}

// 2. REGISTRO DE USUARIO
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Se hizo click");
    hideError();

    // IDs exactos que están en Iniciar.html
    const fullName = document.getElementById("regFullName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const pass = document.getElementById("regPass").value;

    if (!fullName || !email || !pass) {
      showError("Por favor completa todos los campos requeridos.");
      return;
    }

    if (pass.length < 6) {
      showError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      console.log("Enviando datos..");
      const respuesta = await fetch('http://localhost:3000/api/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, pass })
      });

      const resultado = await respuesta.json();
      console.log("Respuesta enviada", resultado);

      if (resultado.success) {
        showToast("¡Cuenta creada exitosamente en SQL Server!", "success");
        
        setTimeout(() => {
          // Cambiar automáticamente al formulario de login
          isRegisterMode = false;
          registerForm.classList.remove("active");
          loginForm.classList.add("active");
          authCardTitle.textContent = "Ingresar a tu Cuenta";
          authCardSubtitle.textContent = "Accede para gestionar tus pedidos y compras en KEHO-Technology";
          toggleText.textContent = "¿No tienes una cuenta aún?";
          toggleAuthBtn.textContent = "Regístrate aquí";
        }, 1000);
      } else {
        showError(resultado.message || "Este correo ya está registrado.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      showError("No se pudo conectar con el servidor backend (puerto 3000).");
    }
  });
}

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <span>${message}</span>
    </div>
    <div class="toast-progress"></div>
  `;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 250);
  }, 2500);
}