import { validate } from 'class-validator';
import { PaginationRequestDto } from './pagination-request.dto';

describe('PaginationRequestDto', () => {
  it('should accept valid values', async () => {
    const dto = new PaginationRequestDto();
    dto.limit = 20;
    dto.page = 2;
    dto.order = 'desc';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should allow optional values without errors', async () => {
    const dto = new PaginationRequestDto();

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('PaginationRequestDto - Limit Validation', () => {
    it('should fail if limit is less than 1', async () => {
      const dto = new PaginationRequestDto();
      dto.limit = 0;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints?.min).toBeDefined();
    });

    it('should fail if limit is greater than 100', async () => {
      const dto = new PaginationRequestDto();
      dto.limit = 101;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints?.max).toBeDefined();
    });

    it('should fail if limit is a negative number', async () => {
      const dto = new PaginationRequestDto();
      dto.limit = -5;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints?.min).toBeDefined();
    });

    it('should fail if limit is a non-integer', async () => {
      const dto = new PaginationRequestDto();
      dto.limit = 3.5;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints?.isInt).toBeDefined();
    });

    it('should allow if limit is undefined', async () => {
      const dto = new PaginationRequestDto();
      dto.limit = undefined;

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should allow if limit is missing', async () => {
      const dto = new PaginationRequestDto();

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('PaginationRequestDto - Page Validation', () => {
    it('should fail if page is less than 1', async () => {
      const dto = new PaginationRequestDto();
      dto.page = 0;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints?.min).toBeDefined();
    });

    it('should fail if page is a negative number', async () => {
      const dto = new PaginationRequestDto();
      dto.page = -1;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints?.min).toBeDefined();
    });

    it('should fail if page is a non-integer', async () => {
      const dto = new PaginationRequestDto();
      dto.page = 1.5;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints?.isInt).toBeDefined();
    });

    it('should allow if page is undefined', async () => {
      const dto = new PaginationRequestDto();
      dto.page = undefined;

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should allow if page is missing', async () => {
      const dto = new PaginationRequestDto();

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('PaginationRequestDto - Order Validation', () => {
    it('should fail if order is not "asc" or "desc"', async () => {
      const dto = new PaginationRequestDto();
      dto.order = 'invalid' as unknown as 'asc' | 'desc';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints?.isIn).toBeDefined();
    });

    it('should fail if order is a number', async () => {
      const dto = new PaginationRequestDto();
      dto.order = 123 as unknown as 'asc' | 'desc';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints?.isString).toBeDefined();
    });

    it('should allow if order is undefined', async () => {
      const dto = new PaginationRequestDto();
      dto.order = undefined;

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should allow if order is null', async () => {
      const dto = new PaginationRequestDto();
      dto.order = null as unknown as 'asc' | 'desc';

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should allow if order is missing', async () => {
      const dto = new PaginationRequestDto();

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });
});
