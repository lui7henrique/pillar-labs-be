import { Router } from 'express'
import { productController } from '../controllers/product-controller'

const router = Router()

router.get('/', (req, res) => {
  productController.getAllProducts(req, res)
})

router.post('/', (req, res) => {
  productController.createProduct(req, res)
})

router.put('/:id', (req, res) => {
  productController.updateProduct(req, res)
})

router.get('/search', (req, res) => {
  productController.searchProducts(req, res)
})

export default router
