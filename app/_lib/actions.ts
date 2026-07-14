'use server';

import { revalidatePath } from 'next/cache';
import { signIn, signOut } from './auth';
import { getRequiredSession } from './auth-helper';
import { supabase } from './supabase';

export async function updateGuest(formData: FormData) {
  const session = await getRequiredSession();

  const national_id = formData.get('national_id') as string;
  const nationalityField = formData.get('nationality') as string;
  const [nationality, countryAlpha] = nationalityField.split('%');

  if (!/^\d{8}$/.test(national_id)) throw new Error('Please provide a valid ID');

  let country_flag = '';
  if (countryAlpha)
    country_flag = `https://flags.restcountries.com/v5/w160/${countryAlpha.toLocaleLowerCase()}.png`;

  const updateData = {
    national_id,
    nationality,
    country_flag,
  };

  console.log('updateData: ', updateData);

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId);

  if (error) throw new Error('Guest could not be updated');

  revalidatePath('/account/profile');
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function deleteReservation(bookingId: number) {
  const session = await getRequiredSession();

  // NOTE: guestId is used to make sure only users can delet etheir own bookings (security)
  const { data, error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId)
    .eq('guest_id', session.user.guestId);

  if (error) throw new Error('Booking could not be deleted');

  revalidatePath('/account/reservations');
}
