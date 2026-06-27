"use client";

import { useMemo, useState } from "react";
import { products, supplierOrders } from "@/lib/mock-data";
import type { Category, Product, UserRole } from "@/lib/types";

const categories: Category[] = [
  "Все товары",
  "Напитки",
  "Снеки",
  "Молочные продукты",
  "Бытовая химия",
  "Гигиена"
];

const money = (value: number) =>
  new Intl.NumberFormat("ru-KZ", { maximumFractionDigits: 0 }).format(value) + " ₸";

export default function Home() {
  const [role, setRole] = useState<UserRole>("store");
  const [category, setCategory] = useState<Category>("Все товары");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "Все товары" || product.category === category;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.supplier.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const cartLines = products.filter((product) => cart[product.id]);
  const cartUnits = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = cartLines.reduce((sum, product) => sum + product.price * cart[product.id], 0);
  const supplierCount = new Set(cartLines.map((product) => product.supplier)).size;

  function addToCart(product: Product) {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
    setNotice(`${product.name} добавлен в корзину`);
    window.setTimeout(() => setNotice(""), 1800);
  }

  function changeQuantity(productId: string, delta: number) {
    setCart((current) => {
      const nextQuantity = (current[productId] ?? 0) + delta;
      const next = { ...current };
      if (nextQuantity <= 0) delete next[productId];
      else next[productId] = nextQuantity;
      return next;
    });
  }

  return (
    <main className="app-shell">
      {notice && <div className="toast">✓ {notice}</div>}

      <header className="topbar">
        <div className="brand-row">
          <div className="logo-mark">Ж</div>
          <div>
            <div className="brand-name">Жақын</div>
            <div className="brand-caption">Оптовые закупки рядом</div>
          </div>
        </div>

        <div className="role-switch" aria-label="Выбор режима">
          <button className={role === "store" ? "active" : ""} onClick={() => setRole("store")}>
            Я магазин
          </button>
          <button className={role === "supplier" ? "active" : ""} onClick={() => setRole("supplier")}>
            Я поставщик
          </button>
        </div>

        <div className="profile-chip">
          <span className="avatar">М</span>
          <span>
            <b>{role === "store" ? "Магазин Арман" : "Food Distribution"}</b>
            <small>Алматы</small>
          </span>
        </div>
      </header>

      {role === "store" ? (
        <StoreView
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          filteredProducts={filteredProducts}
          cart={cart}
          addToCart={addToCart}
          changeQuantity={changeQuantity}
          cartLines={cartLines}
          cartUnits={cartUnits}
          cartTotal={cartTotal}
          supplierCount={supplierCount}
        />
      ) : (
        <SupplierView />
      )}
    </main>
  );
}

interface StoreViewProps {
  category: Category;
  setCategory: (category: Category) => void;
  search: string;
  setSearch: (value: string) => void;
  filteredProducts: Product[];
  cart: Record<string, number>;
  addToCart: (product: Product) => void;
  changeQuantity: (id: string, delta: number) => void;
  cartLines: Product[];
  cartUnits: number;
  cartTotal: number;
  supplierCount: number;
}

