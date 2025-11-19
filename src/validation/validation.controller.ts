import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ValidationService } from './validation.service';
import { UserSignupDto } from './userSignup.dto';

@Controller('validation')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Get('users')
  getUsers() {
    return this.validationService.getUsers();
  }

  @Get('users/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.validationService.getUser(id);
  }

  @Post('users')
  addUser(@Body() userSignupDto: UserSignupDto) {
    return this.validationService.addUser(userSignupDto);
  }

  @Put('users/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UserSignupDto,
  ) {
    return this.validationService.updateUser(id, userDto);
  }

  @Patch('users/:id/change-password')
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('password') newPass: string,
  ) {
    return this.validationService.changePassword(id, newPass);
  }

  @Delete('users/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.validationService.deleteUser(id);
  }

  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     fileFilter: (req, file, cb) => {
  //       if (file.originalname.match(/^.*\.(jpg|jpeg|png|webp)$/))
  //         cb(null, true);
  //       else {
  //         cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
  //       }
  //     },
  //     limits: { fileSize: 2 * 1024 * 1024 },
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         cb(null, file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // createPractice(
  //   @Body() practiceDto: PracticeDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   practiceDto.image = file.path;
  //   return this.validationService.createPractice(practiceDto);
  // }

  // @Post('upload-pdf')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     fileFilter: (req, file, cb) => {
  //       if (file.originalname.match(/^.*\.pdf$/)) cb(null, true);
  //       else cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
  //     },
  //     limits: { fileSize: 5 * 1024 * 1024 },
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         cb(null, file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // uploadPDF(@UploadedFile() file: Express.Multer.File) {
  //   return file;
  // }
}
