USE KehoTechnologyDB;
GO

-- 1. TABLA USUARIOS (Ya existente previamente)
IF NOT OBJECT_ID('Usuarios', 'U') IS NOT NULL
CREATE TABLE Usuarios (
    UsuarioID INT IDENTITY(1,1) PRIMARY KEY,
    NombreCompleto NVARCHAR(150) NOT NULL,
    Correo NVARCHAR(100) UNIQUE NOT NULL,
    Contrasena NVARCHAR(255) NOT NULL,
    Rol NVARCHAR(50) DEFAULT 'Cliente'
);
GO

-- 2. TABLA CATEGORIAS
IF NOT OBJECT_ID('Categorias', 'U') IS NOT NULL
CREATE TABLE Categorias (
    CategoriaID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(255)
);
GO

-- 3. TABLA PRODUCTOS
IF NOT OBJECT_ID('Productos', 'U') IS NOT NULL
CREATE TABLE Productos (
    ProductoID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(150) NOT NULL,
    Descripcion NVARCHAR(MAX),
    Precio DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL,
    ImagenUrl NVARCHAR(255),
    CategoriaID INT,
    FOREIGN KEY (CategoriaID) REFERENCES Categorias(CategoriaID)
);
GO

-- 4. TABLA PEDIDOS
IF NOT OBJECT_ID('Pedidos', 'U') IS NOT NULL
CREATE TABLE Pedidos (
    PedidoID INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioID INT NOT NULL,
    FechaPedido DATETIME DEFAULT GETDATE(),
    Total DECIMAL(10,2) NOT NULL,
    Estado NVARCHAR(50) DEFAULT 'Pendiente',
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);
GO

-- 5. TABLA DETALLE PEDIDO
IF NOT OBJECT_ID('DetallePedido', 'U') IS NOT NULL
CREATE TABLE DetallePedido (
    DetalleID INT IDENTITY(1,1) PRIMARY KEY,
    PedidoID INT NOT NULL,
    ProductoID INT NOT NULL,
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(10,2) NOT NULL,
    Subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (PedidoID) REFERENCES Pedidos(PedidoID),
    FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID)
);
GO

-- Insertar Categorías
INSERT INTO Categorias (Nombre, Descripcion) 
VALUES 
('Laptops', 'Portátiles de alto rendimiento y trabajo'), 
('Componentes', 'Piezas y hardware para PC');
GO

-- Insertar Productos de prueba
INSERT INTO Productos (Nombre, Descripcion, Precio, Stock, CategoriaID) 
VALUES 
('Laptop ASUS ROG', 'Intel Core i7, RTX 4060, 16GB RAM', 1299.99, 10, 1),
('Tarjeta Gráfica RTX 4070', '12GB GDDR6X', 649.99, 5, 2);
GO


SELECT * FROM Productos;