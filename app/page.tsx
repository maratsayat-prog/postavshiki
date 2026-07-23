"use client";

import { useMemo, useState } from "react";

type Panel = "content" | "design" | "settings";
type MobileView = "edit" | "preview";
type ThemeId = "warm" | "dark" | "sky";
type RadiusId = "soft" | "round" | "square";
type BlockKind = "product" | "service" | "link" | "promo";

type CreatorBlock = {
  id: number;
  kind: BlockKind;
  title: string;
  subtitle: string;
  price?: string;
  badge?: string;
  visible: boolean;
};

const themeOptions: Array<{ id: ThemeId; name: string; note: string }> = [
  { id: "warm", name: "Тёплый", note: "Слоновая кость + коралл" },
  { id: "dark", name: "Ночной", note: "Чёрный + лайм" },
  { id: "sky", name: "Воздух", note: "Белый + синий" }
];

const starterBlocks: CreatorBlock[] = [
  {
    id: 1,
    kind: "product",
    title: "Гайд: первые 100 продаж",
    subtitle: "PDF · доступ сразу после оплаты",
    price: "12 900 ₸",
    badge: "Хит",
    visible: true
  },
  {
    id: 2,
    kind: "service",
    title: "Разбор вашего магазина",
    subtitle: "45 минут · Google Meet",
    price: "25 000 ₸",
    visible: true
  },
  {
    id: 3,
    kind: "promo",
    title: "Мои любимые инструменты",
    subtitle: "Подборка сервисов с промокодами",
    badge: "Партнёрское",
    visible: true
  },
  {
    id: 4,
    kind: "link",
    title: "Telegram-канал",
    subtitle: "Коротко о продажах и продукте",
    visible: true
  }
];

const blockMeta: Record<BlockKind, { icon: string; label: string }> = {
  product: { icon: "▣", label: "Товар" },
  service: { icon: "◷", label: "Услуга" },
  link: { icon: "↗", label: "Ссылка" },
  promo: { icon: "✦", label: "Реклама" }
};

