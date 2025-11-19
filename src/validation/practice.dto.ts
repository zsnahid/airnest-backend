import { Type } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class PracticeDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { message: 'id must be a number' })
  id: number;

  @IsString()
  @Matches(/^[@#$&]*$/, {
    message: 'Name should not contain special character',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(6)
  @Matches(/\.xyz$/, { message: 'Email must be from the .xyz domain' })
  email: string;

  @Matches(/[A-Z]/)
  pass: string;

  @IsIn(['Male', 'Female'], { message: 'Invalid Gender' })
  gender: string;
  image: string;

  @Matches(/^01[0-9]+$/)
  phoneNumber: number;
}
