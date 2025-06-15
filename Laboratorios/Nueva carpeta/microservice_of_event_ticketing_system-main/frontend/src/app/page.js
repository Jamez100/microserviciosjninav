'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Bienvenido a Ticketing App
      </h1>

      {isAuthenticated ? (
        <div>
          <p className="text-xl text-gray-700 mb-8">
            Hola, {user?.username}  <br />
            {user?.role}!
          </p>
            
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/events" className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg transition-colors">
              <h2 className="text-xl font-semibold mb-2">Eventos</h2>
              <p>Explora todos los eventos disponibles</p>
            </Link>
            
            <Link href="/tickets" className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg transition-colors">
              <h2 className="text-xl font-semibold mb-2">Mis Tickets</h2>
              <p>Gestiona tus tickets comprados</p>
            </Link>
            
            <Link href="/notifications" className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg transition-colors">
              <h2 className="text-xl font-semibold mb-2">Notificaciones</h2>
              <p>Revisa tus notificaciones</p>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-xl text-gray-700 mb-8">
            Inicia sesión para acceder a todas las funcionalidades
          </p>
          <Link 
            href="/login" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      )}
    </div>
  );
}