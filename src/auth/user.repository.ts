import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { SignUpDto } from './dto/sign-up.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { email, phone, password } = signUpDto;

    const user = new User();
    user.email = email;
    user.phone = phone;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPasword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code === 23505) {
        throw new ConflictException('User email or phone alredy exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPasword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
