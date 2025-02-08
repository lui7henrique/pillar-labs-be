import { Schema, model } from 'mongoose'

interface IProduct {
  name: string
  description: string
  price: number
  stock: number
  category: string
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    stock: {
      type: Number,
      required: [true, 'Product stock is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

// Add text index for search functionality
productSchema.index({ name: 'text', description: 'text', category: 'text' })

export const Product = model<IProduct>('Product', productSchema)
