import { Suspense, lazy } from 'react';

// Lazy‑load the actual calendar component
const Calendar = lazy(() => import('./Calendar.jsx'));

export default function AdminLayout() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin – Appointment Calendar</h1>
      <Suspense fallback={<div>Loading calendar…</div>}>
        <Calendar />
      </Suspense>
    </div>
  );
}
