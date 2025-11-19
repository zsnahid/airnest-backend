export class VerificationRequestDto {
  requestId: string;
  hostId: string;
  hostName: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  createdAt: Date;
}