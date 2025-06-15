'use client';

import { useState, useEffect } from 'react';
import { ticketsAPI } from '@/lib/api';
import TicketCard from '@/components/TicketCard';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await ticketsAPI.getUserTickets();
      setTickets(response.data);
    } catch (err) {
      setError('Error al cargar tickets');
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-pulse">Cargando tus tickets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Tickets</h1>
      
      {tickets.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg mb-4">No tienes tickets comprados aún.</p>
          <a 
            href="/events" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors"
          >
            Explorar Eventos
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}