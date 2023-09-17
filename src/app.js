import express from 'express'
import config from './config'
import productRoutes from './routes/products.routes'
import cors from 'cors'
const app = express()

let port= 6000;

app.set('port', config.port || 3000)

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use(productRoutes)

export default app