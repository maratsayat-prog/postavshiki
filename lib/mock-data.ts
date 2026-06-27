import type { Product, SupplierOrder } from "./types";

export const products: Product[] = [
  {
    id: "p-001",
    name: "Coca-Cola Original 1 л",
    brand: "Coca-Cola",
    category: "Напитки",
    supplier: "Coca-Cola İçecek Казахстан",
    price: 535,
    oldPrice: 570,
    unit: "упаковка 6 шт.",
    minOrder: 2,
    stock: 184,
    deliveryDays: 1,
    emoji: "🥤"
  },
  {
    id: "p-002",
    name: "Вода Tassay 0,5 л",
    brand: "Tassay",
    category: "Напитки",
    supplier: "Tassay Distribution",
    price: 1420,
    unit: "упаковка 12 шт.",
    minOrder: 1,
    stock: 320,
    deliveryDays: 1,
    emoji: "💧"
  },
  {
    id: "p-003",
    name: "Чипсы Lay’s сметана и зелень 140 г",
    brand: "Lay’s",
    category: "Снеки",
    supplier: "Food Distribution KZ",
    price: 3980,
    oldPrice: 4250,
    unit: "короб 12 шт.",
    minOrder: 1,
    stock: 76,
    deliveryDays: 2,
    emoji: "🥔"
  },
  {
    id: "p-004",
    name: "Молоко FoodMaster 2,5% 1 л",
    brand: "FoodMaster",
    category: "Молочные продукты",
    supplier: "FoodMaster Trade",
    price: 4320,
    unit: "короб 12 шт.",
    minOrder: 1,
    stock: 42,
    deliveryDays: 1,
    emoji: "🥛"
  },
  {
    id: "p-005",
    name: "Средство для посуды Fairy 450 мл",
    brand: "Fairy",
    category: "Бытовая химия",
    supplier: "Procter Distribution",
    price: 8760,
    unit: "короб 12 шт.",
    minOrder: 1,
    stock: 53,
    deliveryDays: 2,
    emoji: "🧴"
  },
  {
    id: "p-006",
    name: "Влажные салфетки Aura 120 шт.",
    brand: "Aura",
    category: "Гигиена",
    supplier: "Central Asia FMCG",
    price: 6450,
    oldPrice: 6980,
    unit: "короб 10 шт.",
    minOrder: 1,
    stock: 108,
    deliveryDays: 2,
    emoji: "🧻"
  }
];

export const supplierOrders: SupplierOrder[] = [
  {
    id: "ORD-1048",
    store: "Магазин у дома «Арман»",
    address: "Алматы, мкр. Самал-2, 41",
    items: 7,
    total: 84350,
    createdAt: "Сегодня, 10:18",
    status: "Новый"
  },
  {
    id: "ORD-1047",
    store: "Минимаркет «Береке»",
    address: "Алматы, ул. Жандосова, 58",
    items: 4,
    total: 46720,
    createdAt: "Сегодня, 09:42",
    status: "Подтверждён"
  },
  {
    id: "ORD-1042",
    store: "Продукты 24/7",
    address: "Алматы, ул. Толе би, 189",
    items: 11,
    total: 128400,
    createdAt: "Вчера, 16:05",
    status: "Собирается"
  },
  {
    id: "ORD-1036",
    store: "Маркет «Коктем»",
    address: "Алматы, мкр. Коктем-1, 12",
    items: 6,
    total: 73900,
    createdAt: "25 июня, 13:20",
    status: "Завершён"
  }
];
