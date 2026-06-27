export type UserRole = "store" | "supplier";

export type Category =
  | "Все товары"
  | "Напитки"
  | "Снеки"
  | "Молочные продукты"
  | "Бытовая химия"
  | "Гигиена";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Exclude<Category, "Все товары">;
  supplier: string;
  price: number;
  oldPrice?: number;
  unit: string;
  minOrder: number;
  stock: number;
  deliveryDays: number;
  emoji: string;
}

export interface SupplierOrder {
  id: string;
  store: string;
  address: string;
  items: number;
  total: number;
  createdAt: string;
  status: "Новый" | "Подтверждён" | "Собирается" | "Доставляется" | "Завершён";
}
