import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InputSignInDto } from './dtos/sign.dto';
import { Public } from './auth.decorator';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/sessions')
  signIn(@Body() props: InputSignInDto) {
    return this.authService.signIn(props);
  }
}
