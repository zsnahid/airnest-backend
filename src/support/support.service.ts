import { Injectable } from "@nestjs/common";
import { ComplaintResponseDto } from "./complaintResponse.dto";

@Injectable()
export class SupportService {
  private readonly mockDbData = [
      {
        requestId: 'req_001',
        hostId: 'host_456',
        hostName: 'Alice Smith',
        status: 'PENDING',
        createdAt: new Date('2025-10-25T10:00:00Z'),
      },
      {
        requestId: 'req_002',
        hostId: 'host_789',
        hostName: 'Bob Johnson',
        status: 'PENDING',
        createdAt: new Date('2025-10-26T14:30:00Z'),
      },
    ];

    private readonly mockComplaints = [
    {
      messageId: 'msg_001',
      userId: 'user_123',
      userName: 'John Doe',
      subject: 'Problem with my booking',
      lastMessage: 'I cannot see my confirmed booking in my account.',
      status: 'OPEN',
      createdAt: new Date('2025-11-04T09:15:00Z'),
    },
    {
      messageId: 'msg_002',
      userId: 'user_456',
      userName: 'Jane Roe',
      subject: 'Payment issue',
      lastMessage: 'My payment was declined but the amount was deducted.',
      status: 'OPEN',
      createdAt: new Date('2025-11-05T11:00:00Z'),
    },
  ];

    getVerificationRequests() {
      return this.mockDbData
    }

    getComplaints() {
      return this.mockComplaints
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

    sendComplaintResponse(messageId: string, complaintResponseDto: ComplaintResponseDto): string{
      const complaint = this.mockComplaints.find(cmp => cmp.messageId === messageId);
      if (!complaint){
        return "Complaint response sent and marked as RESOLVED."
      }
      complaint.status = 'RESOLVED';
      return "Complaint response sent and marked as RESOLVED."
    }
}