import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { hash } from 'bcrypt';
import { Public } from 'src/auth/auth.decorator';
import { v4 as uuidV4 } from 'uuid';
import { CreateUserDto } from './dtos/create.dto';
import { IUserType } from './entities/user.entity';
import { UserService } from './user.service';
import { UserMapper } from 'src/utils/userMapper';

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

    return UserMapper.RemovePassword(userCreated);
  }

  @Get('/doctors')
  async getDoctors() {
    const doctors = await this.usersService.findAllDoctors();

    const mapped_doctors = doctors.map((doctor) =>
      UserMapper.RemovePassword(doctor),
    );

    return mapped_doctors;
  }

  @Public()
  @Post('/seeds')
  async createUserSeed() {
    const hashedPassword = await hash('admin', +process.env.BCRYPT_SALT);

    await this.usersService.create({
      email: 'doctor@doctor.com',
      password: hashedPassword,
      name: 'Doctor Mesha',
      type: IUserType.DOCTOR,
      uuid: uuidV4(),
    });
  }
}
