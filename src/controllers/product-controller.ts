import type { Request, Response } from 'express'
import { productService } from '../services/product-service'

class ProductController {
  getAllProducts = async (_req: Request, res: Response) => {
    try {
      const products = await productService.getAllProducts()
      return res.status(200).json(products)
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching products',
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      })
    }
  }

  createProduct = async (req: Request, res: Response) => {
    try {
      const { name, description, price, quantity, category } = req.body

      if (!name || !description || !price) {
        return res.status(400).json({
          message: 'Missing required fields',
        })
      }

      const product = await productService.createProduct({
        name,
        description,
        price,
        quantity: quantity || 0,
        category: category || '',
      })

      return res.status(201).json(product)
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating product',
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      })
    }
  }

  updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const updateData = req.body

      const product = await productService.updateProduct(id, updateData)

      return res.status(200).json(product)
    } catch (error) {
      if (error instanceof Error && error.message === 'Product not found') {
        return res.status(404).json({
          message: error.message,
        })
      }

      if (error instanceof Error && error.message === 'Invalid product ID') {
        return res.status(400).json({
          message: error.message,
        })
      }

      return res.status(500).json({
        message: 'Error updating product',
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      })
    }
  }

  searchProducts = async (req: Request, res: Response) => {
    try {
      const { q } = req.query

      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          message: 'Search term is required',
        })
      }

      const products = await productService.searchProducts(q)

      return res.status(200).json(products)
    } catch (error) {
      return res.status(500).json({
        message: 'Error searching products',
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      })
    }
  }
}

export const productController = new ProductController()
