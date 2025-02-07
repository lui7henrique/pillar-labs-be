import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { env } from './config'
import productRoutes from './routes/product-routes'

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

app.use('/api/products', productRoutes)

app.listen(env.PORT, () => {
  console.log(`🚀 Running on port ${env.PORT} `)
})

export default app
