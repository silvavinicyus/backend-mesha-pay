import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { InputSignInDto, OutputSignInDto } from './dtos/sign.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(props: InputSignInDto): Promise<OutputSignInDto> {
    const user = await this.userService.findBy({
      column: 'email',
      value: props.email,
    });

    if (!user) {
      throw new UnauthorizedException({
        error: 'Email or password incorrect!',
      });
    }

    const isPasswordRight = await compare(props.password, user.password);

    if (!isPasswordRight) {
      throw new UnauthorizedException({
        error: 'Email or password incorrect!',
      });
    }

    const payload = { sub: user.id, email: user.email, type: user.type };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: {
        email: user.email,
        id: user.id,
        type: user.type,
        name: user.name,
      },
    };
  }
}
