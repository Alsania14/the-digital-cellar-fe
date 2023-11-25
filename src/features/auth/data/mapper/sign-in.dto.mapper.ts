import { SignInDto } from '../../domain/dto/sign-in.dto';
import { SignInDataDto } from '../dto/sign-in.data.dto';

export class SignInDtoMapper {
  static toData(signInDto: SignInDto): SignInDataDto {
    return {
      email: signInDto.email,
      password: signInDto.password,
    } as SignInDataDto;
  }
}
