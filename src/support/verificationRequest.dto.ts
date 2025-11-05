export class VerificationRequestDto {
  requestId: string;
  hostId: string;
  hostname: string;
  status: 'PENDING' | 'VERIFIED' | 'FAILED';
  submittedAt: Date;
}