import { Schema, model } from 'mongoose'

export interface IProductCategory {
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

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

export const ProductCategory = model<IProductCategory>(
  'ProductCategory',
  productCategorySchema
)
