import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function PortalLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-bg-primary">
        <div className="min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

