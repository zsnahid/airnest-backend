import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

export class UserSignupDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'id must be a number' })
  id: number;
  // Name field should not contain any numbers
  @IsString()
  @IsNotEmpty()
  @Matches(/^[^0-9]*$/, { message: 'Name should not contain numbers' })
  name: string;
  // Password must contain one of the special character (@ or # or $ or &)
  @IsString()
  @IsNotEmpty()
  @Matches(/[@#$&]/, {
    message:
      'Password must contain at least one special character (@, #, $, &)',
  })
  password: string;

  @IsUrl()
  githubLink: string;

  @Type(() => Date)
  @IsDate({ message: 'Date cannot be string' })
  createdAt: string;
}
