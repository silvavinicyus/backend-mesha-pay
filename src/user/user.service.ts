import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputUpdateUserDto } from './dtos/update.dto';
import { IUserType, User } from './entities/user.entity';
import { IInputFindByUserDto } from './dtos/find.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findBy(props: IInputFindByUserDto): Promise<User | null> {
    const user = this.userRepository.findOneBy({ [props.column]: props.value });
    return user;
  }

  async create(
    props: Omit<User, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<User> {
    const user = await this.userRepository.save(props);
    return user;
  }

  async findAllDoctors(): Promise<User[]> {
    const doctors = await this.userRepository.find({
      where: { type: IUserType.DOCTOR },
    });

    return doctors;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async update(props: InputUpdateUserDto): Promise<void> {
    await this.userRepository.update({ id: props.id }, props.updateFields);
  }
}
