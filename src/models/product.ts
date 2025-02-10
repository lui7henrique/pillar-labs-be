import { Schema, model } from 'mongoose'

export interface IProduct {
  name: string
  description: string
  price: number
  quantity: number
  category: string
  createdAt: Date
  updatedAt: Date
}

// Product schema with the required fields and timestamps (createdAt and updatedAt)
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
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
      min: [0, 'Quantity cannot be negative'],
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

// Export the product model
export const Product = model<IProduct>('Product', productSchema)
