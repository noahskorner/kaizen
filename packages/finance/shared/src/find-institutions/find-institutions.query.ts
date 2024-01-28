export interface FindInstitutionsQuery {
  userId: string;
  /** List of `institutionIds` to filter. If not provided, all will be returned. */
  institutionIds?: string[];
}
