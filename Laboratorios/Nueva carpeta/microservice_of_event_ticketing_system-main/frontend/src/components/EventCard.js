import Link from 'next/link';

export default function EventCard({ event }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {event.description}
        </p>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div>📅 {formatDate(event.date)}</div>
          <div>📍 {event.location}</div>
          <div>💰 ${event.price}</div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className={`px-2 py-1 rounded text-xs ${
            event.available_tickets > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {event.available_tickets > 0 
              ? `${event.available_tickets} tickets disponibles`
              : 'Agotado'
            }
          </span>
          
          <Link
            href={`/events/${event.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}