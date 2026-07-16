'use client';

import { BookingWithCabin } from '@/types/Booking';
import ReservationCard from './ReservationCard';
import { useOptimistic } from 'react';
import { deleteReservation } from '../_lib/actions';

export default function ReservationsList({ reservations }: { reservations: BookingWithCabin[] }) {
  // NOTE: First param: the var state to infer optimistic results
  // Second param: Similar to reducer functions, the firs param is the current state and the second an actions (values) taht will be used to modify the state
  const [optimisticReservations, optimisticDelete] = useOptimistic(
    reservations,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => bookingId !== booking.id);
    },
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticReservations.map((reservation) => (
        <ReservationCard booking={reservation} key={reservation.id} onDelete={handleDelete} />
      ))}
    </ul>
  );
}
