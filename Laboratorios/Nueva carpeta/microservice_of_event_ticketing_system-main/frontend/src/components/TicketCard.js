export default function TicketCard({ ticket }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'used':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'used':
        return 'Usado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {ticket.event?.title || 'Evento'}
        </h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}>
          {getStatusText(ticket.status)}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Ticket ID:</span>
          <span className="font-mono">{ticket.id}</span>
        </div>
        
        {ticket.event?.date && (
          <div className="flex justify-between">
            <span>Fecha:</span>
            <span>{formatDate(ticket.event.date)}</span>
          </div>
        )}
        
        {ticket.event?.location && (
          <div className="flex justify-between">
            <span>Ubicación:</span>
            <span>{ticket.event.location}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span>Precio:</span>
          <span className="font-semibold">${ticket.price}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Comprado:</span>
          <span>{formatDate(ticket.purchase_date)}</span>
        </div>
      </div>
      
      {ticket.qr_code && (
        <div className="mt-4 text-center">
          <img 
            src={ticket.qr_code} 
            alt="QR Code" 
            className="mx-auto w-20 h-20"
          />
          <p className="text-xs text-gray-500 mt-1">Código QR</p>
        </div>
      )}
    </div>
  );
}