

const express = require('express');
const cors = require('cors');
const { getConnection, sql } = require('./src/config/db');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// ==========================================
// RUTAS DE AUTENTICACIÓN Y USUARIOS
// ==========================================

// 1. REGISTRO DE USUARIO
app.post('/api/usuarios/registro', async (req, res) => {
  console.log("🟢 ¡Petición de registro recibida en el servidor!");
  const { fullName, email, pass } = req.body;

  try {
    console.log("🟡 Intentando obtener la conexión a la base de datos...");
    const pool = await getConnection();
    console.log("🟢 ¡Conexión obtenida con éxito en la ruta!"); 
    
    // Verificar si el correo ya existe
    const existe = await pool.request()
      .input('Correo', sql.VarChar, email)
      .query('SELECT * FROM Usuarios WHERE Correo = @Correo');

    if (existe.recordset.length > 0) {
      return res.status(400).json({ success: false, message: 'Este correo ya está registrado.' });
    }

    // Insertar nuevo usuario (RolID = 2 para Cliente por defecto)
    await pool.request()
      .input('NombreCompleto', sql.VarChar, fullName)
      .input('Correo', sql.VarChar, email)
      .input('Contrasena', sql.VarChar, pass)
      .input('RolID', sql.Int, 2)
      .query(`
        INSERT INTO Usuarios (NombreCompleto, Correo, Contrasena, RolID) 
        VALUES (@NombreCompleto, @Correo, @Contrasena, @RolID)
      `);

    res.json({ success: true, message: 'Usuario registrado exitosamente en SQL Server.' });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
});

// 2. INICIO DE SESIÓN (LOGIN)
app.post('/api/usuarios/login', async (req, res) => {
  const { email, pass } = req.body;

  try {
    const pool = await getConnection();

    const resultado = await pool.request()
      .input('Correo', sql.VarChar, email)
      .input('Contrasena', sql.VarChar, pass)
      .query('SELECT UsuarioID, NombreCompleto, Correo, RolID FROM Usuarios WHERE Correo = @Correo AND Contrasena = @Contrasena');

    if (resultado.recordset.length === 0) {
      return res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos.' });
    }

    const usuario = resultado.recordset[0];

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      user: {
        id: usuario.UsuarioID,
        name: usuario.NombreCompleto.split(' ')[0],
        fullName: usuario.NombreCompleto,
        email: usuario.Correo,
        roleId: usuario.RolID
      }
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

// Ruta para ver todos los usuarios registrados
app.get('/api/usuarios', async (req, res) => {
  try {
    const pool = await getConnection();
    const resultado = await pool.request().query('SELECT UsuarioID, NombreCompleto, Correo, RolID, fechaRegistro FROM Usuarios');
    res.json({ success: true, totalUsuarios: resultado.recordset.length, usuarios: resultado.recordset });
  } catch (error) {
    console.error("Error al consultar usuarios:", error);
    res.status(500).json({ success: false, message: 'Error al obtener los usuarios.' });
  }
});