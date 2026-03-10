import { Router } from 'express';
import * as ctrl from '../controllers/menuController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Categories — GET público, mutaciones protegidas
router.get('/categories', ctrl.getCategories);
router.get('/categories/:id', ctrl.getCategory);
router.post('/categories', requireAuth, ctrl.createCategory);
router.put('/categories/:id', requireAuth, ctrl.updateCategory);
router.delete('/categories/:id', requireAuth, ctrl.deleteCategory);

// Menu Items — GET público, mutaciones protegidas
router.get('/items', ctrl.getMenuItems);
router.get('/items/:id', ctrl.getMenuItem);
router.post('/items', requireAuth, ctrl.createMenuItem);
router.put('/items/:id', requireAuth, ctrl.updateMenuItem);
router.delete('/items/:id', requireAuth, ctrl.deleteMenuItem);

export default router;
