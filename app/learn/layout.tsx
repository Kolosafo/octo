import Sidebar from "@/components/sidebar";

export default function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid grid-cols-[auto_1fr]'>
      <Sidebar />
      <div className="min-h-screen">
        {children}
      </div>
    </div>
  );
}
