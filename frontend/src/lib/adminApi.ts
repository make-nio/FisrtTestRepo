import { getToken } from './auth';
import { Category, MenuItem } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` };
}

// Auth
export async function loginRequest(username: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error ?? 'Error al iniciar sesión');
  return res.json() as Promise<{ token: string; username: string }>;
}

// Categories
export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/menu/categories`);
  return res.json();
}

export async function createCategory(data: { name: string; description?: string }) {
  const res = await fetch(`${API_URL}/api/menu/categories`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear categoría');
  return res.json();
}

export async function updateCategory(id: number, data: { name?: string; description?: string }) {
  const res = await fetch(`${API_URL}/api/menu/categories/${id}`, {
    method: 'PUT', headers: authHeaders(), body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar categoría');
  return res.json();
}

export async function deleteCategory(id: number) {
  const res = await fetch(`${API_URL}/api/menu/categories/${id}`, {
    method: 'DELETE', headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar categoría');
}

// Menu Items
export async function fetchItems(): Promise<MenuItem[]> {
  const res = await fetch(`${API_URL}/api/menu/items`);
  return res.json();
}

export async function createItem(data: {
  name: string; description?: string; price: number; categoryId: number; available?: boolean;
}) {
  const res = await fetch(`${API_URL}/api/menu/items`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear item');
  return res.json();
}

export async function updateItem(id: number, data: {
  name?: string; description?: string; price?: number; categoryId?: number; available?: boolean;
}) {
  const res = await fetch(`${API_URL}/api/menu/items/${id}`, {
    method: 'PUT', headers: authHeaders(), body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar item');
  return res.json();
}

export async function deleteItem(id: number) {
  const res = await fetch(`${API_URL}/api/menu/items/${id}`, {
    method: 'DELETE', headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar item');
}
