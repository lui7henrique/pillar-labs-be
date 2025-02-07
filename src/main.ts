import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { env } from './config'
import productRoutes from './routes/product-routes'
import { swaggerDocument } from './config/swagger'

dotenv.config()

const app = express()

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
app.use('/api/products', productRoutes)

app.listen(env.PORT, () => {
  console.log(`🚀 Running on port ${env.PORT} `)
  console.log(`🔌 API Docs: http://localhost:${env.PORT}/api-docs`)
})

export default app
