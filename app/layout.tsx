import type { Metadata } from "next";
import '../styles/index.scss';

export const metadata: Metadata = {
  title: "MyBooks — твоя библиотека",
  description: "Личная библиотека, список чтения и книги, к которым хочется вернуться.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