function StoreView(props: StoreViewProps) {
  const {
    category,
    setCategory,
    search,
    setSearch,
    filteredProducts,
    cart,
    addToCart,
    changeQuantity,
    cartLines,
    cartUnits,
    cartTotal,
    supplierCount
  } = props;

  return (
    <div className="page-grid">
      <section className="content-column">
        <div className="hero-panel">
          <div>
            <span className="eyebrow">B2B-маркетплейс для малого ритейла</span>
            <h1>Закупайте товары у проверенных поставщиков</h1>
            <p>Сравнивайте цены, собирайте одну корзину и получайте поставки прямо в магазин.</p>
          </div>
          <div className="hero-metrics">
            <div><b>38</b><span>поставщиков</span></div>
            <div><b>4 820</b><span>товаров</span></div>
            <div><b>1–2 дня</b><span>доставка</span></div>
          </div>
        </div>

        <div className="toolbar">
          <label className="search-field">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Найти товар, бренд или поставщика"
            />
          </label>
          <button className="secondary-button">Фильтры <span className="filter-count">2</span></button>
        </div>

        <div className="category-row">
          {categories.map((item) => (
            <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>

        <div className="section-title-row">
          <div>
            <h2>{category === "Все товары" ? "Популярные товары" : category}</h2>
            <p>{filteredProducts.length} предложений в наличии</p>
          </div>
          <select aria-label="Сортировка" defaultValue="popular">
            <option value="popular">Сначала популярные</option>
            <option value="price">Сначала дешевле</option>
            <option value="delivery">Быстрая доставка</option>
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => {
            const quantity = cart[product.id] ?? 0;
            return (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <span>{product.emoji}</span>
                  {product.oldPrice && <em>Выгодно</em>}
                </div>
                <div className="product-meta">
                  <span>{product.category}</span>
                  <span>Остаток: {product.stock}</span>
                </div>
                <h3>{product.name}</h3>
                <p className="supplier-name">{product.supplier}</p>
                <div className="price-row">
                  <div>
                    <b>{money(product.price)}</b>
                    {product.oldPrice && <s>{money(product.oldPrice)}</s>}
                  </div>
                  <small>{product.unit}</small>
                </div>
                <div className="delivery-line">Доставка {product.deliveryDays === 1 ? "завтра" : `за ${product.deliveryDays} дня`} · минимум {product.minOrder}</div>
                {quantity === 0 ? (
                  <button className="primary-button full" onClick={() => addToCart(product)}>В корзину</button>
                ) : (
                  <div className="quantity-control">
                    <button onClick={() => changeQuantity(product.id, -1)}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => changeQuantity(product.id, 1)}>+</button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <aside className="cart-panel">
        <div className="cart-header">
          <div>
            <span className="eyebrow">Текущий заказ</span>
            <h2>Корзина</h2>
          </div>
          <span className="cart-count">{cartUnits}</span>
        </div>

        {cartLines.length === 0 ? (
          <div className="empty-cart">
            <div>🛒</div>
            <h3>Корзина пока пуста</h3>
            <p>Добавьте товары из каталога. Мы автоматически разделим заказ по поставщикам.</p>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {cartLines.map((product) => (
                <div className="cart-line" key={product.id}>
                  <div className="cart-line-icon">{product.emoji}</div>
                  <div className="cart-line-main">
                    <b>{product.name}</b>
                    <span>{money(product.price)} × {cart[product.id]}</span>
                    <div className="mini-quantity">
                      <button onClick={() => changeQuantity(product.id, -1)}>−</button>
                      <span>{cart[product.id]}</span>
                      <button onClick={() => changeQuantity(product.id, 1)}>+</button>
                    </div>
                  </div>
                  <strong>{money(product.price * cart[product.id])}</strong>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Товаров</span><b>{cartUnits}</b></div>
              <div><span>Поставщиков</span><b>{supplierCount}</b></div>
              <div className="total-line"><span>Итого</span><b>{money(cartTotal)}</b></div>
            </div>
            <button className="primary-button full checkout-button">Оформить заказ</button>
            <p className="cart-footnote">После оформления создадим {supplierCount} отдельных заказов поставщикам.</p>
          </>
        )}

        <div className="delivery-card">
          <span>🚚</span>
          <div><b>Доставка в магазин</b><p>Алматы, мкр. Самал-2, 41</p></div>
          <button>Изменить</button>
        </div>
      </aside>
    </div>
  );
}

function SupplierView() {
  const [selectedStatus, setSelectedStatus] = useState("Все");
  const filteredOrders = selectedStatus === "Все"
    ? supplierOrders
    : supplierOrders.filter((order) => order.status === selectedStatus);

  return (
    <section className="supplier-page">
      <div className="supplier-heading">
        <div>
          <span className="eyebrow">Кабинет поставщика</span>
          <h1>Доброе утро, Food Distribution</h1>
          <p>Следите за заказами, остатками и продажами в одном месте.</p>
        </div>
        <button className="primary-button">+ Добавить товар</button>
      </div>

      <div className="stats-grid">
        <StatCard label="Заказы сегодня" value="12" detail="+18% к прошлому дню" />
        <StatCard label="GMV за июнь" value="4,82 млн ₸" detail="74% от плана" />
        <StatCard label="Активные магазины" value="86" detail="+9 за этот месяц" />
        <StatCard label="Товары заканчиваются" value="7" detail="Требуют пополнения" warning />
      </div>

      <div className="supplier-layout">
        <div className="orders-card">
          <div className="card-heading">
            <div><h2>Заказы магазинов</h2><p>Последние заявки на поставку</p></div>
            <button className="secondary-button">Экспорт</button>
          </div>
          <div className="status-tabs">
            {["Все", "Новый", "Подтверждён", "Собирается", "Завершён"].map((status) => (
              <button key={status} className={selectedStatus === status ? "active" : ""} onClick={() => setSelectedStatus(status)}>{status}</button>
            ))}
          </div>
          <div className="orders-table-wrap">
            <table>
              <thead><tr><th>Заказ</th><th>Магазин</th><th>Состав</th><th>Сумма</th><th>Статус</th><th></th></tr></thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td><b>{order.id}</b><small>{order.createdAt}</small></td>
                    <td><b>{order.store}</b><small>{order.address}</small></td>
                    <td>{order.items} позиций</td>
                    <td><b>{money(order.total)}</b></td>
                    <td><span className={`status status-${order.status.toLowerCase().replace("ё", "е")}`}>{order.status}</span></td>
                    <td><button className="icon-button">→</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="side-stack">
          <div className="insight-card">
            <span className="insight-icon">↗</span>
            <div className="eyebrow">Возможность роста</div>
            <h3>7 товаров часто ищут магазины, но у вас их нет</h3>
            <p>Добавление этих SKU может принести около 480 000 ₸ дополнительного GMV в месяц.</p>
            <button>Посмотреть товары</button>
          </div>
          <div className="quick-card">
            <h3>Быстрые действия</h3>
            <button><span>▤</span> Загрузить товары из Excel <b>→</b></button>
            <button><span>◫</span> Обновить остатки <b>→</b></button>
            <button><span>⌁</span> Настроить доставку <b>→</b></button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function StatCard({ label, value, detail, warning = false }: { label: string; value: string; detail: string; warning?: boolean }) {
  return (
    <article className={`stat-card ${warning ? "warning" : ""}`}>
      <span>{label}</span>
      <b>{value}</b>
      <small>{detail}</small>
    </article>
  );
}
