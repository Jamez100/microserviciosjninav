'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { eventsAPI, ticketsAPI } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

export default function EventDetail() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchEvent();
  }, [params.id]);

  const fetchEvent = async () => {
    try {
      const response = await eventsAPI.getById(params.id);
      setEvent(response.data);
    } catch (err) {
      setError('Error al cargar el evento');
      console.error('Error fetching event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setPurchasing(true);
    setError('');
    setSuccess('');

    try {
      await ticketsAPI.purchase({
        event_id: event.id,
        quantity: 1,
      });
      
      setSuccess('¡Ticket comprado exitosamente!');
      // Actualizar disponibilidad del evento
      setEvent({
        ...event,
        available_tickets: event.available_tickets - 1,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al comprar el ticket');
    } finally {
      setPurchasing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-pulse">Cargando evento...</div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center">
        <div className="text-gray-600">Evento no encontrado</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => router.back()}
        className="mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Volver
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
        )}
        
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {event.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Detalles</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center">
                  <span className="font-medium w-24">Fecha:</span>
                  <span>{formatDate(event.date)}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="font-medium w-24">Ubicación:</span>
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="font-medium w-24">Precio:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${event.price}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <span className="font-medium w-24">Disponibles:</span>
                  <span className={event.available_tickets > 0 ? 'text-green-600' : 'text-red-600'}>
                    {event.available_tickets > 0 
                      ? `${event.available_tickets} tickets`
                      : 'Agotado'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {success && (
            <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}
          
          {error && (
            <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="mt-8 text-center">
            {event.available_tickets > 0 ? (
              <button
                onClick={handlePurchase}
                disabled={purchasing}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                {purchasing ? 'Comprando...' : 'Comprar Ticket'}
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-400 text-white px-8 py-3 rounded-lg text-lg font-semibold cursor-not-allowed"
              >
                Agotado
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}