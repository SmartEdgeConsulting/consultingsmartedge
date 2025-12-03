// app/(public)/layout.tsx
import Navbar from "@/sections/Navbar"; 
import Footer from "@/sections/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar /> 
      <main>{children}</main>
      <Footer /> 
    </>
  );
}