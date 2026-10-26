import type { Metadata } from "next";
import '../styles/index.scss';
import TheHeader from "@/components/TheHeader/TheHeader";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "MyBooks — твоя библиотека",
  description: "Личная библиотека, список чтения и книги, к которым хочется вернуться.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>
        <TheHeader />
        {children}
        <Toaster position="bottom-right" richColors />
        </body>
    </html>
  );
}
