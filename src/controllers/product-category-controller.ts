import type { Request, Response } from 'express'
import { productCategoryService } from '../services/product-category-service'

class ProductCategoryController {
  getAllCategories = async (_req: Request, res: Response) => {
    try {
      const categories = await productCategoryService.getAllCategories()
      return res.status(200).json(categories)
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching categories',
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      })
    }
  }
}

export const productCategoryController = new ProductCategoryController()
