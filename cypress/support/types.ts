export interface UserCredentials {
  name: string;
  email: string;
  password: string;
  title: string;
  days: string;
  months: string;
  years: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile: string;
}

/**
 * Payload structure for API account creation/update requests
 */
export interface ApiUserPayload {
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
}
