import { Controller, Get, Param, Patch } from "@nestjs/common";
import { SupportService } from "./support.service";

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get('verification-requests')
  getVerificationRequests() {
    return this.supportService.getVerificationRequests();
  }

  @Patch('verification-requests/approve/:requestId')
  approveVerificationRequest(@Param('requestId') requestId: string) {
    return this.supportService.approveVerificationRequest(requestId);
  }

  @Patch('verification-requests/reject/:requestId')
  rejectVerificationRequest(@Param('requestId') requestId: string) {
    return this.supportService.rejectVerificationRequest(requestId);
  }
}