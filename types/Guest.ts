export type Guest = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  national_id: string | null;
  nationality: string | null;
  country_flag: string | null;
};
