import express, { type Express } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import { env } from './config'
import productRoutes from './routes/product-routes'
import { swaggerDocument } from './config/swagger'
import productCategoryRoutes from './routes/product-category-routes'

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/typescript-express'
  )
  .then(() => {
    console.log('🔌 Connected to MongoDB')
  })
  .catch(error => {
    console.error('🔌 Error connecting to MongoDB:', error)
  })

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Sending the swagger document as a JSON file, for use in the frontend (Orval generation)
app.get('/api-docs-json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerDocument)
})

// Routes
app.use('/api/products', productRoutes)
app.use('/api/categories', productCategoryRoutes)

app.listen(env.PORT, () => {
  console.log(`🚀 Running on port ${env.PORT} `)
  console.log(`🔌 API Docs: http://localhost:${env.PORT}/api-docs`)
})

export default app
