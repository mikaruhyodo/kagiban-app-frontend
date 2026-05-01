import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  headerVariant?: 'default' | 'detail';
  headerTitle?: string;
}

export default function Layout({ headerVariant = 'default', headerTitle }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#fafafc]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header variant={headerVariant} title={headerTitle} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
