'use client';

import { useAuthStore } from '@/store/auth.store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Users, User, LogOut } from 'lucide-react';
import Cookies from 'js-cookie';
import api from '@/lib/api';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-bg">
      <aside className="w-64 flex-shrink-0 bg-sidebar-bg text-sidebar-text flex flex-col">
        <div className="p-6 font-display text-2xl tracking-wide border-b border-sidebar-hover">FINSIGHT</div>
        <nav className="flex-1 py-4 flex flex-col gap-1 px-4">
          <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname === '/dashboard' ? 'bg-sidebar-hover text-white font-medium' : 'hover:bg-sidebar-hover'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/records" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname.startsWith('/records') ? 'bg-sidebar-hover text-white font-medium' : 'hover:bg-sidebar-hover'}`}>
            <FileText size={20} /> Records
          </Link>
          {user?.role === 'ADMIN' && (
            <Link href="/users" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname === '/users' ? 'bg-sidebar-hover text-white font-medium' : 'hover:bg-sidebar-hover'}`}>
              <Users size={20} /> Users
            </Link>
          )}
          <Link href="/profile" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname === '/profile' ? 'bg-sidebar-hover text-white font-medium' : 'hover:bg-sidebar-hover'}`}>
            <User size={20} /> Profile
          </Link>
        </nav>
        <div className="p-4 border-t border-sidebar-hover">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center border border-white/20 shrink-0 text-white font-semibold text-xs tracking-widest shadow-inner">
                {user?.first_name?.[0]?.toUpperCase()}{user?.last_name?.[0]?.toUpperCase()}
              </div>
              <div className="text-sm min-w-0">
                <p className="font-medium text-white truncate">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-sidebar-text opacity-80 truncate">{user?.role}</p>
              </div>
            </div>
            <button onClick={async () => { 
                try { await api.post('/auth/logout'); } catch (e) {} 
                logout(); 
                Cookies.remove('accessToken'); 
                window.location.href='/login'; 
              }} 
              title="Logout" 
              className="p-2 hover:bg-sidebar-hover rounded-md text-sidebar-text">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-auto flex flex-col">
        <header className="h-16 border-b border-border bg-surface flex flex-shrink-0 items-center px-8">
          <h2 className="font-sans font-medium text-lg text-gray-900 capitalize flex-1">
            {pathname.split('/')[1] || 'Dashboard'}
          </h2>
        </header>
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
