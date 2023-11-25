import { TokenEntity } from '@/src/shared/domain/entities/token.entity';
import { SignInDto } from '../dto/sign-in.dto';

export interface AuthRemoteRepository {
  signIn(signInDto: SignInDto): Promise<TokenEntity>;
}
