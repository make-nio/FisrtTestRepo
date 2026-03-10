export interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  available: boolean;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  menuItems: MenuItem[];
}
