import { Router } from 'express';
import * as ctrl from '../controllers/menuController';

const router = Router();

// Categories
router.get('/categories', ctrl.getCategories);
router.get('/categories/:id', ctrl.getCategory);
router.post('/categories', ctrl.createCategory);
router.put('/categories/:id', ctrl.updateCategory);
router.delete('/categories/:id', ctrl.deleteCategory);

// Menu Items
router.get('/items', ctrl.getMenuItems);
router.get('/items/:id', ctrl.getMenuItem);
router.post('/items', ctrl.createMenuItem);
router.put('/items/:id', ctrl.updateMenuItem);
router.delete('/items/:id', ctrl.deleteMenuItem);

export default router;