export default function Home() {
  const [panel, setPanel] = useState<Panel>("content");
  const [mobileView, setMobileView] = useState<MobileView>("edit");
  const [theme, setTheme] = useState<ThemeId>("warm");
  const [radius, setRadius] = useState<RadiusId>("round");
  const [blocks, setBlocks] = useState<CreatorBlock[]>(starterBlocks);
  const [profile, setProfile] = useState({
    name: "Марат Сайат",
    handle: "marat",
    description: "Помогаю предпринимателям строить продукты и расти в e-commerce."
  });
  const [published, setPublished] = useState(false);
  const [toast, setToast] = useState("");

  const visibleBlocks = useMemo(() => blocks.filter((block) => block.visible), [blocks]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  }

  function addBlock(kind: BlockKind) {
    const templates: Record<BlockKind, Omit<CreatorBlock, "id">> = {
      product: {
        kind,
        title: "Новый цифровой продукт",
        subtitle: "Файл или доступ после оплаты",
        price: "9 900 ₸",
        visible: true
      },
      service: {
        kind,
        title: "Новая консультация",
        subtitle: "Онлайн-запись на удобное время",
        price: "20 000 ₸",
        visible: true
      },
      promo: {
        kind,
        title: "Рекламная рекомендация",
        subtitle: "Добавьте ссылку и условия размещения",
        badge: "Реклама",
        visible: true
      },
      link: {
        kind,
        title: "Новая ссылка",
        subtitle: "Добавьте короткое описание",
        visible: true
      }
    };

    setBlocks((current) => [...current, { ...templates[kind], id: Date.now() }]);
    setPanel("content");
    notify("Блок добавлен");
  }

  function toggleBlock(id: number) {
    setBlocks((current) =>
      current.map((block) => (block.id === id ? { ...block, visible: !block.visible } : block))
    );
  }

  function removeBlock(id: number) {
    setBlocks((current) => current.filter((block) => block.id !== id));
    notify("Блок удалён");
  }

  function moveBlock(id: number, direction: -1 | 1) {
    setBlocks((current) => {
      const index = current.findIndex((block) => block.id === id);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  }

  function publish() {
    setPublished(true);
    notify("Страница опубликована");
  }

  return (
    <main className={`builder-app theme-${theme} radius-${radius}`}>
      {toast && <div className="toast">{toast}</div>}

      <header className="app-header">
        <a className="brand" href="#" aria-label="Taply">
          <span className="brand-mark">t</span>
          <span className="brand-name">taply</span>
        </a>

        <div className="page-status">
          <span className={published ? "status-dot live" : "status-dot"} />
          <span>{published ? "Опубликовано" : "Черновик сохранён"}</span>
        </div>

        <div className="header-actions">
          <button className="ghost-button desktop-only" onClick={() => notify("Ссылка скопирована")}>Поделиться</button>
          <button className="publish-button" onClick={publish}>{published ? "Обновить" : "Опубликовать"}</button>
          <button className="avatar-button" aria-label="Профиль">М</button>
        </div>
      </header>

      <section className="workspace">
        <aside className={`editor-shell ${mobileView === "edit" ? "mobile-active" : ""}`}>
          <div className="editor-intro">
            <div>
              <span className="eyebrow">Ваша страница</span>
              <h1>Соберите витрину за несколько минут</h1>
            </div>
            <div className="mini-metrics">
              <div><b>1 284</b><span>просмотра</span></div>
              <div><b>6,8%</b><span>конверсия</span></div>
              <div><b>86 400 ₸</b><span>выручка</span></div>
            </div>
          </div>

          <nav className="editor-tabs" aria-label="Разделы конструктора">
            <button className={panel === "content" ? "active" : ""} onClick={() => setPanel("content")}>Контент</button>
            <button className={panel === "design" ? "active" : ""} onClick={() => setPanel("design")}>Дизайн</button>
            <button className={panel === "settings" ? "active" : ""} onClick={() => setPanel("settings")}>Настройки</button>
          </nav>

          <div className="editor-scroll">
            {panel === "content" && (
              <div className="panel-stack">
                <section className="editor-card profile-editor">
                  <div className="card-heading">
                    <div>
                      <span className="section-kicker">Профиль</span>
                      <h2>Первый экран</h2>
                    </div>
                    <span className="profile-badge">MS</span>
                  </div>

                  <label>
                    <span>Имя или бренд</span>
                    <input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />
                  </label>
                  <label>
                    <span>Адрес страницы</span>
                    <div className="slug-input"><span>taply.me/</span><input value={profile.handle} onChange={(event) => setProfile({ ...profile, handle: event.target.value.replace(/\s/g, "-").toLowerCase() })} /></div>
                  </label>
                  <label>
                    <span>Короткое описание</span>
                    <textarea rows={3} value={profile.description} onChange={(event) => setProfile({ ...profile, description: event.target.value })} />
                  </label>
                </section>

                <section className="blocks-section">
                  <div className="section-heading-row">
                    <div><span className="section-kicker">Структура</span><h2>Блоки страницы</h2></div>
                    <span>{blocks.length}</span>
                  </div>

                  <div className="block-list">
                    {blocks.map((block, index) => (
                      <article className={`block-row ${block.visible ? "" : "muted"}`} key={block.id}>
                        <button className="drag-handle" aria-label="Переместить">⋮⋮</button>
                        <div className={`block-icon kind-${block.kind}`}>{blockMeta[block.kind].icon}</div>
                        <div className="block-copy">
                          <span>{blockMeta[block.kind].label}</span>
                          <b>{block.title}</b>
                          <small>{block.price ?? block.subtitle}</small>
                        </div>
                        <div className="block-actions">
                          <button onClick={() => moveBlock(block.id, -1)} disabled={index === 0} aria-label="Поднять">↑</button>
                          <button onClick={() => moveBlock(block.id, 1)} disabled={index === blocks.length - 1} aria-label="Опустить">↓</button>
                          <button className={`visibility-toggle ${block.visible ? "on" : ""}`} onClick={() => toggleBlock(block.id)} aria-label="Показать или скрыть"><i /></button>
                          <button className="remove-button" onClick={() => removeBlock(block.id)} aria-label="Удалить">×</button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="add-section">
                  <span className="section-kicker">Добавить блок</span>
                  <div className="add-grid">
                    {(Object.keys(blockMeta) as BlockKind[]).map((kind) => (
                      <button key={kind} onClick={() => addBlock(kind)}>
                        <span className={`add-icon kind-${kind}`}>{blockMeta[kind].icon}</span>
                        <b>{blockMeta[kind].label}</b>
                        <small>{kind === "product" ? "Файл или товар" : kind === "service" ? "Запись и оплата" : kind === "promo" ? "CPA или фикс" : "Любой переход"}</small>
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {panel === "design" && (
              <div className="panel-stack">
                <section className="editor-card">
                  <div className="card-heading"><div><span className="section-kicker">Стиль</span><h2>Тема страницы</h2></div></div>
                  <div className="theme-grid">
                    {themeOptions.map((option) => (
                      <button key={option.id} className={`theme-option preview-${option.id} ${theme === option.id ? "selected" : ""}`} onClick={() => setTheme(option.id)}>
                        <span className="theme-demo"><i /><i /><i /></span>
                        <b>{option.name}</b>
                        <small>{option.note}</small>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="editor-card">
                  <div className="card-heading"><div><span className="section-kicker">Форма</span><h2>Скругление карточек</h2></div></div>
                  <div className="radius-switch">
                    {(["square", "soft", "round"] as RadiusId[]).map((item) => (
                      <button key={item} className={radius === item ? "selected" : ""} onClick={() => setRadius(item)}>
                        <span className={`radius-sample sample-${item}`} />
                        {item === "square" ? "Строго" : item === "soft" ? "Мягко" : "Кругло"}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="editor-card font-card">
                  <div><span className="section-kicker">Типографика</span><h2>Manrope</h2><p>Хорошо читается на кириллице и маленьких экранах.</p></div>
                  <span className="font-preview">Аа</span>
                </section>
              </div>
            )}

            {panel === "settings" && (
              <div className="panel-stack">
                <section className="editor-card settings-card">
                  <div className="card-heading"><div><span className="section-kicker">Продажи</span><h2>Приём заказов</h2></div><span className="connected-pill">Подключено</span></div>
                  <div className="setting-row"><div><b>Kaspi QR</b><span>Показывать QR после оформления</span></div><button className="switch on"><i /></button></div>
                  <div className="setting-row"><div><b>Заявка в WhatsApp</b><span>Дублировать новый заказ владельцу</span></div><button className="switch on"><i /></button></div>
                  <div className="setting-row"><div><b>Оплата картой</b><span>Подключить интернет-эквайринг</span></div><button className="connect-link">Подключить</button></div>
                </section>

                <section className="editor-card settings-card">
                  <div className="card-heading"><div><span className="section-kicker">Монетизация</span><h2>Рекламные размещения</h2></div></div>
                  <div className="setting-row"><div><b>Открыт для предложений</b><span>Бренды смогут присылать заявки</span></div><button className="switch on"><i /></button></div>
                  <div className="setting-row"><div><b>Минимальная цена</b><span>За одно размещение</span></div><strong>35 000 ₸</strong></div>
                </section>

                <section className="editor-card domain-card">
                  <span className="section-kicker">Домен</span>
                  <h2>{profile.handle || "your-name"}.taply.me</h2>
                  <p>Можно подключить собственный домен после публикации.</p>
                  <button className="outline-button">Подключить домен</button>
                </section>
              </div>
            )}
          </div>
        </aside>

        <section className={`preview-stage ${mobileView === "preview" ? "mobile-active" : ""}`}>
          <div className="preview-toolbar">
            <div className="device-switch"><button className="active">Телефон</button><button>Планшет</button></div>
            <span className="preview-url">taply.me/{profile.handle || "your-name"}</span>
            <button className="open-button" onClick={() => notify("Предпросмотр открыт")}>↗</button>
          </div>

          <div className="phone-wrap">
            <div className="phone-frame">
              <div className="phone-speaker" />
              <div className="phone-screen">
                <div className="public-page">
                  <header className="public-profile">
                    <div className="public-avatar">MS<span /></div>
                    <div className="public-title-row"><h2>{profile.name || "Ваше имя"}</h2><span>✓</span></div>
                    <p>{profile.description}</p>
                    <div className="social-row"><button>TG</button><button>IG</button><button>WA</button></div>
                  </header>

                  <div className="public-blocks">
                    {visibleBlocks.map((block) => (
                      <article className={`public-block public-${block.kind}`} key={block.id}>
                        <div className={`public-block-art kind-${block.kind}`}>{blockMeta[block.kind].icon}</div>
                        <div className="public-block-copy">
                          <div className="public-block-top">
                            <span>{blockMeta[block.kind].label}</span>
                            {block.badge && <em>{block.badge}</em>}
                          </div>
                          <h3>{block.title}</h3>
                          <p>{block.subtitle}</p>
                          {block.price && <b>{block.price}</b>}
                        </div>
                        <button className="public-arrow">→</button>
                      </article>
                    ))}
                  </div>

                  <footer className="public-footer"><span className="mini-logo">t</span> Сделано в taply</footer>
                </div>
              </div>
            </div>
          </div>

          <div className="preview-note">
            <span>⚡</span>
            <div><b>Сначала мобильный экран</b><p>Все блоки сразу проверяются в размере, где их увидят ваши покупатели.</p></div>
          </div>
        </section>
      </section>

      <nav className="mobile-bottom-nav">
        <button className={mobileView === "edit" ? "active" : ""} onClick={() => setMobileView("edit")}><span>✎</span>Редактор</button>
        <button className={mobileView === "preview" ? "active" : ""} onClick={() => setMobileView("preview")}><span>◉</span>Просмотр</button>
        <button className="mobile-publish" onClick={publish}><span>↑</span>Публикация</button>
      </nav>
    </main>
  );
}
