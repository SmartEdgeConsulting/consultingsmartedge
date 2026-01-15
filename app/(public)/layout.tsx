import Footer from "@/sections/Footer";
import Navbar from "@/sections/Navbar";


export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mt-16 w-full mr-0 pr-0">{children}</main>
      <Footer />
    </>
  );
}
