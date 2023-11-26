export interface UsersModel {
  data: Datum[];
  links: Links;
  meta: Meta;
}

interface Meta {
  current_page: number;
  from: number;
  path: string;
  per_page: number;
  to: number;
}

interface Links {
  first: string;
  last?: any;
  prev?: any;
  next?: any;
}

interface Datum {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
