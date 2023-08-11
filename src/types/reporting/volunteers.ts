export interface VolunteersProps {
  data: VolunteersItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface VolunteersItem {
  num: number;
  id: number;
  volunteerName: string;
  email: string;
  dbsChecked: boolean;
  firstAider: boolean;
  date: string;
  contact: string;
}

export interface VolunteersFIlters {
  year: VolunteersEventFilters;
  groupBy: VolunteersGroupByFilter[];
}

export interface VolunteersEventFilters {
  [year: number]: VolunteersEvent[];
}

export interface VolunteersEvent {
  eventId: number;
  eventName: string;
}

export interface VolunteersGroupByFilter {
  id: number;
  name: string;
}
