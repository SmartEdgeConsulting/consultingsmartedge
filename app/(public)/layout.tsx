// app/(public)/layout.tsx
import Footer from "@/sections/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <Footer /> 
    </>
  );
}