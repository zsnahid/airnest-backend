import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { SupportService } from "./support.service";
import { ComplaintResponseDto } from "./complaintResponse.dto";

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get('verification-requests')
  getVerificationRequests() {
    return this.supportService.getVerificationRequests();
  }

  @Get('complaints')
  getComplaints() {
    return this.supportService.getComplaints();
  }

  @Patch('verification-requests/approve/:requestId')
  approveVerificationRequest(@Param('requestId') requestId: string) {
    return this.supportService.approveVerificationRequest(requestId);
  }

  @Patch('verification-requests/reject/:requestId')
  rejectVerificationRequest(@Param('requestId') requestId: string) {
    return this.supportService.rejectVerificationRequest(requestId);
  }

  @Post('complaints/:messageId/respond')
  sendComplaintResponse(@Param('messageId') messageId: string, @Body() complaintResponseDto: ComplaintResponseDto,
  ){
    return this.supportService.sendComplaintResponse(messageId, complaintResponseDto);
  }
}