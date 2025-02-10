import {
  type IProductCategory,
  ProductCategory,
} from '../models/product-category'

class ProductCategoryService {
  async getAllCategories(): Promise<IProductCategory[]> {
    return await ProductCategory.find().sort({ name: 1 }) // Sort the categories by name in ascending order (A-Z)
  }
}

export const productCategoryService = new ProductCategoryService()
