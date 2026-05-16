export interface OrganizerRequest {
  id: string;
  company_name: string;
  corporate_email: string;
  created_at: string;
  has_verification_file: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface OrganizerRequestsList {
  items: OrganizerRequest[];
  pagination: Pagination;
}
