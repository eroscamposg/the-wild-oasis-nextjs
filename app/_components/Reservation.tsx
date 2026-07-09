import { Cabin } from '@/types/Cabin';
import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { auth } from '../_lib/auth';
import { headers } from 'next/headers';
import LoginMessage from './LoginMessage';

export default async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const data = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-100">
      <DateSelector cabin={cabin} settings={settings} bookedDates={bookedDates} />
      {data?.session ? <ReservationForm cabin={cabin} user={data.user} /> : <LoginMessage />}
    </div>
  );
}
