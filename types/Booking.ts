export type Booking = {
  id: number;
  cabin_id: number;
  guest_id: number;
  start_date: string;
  end_date: string;
  num_nights: number;
  total_price: number;
  num_guests: number;
  status?: string;
  created_at: string;
};

export type BookingWithCabin = Booking & {
  cabins: {
    name: string;
    image: string;
  };
};
