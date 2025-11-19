import { Injectable, NotFoundException } from '@nestjs/common';
import { ComplaintResponseDto } from './complaintResponse.dto';
import { VerificationRequestDto } from './verificationRequest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupportEntity } from './support.entity';
import { Between, Repository } from 'typeorm';
import { UserDto } from './user.dto';

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

  constructor(
    @InjectRepository(SupportEntity)
    private supportRepository: Repository<SupportEntity>,
  ) {}

  async createUser(userDto: UserDto): Promise<SupportEntity> {
    const newUser = this.supportRepository.create(userDto);
    return this.supportRepository.save(newUser);
  }

  async updateCountry(id: number, newCountry: string): Promise<SupportEntity> {
    const user = await this.supportRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found!`);
    }
    user.country = newCountry;
    return this.supportRepository.save(user);
  }

  async findByJoiningDate(date: string): Promise<SupportEntity[]> {
    // const searchDate = new Date(date);

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    return this.supportRepository.find({
      where: { joiningDate: Between(startDate, endDate) },
    });
  }

  async findByCountry(country: string): Promise<SupportEntity[]> {
    return this.supportRepository.find({ where: { country: country } });
  }

  getVerificationRequests() {
    return this.mockDbData;
  }

  getComplaints() {
    return this.mockComplaints;
  }

  createVerificationRequest(verificationRequestDto: VerificationRequestDto) {
    const newVerificationRequest = { ...verificationRequestDto };
    this.mockDbData.push(newVerificationRequest);
  }

  approveVerificationRequest(requestId: string): object {
    const request = this.mockDbData.find((req) => req.requestId === requestId);
    if (!request) {
      //request.status = 'VERIFIED';
      return { message: 'Request not found' };
    }
    request.status = 'VERIFIED';
    return { status: request.status };
  }

  rejectVerificationRequest(requestId: string): string {
    const request = this.mockDbData.find((req) => req.requestId === requestId);
    if (request) {
      request.status = 'REJECTED';
      return 'Verification request rejected.';
    }
    return 'Verification request not found.';
  }

  sendComplaintResponse(
    messageId: string,
    complaintResponseDto: ComplaintResponseDto,
  ): string {
    const complaint = this.mockComplaints.find(
      (cmp) => cmp.messageId === messageId,
    );
    if (!complaint) {
      return 'Complaint not found.';
    }
    complaint.status = 'RESOLVED';
    return 'Complaint response sent and marked as RESOLVED.';
  }
}
