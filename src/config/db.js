const sql = require('mssql/msnodesqlv8');

async function getConnection() {
  try {
    // 1. Conectarnos a 'master' para asegurar que la base de datos exista
    const masterConfig = {
      connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=localhost;Database=master;Trusted_Connection=yes;TrustServerCertificate=yes;"
    };
    
    const masterPool = await sql.connect(masterConfig);
    
    await masterPool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'KehoTechnologyDB')
      BEGIN
        CREATE DATABASE KehoTechnologyDB;
      END
    `);
    await masterPool.close();

    // 2. Conectarnos oficialmente a 'KehoTechnologyDB'
    const dbConfig = {
      connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=localhost;Database=KehoTechnologyDB;Trusted_Connection=yes;TrustServerCertificate=yes;"
    };

    const pool = await sql.connect(dbConfig);

    // 3. Crear la tabla SOLO si no existe (sin borrar datos anteriores)
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Usuarios' and xtype='U')
      BEGIN
        CREATE TABLE Usuarios (
          UsuarioID INT IDENTITY(1,1) PRIMARY KEY,
          NombreCompleto NVARCHAR(150) NOT NULL,
          Correo NVARCHAR(150) NOT NULL UNIQUE,
          Contrasena NVARCHAR(255) NOT NULL,
          RolID INT DEFAULT 2,
          fechaRegistro DATETIME DEFAULT GETDATE()
        );
      END
    `);

    return pool;

  } catch (error) {
    console.error("🔴 Error detallado en db.js:", error);
    throw error;
  }
}

module.exports = { sql, getConnection };