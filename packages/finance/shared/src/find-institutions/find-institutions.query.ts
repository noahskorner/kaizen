export interface FindInstitutionsQuery {
  userId: string;
  /** List of institutions to find. If not provided, all will be returned. */
  institutionIds?: string[];
}
