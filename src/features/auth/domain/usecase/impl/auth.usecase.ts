import { inject, injectable } from 'inversify';
import { TokenEntity } from '@/src/shared/domain/entities/token.entity';
import { AuthUseCase } from '../auth.usecase';
import { CONTAINER_TYPES } from '@/src/core/ioc/signature-type.ioc';
import type { AuthRemoteRepository } from '../../repository/auth-remote.repository';
import { SignInDto } from '../../dto/sign-in.dto';
import type { TokenLocalRepository } from '@/src/shared/domain/repository/token-local.repository';

@injectable()
export class AuthUseCaseImpl implements AuthUseCase {
  @inject(CONTAINER_TYPES.AUTH_REMOTE_REPOSITORY)
  private readonly authRemoteRepository!: AuthRemoteRepository;
  @inject(CONTAINER_TYPES.TOKEN_LOCAL_REPOSITORY)
  private readonly tokenLocalRepository!: TokenLocalRepository;

  async signIn(signInDto: SignInDto): Promise<TokenEntity> {
    const token = await this.authRemoteRepository.signIn(signInDto);
    await this.tokenLocalRepository.set(token);
    return token;
  }

  async signOut(): Promise<void> {
    await Promise.allSettled([this.authRemoteRepository.signOut()]);
    await this.tokenLocalRepository.delete();
  }
}
