export class customError extends Error {
  status?: number;
  message: string;
  error: string | null;
  constructor(message: string, status: number, error: string | null) {
    super(message);
    this.message = message;
    this.error = error || null;
    this.status = status;
  }
}
