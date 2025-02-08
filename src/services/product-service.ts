import { Product } from '../models/product'
import { Types } from 'mongoose'

class ProductService {
  async getAllProducts() {
    return await Product.find().sort({ createdAt: -1 })
  }

  async createProduct(productData: {
    name: string
    description: string
    price: number
    stock: number
    category: string
  }) {
    const product = new Product(productData)
    return await product.save()
  }

  async updateProduct(
    id: string,
    productData: {
      name?: string
      description?: string
      price?: number
      stock?: number
      category?: string
    }
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid product ID')
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: productData },
      { new: true, runValidators: true }
    )

    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }

  async searchProducts(searchTerm: string) {
    return await Product.find(
      { $text: { $search: searchTerm } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .exec()
  }
}

export const productService = new ProductService()
