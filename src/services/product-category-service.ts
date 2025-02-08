import {
  type IProductCategory,
  ProductCategory,
} from '../models/product-category'

class ProductCategoryService {
  async getAllCategories(): Promise<IProductCategory[]> {
    return await ProductCategory.find().sort({ name: 1 })
  }
}

export const productCategoryService = new ProductCategoryService()
