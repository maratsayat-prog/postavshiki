import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taply — мобильная витрина для продаж",
  description: "Создавайте мобильные страницы, продавайте товары и услуги, принимайте заявки и рекламные размещения."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
