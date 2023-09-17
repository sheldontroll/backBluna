import {Router} from 'express'
import {createNewProduct, getProducts, getProductById, deleteProductById, sumarProduct, restarProduct} from '../controllers/productos.controller'

const router = Router()

router.get('/products', getProducts);

router.post('/products', createNewProduct);

router.get('/products/:id_inventario', getProductById);

router.delete('/products/borrar/:id_inventario', deleteProductById );

router.put('/products/:id_inventario/sumar/:cantidad', sumarProduct );

router.put('/products/:id_inventario/restar/:cantidad', restarProduct );

export default router