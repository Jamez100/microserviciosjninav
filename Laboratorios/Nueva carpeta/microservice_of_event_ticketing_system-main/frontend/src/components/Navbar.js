'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            Ticketing App
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/events" className="hover:text-blue-200">
                  Eventos
                </Link>
                <Link href="/tickets" className="hover:text-blue-200">
                  Mis Tickets
                </Link>
                <Link href="/notifications" className="hover:text-blue-200">
                  Notificaciones
                </Link>
                <span className="text-blue-200">
                  {user?.name || user?.email}
                </span>
                <button 
                  onClick={logout}
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}