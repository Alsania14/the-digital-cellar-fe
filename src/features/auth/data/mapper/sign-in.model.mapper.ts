import { TokenEntity } from '@/src/shared/domain/entities/token.entity';
import { SignInModel } from '../models/sign-in.model';

export class SignInModelMapper {
  static toDomain(signInModelDto: SignInModel): { token: TokenEntity } {
    return {
      token: {
        accessToken: signInModelDto.token,
      },
    };
  }
}
