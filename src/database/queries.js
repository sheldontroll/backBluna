export const queries = {
    getAllProducts: 'SELECT * FROM inventario',
    addNewProduct: 'INSERT INTO inventario (nombre, id_almacen, descripción, cantidad) VALUES (@nombre, @id_almacen, @descripción, @cantidad)',
    getProductById: 'SELECT * FROM inventario Where id_inventario = @id_inventario',
    deleteProduct: 'DELETE FROM inventario where id_inventario = @id_inventario',
    sumarProduct: 'UPDATE inventario set cantidad = cantidad + @cantidad where id_inventario=@id_inventario',
    restarProduct: 'UPDATE inventario set cantidad = cantidad - @cantidad where id_inventario=@id_inventario'
}