import { Injectable } from '@nestjs/common';
import { UserSignupDto } from './userSignup.dto';

@Injectable()
export class ValidationService {
  private readonly users: UserSignupDto[] = [];

  getUsers(): UserSignupDto[] {
    return this.users;
  }

  addUser(userSignupDto: UserSignupDto): object {
    this.users.push(userSignupDto);
    return userSignupDto;
  }
}
