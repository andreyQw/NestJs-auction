import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { SignUpDto } from './dto/sign-up.dto';
import { SendMailService } from '../mailers/sendMail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private sendMailService: SendMailService,
  ){}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    await this.sendMailService.sendSignUpMail();

    return this.userRepository.signUp(signUpDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { email , password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ email });

    if (user && await user.validatePassword(password)) {
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
  
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
