import { eachDayOfInterval } from 'date-fns';
import { supabase } from './supabase';
import { Country } from '@/types/Country';
import { Cabin } from '@/types/Cabin';
import { Guest } from '@/types/Guest';
import { Booking, BookingWithCabin } from '@/types/Booking';

/////////////
// GET

export async function getCabin(id: number): Promise<Cabin> {
  const { data, error } = await supabase.from('cabins').select('*').eq('id', id).single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getCabinPrice(id: number) {
  const { data, error } = await supabase
    .from('cabins')
    .select('regular_price, discount')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCabins = async function (): Promise<Cabin[]> {
  const { data, error } = await supabase
    .from('cabins')
    .select('id, name, max_capacity, regular_price, discount, image')
    .order('name');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<Guest> {
  const { data, error } = await supabase.from('guests').select('*').eq('email', email).single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id: number): Promise<Booking> {
  const { data, error, count } = await supabase.from('bookings').select('*').eq('id', id).single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  return data;
}

export async function getBookings(guestId: number): Promise<BookingWithCabin[]> {
  const { data: bookings, error } = await supabase
    .from('bookings')
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      'id, created_at, start_date, end_date, num_nights, num_guests, total_price, guest_id, cabin_id, cabins(name, image)',
    )
    .eq('guest_id', guestId)
    .order('start_date');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  const formattedData = bookings?.map((booking) => ({
    ...booking,
    // Safely grab the first element if profiles returns as an array
    cabins: Array.isArray(booking.cabins) ? booking.cabins[0] : booking.cabins,
  }));

  return formattedData;
}

export async function getBookedDatesByCabinId(cabinId: number): Promise<Date[]> {
  const todayDate = new Date();
  todayDate.setUTCHours(0, 0, 0, 0);
  const todayISO = todayDate.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabin_id', cabinId)
    .or(`start_date.gte.${todayISO},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.start_date),
        end: new Date(booking.end_date),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      'https://api.restcountries.com/countries/v5?limit=100&response_fields=names.common,codes.alpha_2',
      {
        headers: { Authorization: process.env.REST_COUNTRIES_KEY ?? '' },
      },
    );
    const { data } = await res.json();
    return data.objects;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: object) {
  const { data, error } = await supabase.from('guests').insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
}

export async function createBooking(newBooking: object) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id: string, updatedFields: object) {
  const { data, error } = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  return data;
}

export async function updateBooking(id: string, updatedFields: object) {
  const { data, error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id: string) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
