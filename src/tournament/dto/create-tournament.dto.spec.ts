import { validate } from 'class-validator';
import { CreateTournamentDto } from './create-tournament.dto';

describe('CreateTournamentDto', () => {
  it('should pass validation for a valid tournament', async () => {
    const dto = new CreateTournamentDto();
    dto.name = 'Valid Tournament';
    dto.creator = 'John Doe';
    dto.location = 'New York';
    dto.prize = '1000';
    dto.startDate = new Date('2025-01-01');

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('CreateTournamentDto - Name Validation', () => {
    it('should fail validation for a missing name', async () => {
      const dto = new CreateTournamentDto();
      dto.creator = 'John Doe';
      dto.location = 'New York';
      dto.prize = '1000';
      dto.startDate = new Date('2025-01-01');

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('name');
    });

    it('should fail validation for an empty name', async () => {
      const dto = new CreateTournamentDto();
      dto.name = '';
      dto.creator = 'John Doe';
      dto.location = 'New York';
      dto.prize = '1000';
      dto.startDate = new Date('2025-01-01');

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((error) => error.property === 'name')).toBeTruthy();
    });

    it('should fail validation for a name exceeding max length', async () => {
      const dto = new CreateTournamentDto();
      dto.name = 'A very long tournament name that exceeds fifty characters';
      dto.creator = 'John Doe';
      dto.location = 'New York';
      dto.prize = '1000';
      dto.startDate = new Date('2025-01-01');

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('name');
    });
  });

  describe('CreateTournamentDto - Creator Validation', () => {
    it('should fail validation for a missing creator', async () => {
      const dto = new CreateTournamentDto();
      dto.name = 'Valid Tournament';
      dto.location = 'New York';
      dto.prize = '1000';
      dto.startDate = new Date('2025-01-01');

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((error) => error.property === 'creator')).toBeTruthy();
    });

    it('should fail validation for a creator name exceeding max length', async () => {
      const dto = new CreateTournamentDto();
      dto.name = 'Valid Tournament';
      dto.creator = 'A very long creator name that exceeds fifty characters';
      dto.location = 'New York';
      dto.prize = '1000';
      dto.startDate = new Date('2025-01-01');

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((error) => error.property === 'creator')).toBeTruthy();
    });
  });

  describe('CreateTournamentDto - Location Validation', () => {
    it('should fail validation for a missing location', async () => {
      const dto = new CreateTournamentDto();
      dto.name = 'Valid Tournament';
      dto.creator = 'John Doe';
      dto.prize = '1000';
      dto.startDate = new Date('2025-01-01');

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(
        errors.some((error) => error.property === 'location'),
      ).toBeTruthy();
    });

    it('should fail validation for a location exceeding max length', async () => {
      const dto = new CreateTournamentDto();
      dto.name = 'Valid Tournament';
      dto.creator = 'John Doe';
      dto.location =
        'A very long location name that exceeds the fifty characters limit';
      dto.prize = '1000';
      dto.startDate = new Date('2025-01-01');

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('location');
    });
  });

  describe('CreateTournamentDto - Prize Validation', () => {
    it('should fail validation when prize is missing', async () => {
      const dto = new CreateTournamentDto();
      dto.name = 'Valid Tournament';
      dto.creator = 'John Doe';
      dto.location = 'New York';
      dto.startDate = new Date('2025-01-01');

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((error) => error.property === 'prize')).toBeTruthy();
    });

    it('should allow an empty prize', async () => {
      const dto = new CreateTournamentDto();
      dto.name = 'Valid Tournament';
      dto.creator = 'John Doe';
      dto.location = 'New York';
      dto.prize = '';
      dto.startDate = new Date('2025-01-01');

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail validation for a prize exceeding max length', async () => {
      const dto = new CreateTournamentDto();
      dto.name = 'Valid Tournament';
      dto.creator = 'John Doe';
      dto.location = 'New York';
      dto.prize = 'A very long prize that exceeds the fifty characters limit';
      dto.startDate = new Date('2025-01-01');

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('prize');
    });
  });

  describe('CreateTournamentDto - StartDate Validation', () => {
    it('should fail validation for a missing startDate', async () => {
      const dto = new CreateTournamentDto();
      dto.name = 'Valid Tournament';
      dto.creator = 'John Doe';
      dto.location = 'New York';
      dto.prize = '1000';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(
        errors.some((error) => error.property === 'startDate'),
      ).toBeTruthy();
    });

    it('should fail validation for an invalid date', async () => {
      const dto = new CreateTournamentDto();
      dto.name = 'Valid Tournament';
      dto.creator = 'John Doe';
      dto.location = 'New York';
      dto.prize = '1000';
      dto.startDate = 'invalid-date' as unknown as Date;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(
        errors.some((error) => error.property === 'startDate'),
      ).toBeTruthy();
    });

    it('should fail validation for a non-date value', async () => {
      const dto = new CreateTournamentDto();
      dto.name = 'Valid Tournament';
      dto.creator = 'John Doe';
      dto.location = 'New York';
      dto.prize = '1000';
      dto.startDate = 2025 as unknown as Date;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(
        errors.some((error) => error.property === 'startDate'),
      ).toBeTruthy();
    });
  });
});
