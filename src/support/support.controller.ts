import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SupportService } from './support.service';
import { ComplaintResponseDto } from './complaintResponse.dto';
import { VerificationRequestDto } from './verificationRequest.dto';
import { UserDto } from './user.dto';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('users')
  createUser(@Body() userDto: UserDto) {
    return this.supportService.createUser(userDto);
  }

  @Patch('users/:id/update-country')
  updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body('country') newCountry: string,
  ) {
    return this.supportService.updateCountry(id, newCountry);
  }

  @Get('users/by-joining-date')
  findByJoiningDate(@Body('joiningDate') joiningDate: string) {
    return this.supportService.findByJoiningDate(joiningDate);
  }

  @Get('users/by-country')
  findByCountry(@Body('country') country: string) {
    return this.supportService.findByCountry(country);
  }

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

  @Post('create-verification-request/')
  createVerificationRequest(
    @Body() verificationRequestDto: VerificationRequestDto,
  ) {
    return this.supportService.createVerificationRequest(
      verificationRequestDto,
    );
  }

  @Post('complaints/:messageId/respond')
  sendComplaintResponse(
    @Param('messageId') messageId: string,
    @Body() complaintResponseDto: ComplaintResponseDto,
  ) {
    return this.supportService.sendComplaintResponse(
      messageId,
      complaintResponseDto,
    );
  }
}
