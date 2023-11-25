import { TokenEntity } from '@/src/shared/domain/entities/token.entity';
import { SignInDto } from '../dto/sign-in.dto';

export interface AuthUseCase {
  signIn(signInDto: SignInDto): Promise<TokenEntity>;
  signOut(): Promise<void>;
}
