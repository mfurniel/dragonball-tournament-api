export class BaseResponseDto<T> {
  data: T;
  meta?: {
    timestamp?: string;
  };
}
