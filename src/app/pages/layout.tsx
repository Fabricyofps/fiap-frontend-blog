import { Nunito } from "next/font/google";
import "../globals.css";
import ClienteOnly from "../components/ClientOnly/ClientOnly";
import { SearchProvider } from "../libs/contexts/SearchContext";
import Navbar from "../components/Navbar/Navbar";
import DeletarPostModal from "../components/Modal/DeletarPost";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Front Blog",
  description: "Blog dinâmico estudantil",
};

export default async function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <section className={font.className}>
      <ClienteOnly>
        <SearchProvider>
          <Navbar />
          <DeletarPostModal />
          <div className="max-w-[2520px] mx-auto"> {children}</div>
        </SearchProvider>
      </ClienteOnly>
    </section>
  );
}
