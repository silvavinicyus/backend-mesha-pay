import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { hash } from 'bcrypt';
import { Public } from 'src/auth/auth.decorator';
import { v4 as uuidV4 } from 'uuid';
import { CreateUserDto } from './dtos/create.dto';
import { IUserType } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Public()
  @Post('/clients')
  async createClient(@Body() createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findBy({
      column: 'email',
      value: createUserDto.email,
    });

    if (userExists) {
      throw new ConflictException({ error: 'Email already exists!' });
    }

    const hashedPassword = await hash(
      createUserDto.password,
      +process.env.BCRYPT_SALT,
    );

    const userCreated = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
      type: IUserType.CLIENT,
      uuid: uuidV4(),
    });

    return userCreated;
  }

  @Get('/doctors')
  async getDoctors() {
    const doctors = await this.usersService.findAllDoctors();

    return doctors;
  }
}
