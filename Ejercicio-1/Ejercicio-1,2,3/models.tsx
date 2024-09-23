
interface RawAddress {
  line_1: string;
  line_2: string | null;
  zip_code: string;
  city_id: number;
  state_id: number;
}

export interface Address {
  line_1: string;
  line_2: string | null;
  zip_code: string;
  city: string;
  state: string;
}

interface RawContact {
  id: string;
  avatar_url: string;
  first_name: string;
  last_name: string;
  company: string;
  details: string;
  email: string;
  phone: {
    area_code: string;
    number: string;
  };
  addresses: RawAddress[];
}

export interface Contact {
  id: string;
  avatar_url: string;
  full_name: string;
  company: string;
  details: string;
  email: string;
  phone_number: string;
  addresses: Address[];
}

export interface ContactsScreenProps {
  contacts: RawContact[];
  cities: Record<string, string>;
  states: Record<string, string>;
}