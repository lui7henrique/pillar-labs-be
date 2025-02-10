import { Schema, model } from 'mongoose'

export interface IProductCategory {
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

// Product category schema with the required fields and timestamps (createdAt and updatedAt)
const productCategorySchema = new Schema<IProductCategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Category description is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

// Export the product category model
export const ProductCategory = model<IProductCategory>(
  'ProductCategory',
  productCategorySchema
)
