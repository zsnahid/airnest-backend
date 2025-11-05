import { Injectable } from "@nestjs/common";

@Injectable()
export class SupportService {
  private readonly mockDbData = [
      {
        requestId: 'req_001',
        hostId: 'host_456',
        hostName: 'Alice Smith',
        status: 'PENDING',
        submittedAt: new Date('2025-10-25T10:00:00Z'),
      },
      {
        requestId: 'req_002',
        hostId: 'host_789',
        hostName: 'Bob Johnson',
        status: 'PENDING',
        submittedAt: new Date('2025-10-26T14:30:00Z'),
      },
    ];

    getVerificationRequests() {
      return this.mockDbData
    }
    
    approveVerificationRequest(requestId: string): string  {
      const request = this.mockDbData.find(req => req.requestId === requestId);
      if (request){
        request.status = 'VERIFIED';
        return "Verification request approved."
      }
      return "Verification request not found."
    }

    rejectVerificationRequest(requestId: string): string  {
      const request = this.mockDbData.find(req => req.requestId === requestId);
      if (request){
        request.status = 'REJECTED';
        return "Verification request rejected."
      }
      return "Verification request not found."
    }
}