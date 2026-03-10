import { Request, Response } from 'express';
import * as menuService from '../services/menuService';

// ── Categories ──────────────────────────────────────────────

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await menuService.getAllCategories();
  res.json(categories);
};

export const getCategory = async (req: Request, res: Response) => {
  const category = await menuService.getCategoryById(Number(req.params.id));
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const category = await menuService.createCategory(req.body);
  res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const category = await menuService.updateCategory(Number(req.params.id), req.body);
  res.json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  await menuService.deleteCategory(Number(req.params.id));
  res.status(204).send();
};

// ── Menu Items ───────────────────────────────────────────────

export const getMenuItems = async (_req: Request, res: Response) => {
  const items = await menuService.getAllMenuItems();
  res.json(items);
};

export const getMenuItem = async (req: Request, res: Response) => {
  const item = await menuService.getMenuItemById(Number(req.params.id));
  if (!item) return res.status(404).json({ message: 'MenuItem not found' });
  res.json(item);
};

export const createMenuItem = async (req: Request, res: Response) => {
  const item = await menuService.createMenuItem(req.body);
  res.status(201).json(item);
};

export const updateMenuItem = async (req: Request, res: Response) => {
  const item = await menuService.updateMenuItem(Number(req.params.id), req.body);
  res.json(item);
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  await menuService.deleteMenuItem(Number(req.params.id));
  res.status(204).send();
};
