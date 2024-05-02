import MobileNav from "@/components/mobile-nav";
import Sidebar from "@/components/sidebar";

export default function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid md:grid-cols-[auto_1fr]'>
      <Sidebar />
      <MobileNav />
      <div className="min-h-screen">
        {children}
      </div>
    </div>
  );
}
