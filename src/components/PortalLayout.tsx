import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

export default function PortalLayout() {
  return (
    <div className="flex h-screen bg-surface-secondary overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopHeader />
        <main className="flex-1 overflow-auto bg-surface-secondary">
          <div className="min-h-full p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
