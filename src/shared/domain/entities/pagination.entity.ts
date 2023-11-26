export interface PaginationEntity<T> {
  data: T[];
  links: Links;
  meta: Meta;
}

interface Meta {
  current_page: number;
  from: number;
  path: string;
  per_page: number;
  total: number;
  to: number;
}

interface Links {
  first: string;
  last?: any;
  prev?: any;
  next?: any;
}
