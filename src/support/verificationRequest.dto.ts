export class VerificationRequestDto {
  requestId: string;
  hostId: string;
  hostname: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  submittedAt: Date;
}