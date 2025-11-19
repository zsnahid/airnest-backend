import { Injectable } from '@nestjs/common';
import { UserSignupDto } from './userSignup.dto';
import { PracticeDto } from './practice.dto';

@Injectable()
export class ValidationService {
  private readonly users: UserSignupDto[] = [];

  getUsers(): UserSignupDto[] {
    return this.users;
  }

  getUser(id): object {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return { message: 'User not found!' };
    }
    return user;
  }

  addUser(userSignupDto: UserSignupDto): object {
    this.users.push(userSignupDto);
    return userSignupDto;
  }

  deleteUser(id: number): object {
    const userIdx = this.users.findIndex((user) => user.id === id);
    if (userIdx === -1) {
      return { message: `User with id ${id} not found` };
    }
    this.users.splice(userIdx, 1);
    return { message: `User with id ${id} deleted` };
  }

  updateUser(id: number, userDto: UserSignupDto): object {
    let user = this.users.find((user) => user.id === id);
    if (!user) {
      return { message: `User with id ${id} not found` };
    }
    user = { ...userDto };
    return user;
  }

  changePassword(id: number, newPass: string): object {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return { message: `User with id ${id} not found` };
    }
    user.password = newPass;
    return user;
  }

  private readonly practices: PracticeDto[] = [];
  createPractice(practiceDto: PracticeDto): object {
    this.practices.push(practiceDto);
    return practiceDto;
  }
}
