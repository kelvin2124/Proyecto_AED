USE KehoTechnologyDB;
GO

-- 1. TABLA ROLES
CREATE TABLE Roles (
    RolID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(50) NOT NULL
);
GO

-- 2. TABLA CATEGORIAS
CREATE TABLE Categorias (
    CategoriaID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(255)
);
GO

-- 3. TABLA PRODUCTOS
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

SELECT * FROM Productos;

SELECT p.ProductoID, p.Nombre AS Producto, p.Precio, c.Nombre AS Categoria
FROM Productos p
INNER JOIN Categorias c ON p.CategoriaID = c.CategoriaID;

SELECT ProductoID, Nombre, Precio, Stock 
FROM Productos 
WHERE Precio > 500.00;

SELECT c.Nombre AS Categoria, COUNT(p.ProductoID) AS TotalProductos
FROM Categorias c
LEFT JOIN Productos p ON c.CategoriaID = p.CategoriaID
GROUP BY c.Nombre
ORDER BY TotalProductos DESC;

SELECT Nombre, Precio, Stock 
FROM Productos 
WHERE Precio < 1000.00 AND Stock <= 10;

SELECT u.NombreCompleto AS Cliente, pr.Nombre AS Producto, dp.Cantidad, p.Estado 
FROM Pedidos p
INNER JOIN Usuarios u ON p.UsuarioID = u.UsuarioID
INNER JOIN DetallePedido dp ON p.PedidoID = dp.PedidoID
INNER JOIN Productos pr ON dp.ProductoID = pr.ProductoID;

SELECT 
    (SELECT ISNULL(SUM(Total), 0) FROM Pedidos) AS IngresosTotales,
    (SELECT AVG(Precio) FROM Productos) AS PrecioPromedio;

SELECT ProductoID, Nombre, Precio, Stock 
FROM Productos 
WHERE Nombre LIKE '%Laptop%';

UPDATE Productos 
SET Precio = 1199.99, Stock = 15 
WHERE ProductoID = 1;

DELETE FROM Pedidos 
WHERE Estado = 'Cancelado';