export default function NotificationItem({ notification, onMarkAsRead, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'ticket_purchase':
        return '🎫';
      case 'event_reminder':
        return '⏰';
      case 'event_update':
        return '📢';
      case 'payment':
        return '💳';
      default:
        return '📧';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'ticket_purchase':
        return 'border-green-200 bg-green-50';
      case 'event_reminder':
        return 'border-yellow-200 bg-yellow-50';
      case 'event_update':
        return 'border-blue-200 bg-blue-50';
      case 'payment':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${
      notification.read 
        ? 'bg-white border-gray-200' 
        : `${getTypeColor(notification.type)} border-l-4`
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <span className="text-2xl">{getTypeIcon(notification.type)}</span>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900">
                {notification.title}
              </h3>
              {!notification.read && (
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
            
            <p className="text-gray-700 mb-2">
              {notification.message}
            </p>
            
            <p className="text-sm text-gray-500">
              {formatDate(notification.created_at)}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2 ml-4">
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="text-blue-600 hover:text-blue-800 text-sm"
              title="Marcar como leído"
            >
              ✓
            </button>
          )}
          
          <button
            onClick={() => onDelete(notification.id)}
            className="text-red-600 hover:text-red-800 text-sm"
            title="Eliminar"
          >
            ✗
          </button>
        </div>
      </div>
    </div>
  );
}