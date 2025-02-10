import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { Product } from './models/product'
import { ProductCategory } from './models/product-category'
import { env } from './config'

const NUM_PRODUCTS = 20
const NUM_CATEGORIES = 5

const MESSAGES_LOG = {
  CONNECTED: '🔌 Connected to MongoDB',
  DISCONNECTED: '🔌 Disconnected from MongoDB',
  CLEARED_PRODUCTS: '🧹 Cleared existing products',
  CLEARED_CATEGORIES: '🧹 Cleared existing categories',
  CREATED_PRODUCTS: `✨ Created ${NUM_PRODUCTS} products`,
  CREATED_CATEGORIES: `✨ Created ${NUM_CATEGORIES} categories`,
  COMPLETED: '🌱 Seeding completed successfully',
  ERROR: '❌ Error seeding database:',
}

async function seedDatabase() {
  try {
    await mongoose.connect(env.MONGODB_URI)
    console.log(MESSAGES_LOG.CONNECTED)

    await Product.deleteMany({})
    await ProductCategory.deleteMany({})
    console.log(MESSAGES_LOG.CLEARED_PRODUCTS)
    console.log(MESSAGES_LOG.CLEARED_CATEGORIES)

    const categories = Array.from({ length: NUM_CATEGORIES }, () => ({
      name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
    }))

    const savedCategories = await ProductCategory.insertMany(categories)
    console.log(MESSAGES_LOG.CREATED_CATEGORIES)

    const products = Array.from({ length: NUM_PRODUCTS }, () => {
      const randomCategory = faker.helpers.arrayElement(savedCategories)
      return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number.parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
        quantity: faker.number.int({ min: 0, max: 100 }),
        category: randomCategory.name,
      }
    })

    await Product.insertMany(products)
    console.log(MESSAGES_LOG.CREATED_PRODUCTS)
    console.log(MESSAGES_LOG.COMPLETED)
  } catch (error) {
    console.error(MESSAGES_LOG.ERROR, error)
  } finally {
    await mongoose.disconnect()
    console.log(MESSAGES_LOG.DISCONNECTED)
  }
}

seedDatabase()
