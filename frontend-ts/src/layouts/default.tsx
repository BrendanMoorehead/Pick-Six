import Header from '@/components/Header';
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      {children}
    </div>
  );
}
