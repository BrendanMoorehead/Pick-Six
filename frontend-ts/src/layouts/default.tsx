import Header from '@/components/Header';
import Sidebar from '@/components/SidebarList';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen flex-col">
      <Header />
      <div className="h-full flex">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
