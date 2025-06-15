'use client';

import { useState, useEffect } from 'react';
import { notificationsAPI } from '@/lib/api';
import NotificationItem from '@/components/NotificationItem';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notificationsAPI.getAll();
      setNotifications(response.data);
    } catch (err) {
      setError('Error al cargar notificaciones');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationsAPI.markAsRead(id);
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await notificationsAPI.delete(id);
      setNotifications(notifications.filter(notif => notif.id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-pulse">Cargando notificaciones...</div>
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

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Notificaciones</h1>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            {unreadCount} nuevas
          </span>
        )}
      </div>
      
      {notifications.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg">No tienes notificaciones.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationItem 
              key={notification.id} 
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}