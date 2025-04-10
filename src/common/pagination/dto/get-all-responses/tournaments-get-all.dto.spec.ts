import { TournamentsGetAllDto } from './tournaments-get-all.dto';
import { Tournament } from '@prisma/client';

describe('TournamentsGetAllDto', () => {
  it('should have a tournaments property', () => {
    const dto = new TournamentsGetAllDto();
    expect(dto).toHaveProperty('tournaments');
  });

  it('should have a totalCount property', () => {
    const dto = new TournamentsGetAllDto();
    expect(dto).toHaveProperty('totalCount');
  });

  it('should correctly assign values to properties', () => {
    const mockTournaments: Tournament[] = [
      {
        id: '1',
        name: 'Torneo A',
        creator: '',
        location: '',
        prize: null,
        startDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Torneo B',
        creator: '',
        location: '',
        prize: null,
        startDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ] as Tournament[];
    const mockTotalCount = 2;
    const dto = new TournamentsGetAllDto();
    dto.tournaments = mockTournaments;
    dto.totalCount = mockTotalCount;

    expect(dto.tournaments).toEqual(mockTournaments);
    expect(dto.totalCount).toBe(mockTotalCount);
  });

  it('should work with Tournament array for tournaments property', () => {
    const mockTournament: Tournament = {
      id: '3',
      name: 'Torneo C',
      creator: '',
      location: '',
      prize: null,
      startDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const dtoObject = new TournamentsGetAllDto();
    dtoObject.tournaments = [mockTournament];
    dtoObject.totalCount = 1;
    expect(dtoObject.tournaments).toBeInstanceOf(Array);
    expect(dtoObject.tournaments[0]).toEqual(mockTournament);
    expect(typeof dtoObject.totalCount).toBe('number');
  });
});
