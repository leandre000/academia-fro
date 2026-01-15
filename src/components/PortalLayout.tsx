import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

export default function PortalLayout() {
  return (
    <div className="flex h-screen bg-bg-primary overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-auto bg-gradient-soft">
          <div className="min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

