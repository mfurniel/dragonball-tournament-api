export interface UpdateTournamentDto {
  name?: string;
  creator?: string;
  location?: string;
  prize?: string | null;
  startDate?: Date;
}
