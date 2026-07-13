'use server';

import { signIn, signOut } from './auth';
import { getRequiredSession } from './auth-helper';
import { supabase } from './supabase';

export async function updateGuest(formData: FormData) {
  const session = await getRequiredSession();

  const national_id = formData.get('national_id') as string;
  const nationalityField = formData.get('nationality') as string;
  const [nationality, country_flag] = nationalityField.split('%');

  if (!/^\d{8}$/.test(national_id)) throw new Error('Please provide a valid ID');

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
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
