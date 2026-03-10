import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ── Categories ──────────────────────────────────────────────

export const getAllCategories = () =>
  prisma.category.findMany({ include: { menuItems: true } });

export const getCategoryById = (id: number) =>
  prisma.category.findUnique({ where: { id }, include: { menuItems: true } });

export const createCategory = (data: { name: string; description?: string }) =>
  prisma.category.create({ data });

export const updateCategory = (id: number, data: { name?: string; description?: string }) =>
  prisma.category.update({ where: { id }, data });

export const deleteCategory = (id: number) =>
  prisma.category.delete({ where: { id } });

// ── Menu Items ───────────────────────────────────────────────

export const getAllMenuItems = () =>
  prisma.menuItem.findMany({ include: { category: true } });

export const getMenuItemById = (id: number) =>
  prisma.menuItem.findUnique({ where: { id }, include: { category: true } });

export const createMenuItem = (data: {
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  available?: boolean;
}) => prisma.menuItem.create({ data });

export const updateMenuItem = (
  id: number,
  data: { name?: string; description?: string; price?: number; categoryId?: number; available?: boolean }
) => prisma.menuItem.update({ where: { id }, data });

export const deleteMenuItem = (id: number) =>
  prisma.menuItem.delete({ where: { id } });
