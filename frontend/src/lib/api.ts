import { Category } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/menu/categories`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener el menú');
  return res.json();
}
