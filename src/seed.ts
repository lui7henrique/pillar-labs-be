import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { Product } from './models/product'
import { env } from './config'

const NUM_PRODUCTS = 50
const MESSAGES_LOG = {
  CONNECTED: '🔌 Connected to MongoDB',
  DISCONNECTED: '🔌 Disconnected from MongoDB',
  CLEARED: '🧹 Cleared existing products',
  CREATED: `✨ Created ${NUM_PRODUCTS} products`,
  COMPLETED: '🌱 Seeding completed successfully',
  ERROR: '❌ Error seeding database:',
}

async function seedProducts() {
  try {
    await mongoose.connect(env.MONGODB_URI)
    console.log(MESSAGES_LOG.CONNECTED)

    await Product.deleteMany({})
    console.log(MESSAGES_LOG.CLEARED)

    const products = Array.from({ length: NUM_PRODUCTS }, () => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number.parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
      stock: faker.number.int({ min: 0, max: 100 }),
    }))

    await Product.insertMany(products)
    console.log(MESSAGES_LOG.CREATED)
    console.log(MESSAGES_LOG.COMPLETED)
  } catch (error) {
    console.error(MESSAGES_LOG.ERROR, error)
  } finally {
    // Close the connection
    await mongoose.disconnect()
    console.log(MESSAGES_LOG.DISCONNECTED)
  }
}

// Run the seed function
seedProducts()
