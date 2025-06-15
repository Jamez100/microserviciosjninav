import { useEffect, useState } from 'react';
import api from '../api';

export default function Dashboard() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem('token');
      const { data } = await api.get('/reservas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservas(data);
    };
    fetch();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Mis Reservas</h2>
      <ul>
        {reservas.map(r => (
          <li key={r.id}>
            Médico {r.medico_id} — {r.start_time}
          </li>
        ))}
      </ul>
    </div>
  );
}
