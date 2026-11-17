import React from 'react';

// Dummy appointment data – replace with real API call later
const dummyAppointments = [
  { id: 1, date: '2026-12-01', time: '10:00 AM', client: 'Alice Smith', service: 'Eye Exam' },
  { id: 2, date: '2026-12-01', time: '11:30 AM', client: 'Bob Johnson', service: 'Contact Lens Fitting' },
  { id: 3, date: '2026-12-02', time: '02:15 PM', client: 'Carol Lee', service: 'Eye Exam' },
];

export default function Calendar() {
  return (
    <table className="w-full table-auto border-collapse bg-white shadow rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Date</th>
          <th className="p-2 text-left">Time</th>
          <th className="p-2 text-left">Client</th>
          <th className="p-2 text-left">Service</th>
        </tr>
      </thead>
      <tbody>
        {dummyAppointments.map((a) => (
          <tr key={a.id} className="border-b">
            <td className="p-2">{a.date}</td>
            <td className="p-2">{a.time}</td>
            <td className="p-2">{a.client}</td>
            <td className="p-2">{a.service}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
