import { type IProduct, Product } from '../models/product'
import { Types } from 'mongoose'

class ProductService {
  async getAllProducts(): Promise<IProduct[]> {
    // Get all products sorted by createdAt in descending order
    return await Product.find().sort({ createdAt: -1 })
  }

  async createProduct(productData: {
    name: string
    description: string
    price: number
    quantity: number
    category: string
  }): Promise<IProduct> {
    const product = new Product(productData)
    return await product.save()
  }

  async updateProduct(
    id: string,
    productData: {
      name?: string
      description?: string
      price?: number
      quantity?: number
      category?: string
    }
  ): Promise<IProduct> {
    // Check if the id is a valid mongoose id
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid product ID')
    }

    // Update the product with the new data and return the updated product
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: productData },
      { new: true, runValidators: true }
    )

    // If the product is not found, throw an error
    if (!product) {
      throw new Error('Product not found')
    }

    // Return the updated product
    return product
  }

  async searchProducts(searchTerm: string): Promise<IProduct[]> {
    // Search for products by name, description, or category
    return await Product.find(
      { $text: { $search: searchTerm } },
      { score: { $meta: 'textScore' } } // Return the score of the search
    )
      .sort({ score: { $meta: 'textScore' } }) // Sort the products by the score
      .exec()
  }
}

export const productService = new ProductService()
