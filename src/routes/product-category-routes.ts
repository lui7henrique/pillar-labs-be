import { Router } from 'express'
import { productCategoryController } from '../controllers/product-category-controller'

const router: Router = Router()

router.get('/', (req, res) => {
  productCategoryController.getAllCategories(req, res)
})

export default router
