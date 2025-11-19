import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsOptional()
  joiningDate?: Date;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  country: string;
}
