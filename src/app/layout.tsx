import "./globals.css";

import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import ClientOnly from "./components/ClientOnly/ClientOnly";
import { AuthProvider } from "./providers/AuthProvider";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Front Blog",
  description: "Blog dinâmico estudantil",
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <AuthProvider>{children}</AuthProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
