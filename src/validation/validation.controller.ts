import { Body, Controller, Get, Post } from '@nestjs/common';
import { ValidationService } from './validation.service';
import { UserSignupDto } from './userSignup.dto';

@Controller('validation')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Get('users')
  getUsers() {
    return this.validationService.getUsers();
  }

  @Post('users')
  addUser(@Body() userSignupDto: UserSignupDto) {
    return this.validationService.addUser(userSignupDto);
  }
}
