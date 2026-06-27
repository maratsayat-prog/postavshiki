import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Жақын — поставщики для магазинов у дома",
  description: "B2B-площадка для магазинов у дома и поставщиков"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
