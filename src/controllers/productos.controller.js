import { getConnection, sql, queries } from '../database';


export const getProducts = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllProducts);
        console.log(result);

        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

export const createNewProduct = async (req, res) => {

    const { id_almacen, descripcion, cantidad } = req.body

    if (id_almacen == null || descripcion == null || cantidad == null) {
        return res.status(400).json({ msg: 'Formulario incompleto, llena todos los campos' })
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input("nombre", sql.VarChar, descripcion)
            .input("id_almacen", sql.Int, id_almacen)
            .input("descripción", sql.VarChar, descripcion)
            .input("cantidad", sql.Int, cantidad)
            .query(queries.addNewProduct)

        res.json({ id_almacen, descripcion, cantidad });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getProductById = async (req, res) => {
    const { id_inventario } = req.params;
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id_inventario", id_inventario)
        .query(queries.getProductById);

    console.log(result);
    res.send(result.recordset[0]);
};

export const deleteProductById = async (req, res) => {
    const { id_inventario } = req.params;
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id_inventario", id_inventario)
        .query(queries.deleteProduct);
    console.log(result);
    res.send(result);
};

export const sumarProduct = async (req, res) => {
    const { id_inventario } = req.params;
    const { cantidad } = req.params;
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id_inventario", id_inventario)
        .input("cantidad", cantidad)
        .query(queries.sumarProduct);
    console.log(result);
    res.send(result);
};

export const restarProduct = async (req, res) => {
    const { id_inventario } = req.params;
    const { cantidad } = req.params;
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id_inventario", id_inventario)
        .input("cantidad", cantidad)
        .query(queries.restarProduct);
    console.log(result);
    res.send(result);
};

