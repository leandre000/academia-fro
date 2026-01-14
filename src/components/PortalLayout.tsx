import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function PortalLayout() {
  return (
    <div className="flex h-screen bg-bg-primary">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

