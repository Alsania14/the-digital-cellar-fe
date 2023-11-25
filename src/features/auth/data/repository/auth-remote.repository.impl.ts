import { injectable } from 'inversify';
import { TokenEntity } from '@/src/shared/domain/entities/token.entity';
import { AuthRemoteRepository } from '../../domain/repository/auth-remote.repository';
import { SignInDto } from '../../domain/dto/sign-in.dto';
import { SignInDtoMapper } from '../mapper/sign-in.dto.mapper';
import { postSignIn } from '../data-source/auth-remote.data-source';
import { SignInModelMapper } from '../mapper/sign-in.model.mapper';

@injectable()
export class AuthRemoteRepositoryImpl implements AuthRemoteRepository {
  async signIn(signInDto: SignInDto): Promise<TokenEntity> {
    const signInDataDto = SignInDtoMapper.toData(signInDto);
    const response = await postSignIn(signInDataDto);
    const { token } = SignInModelMapper.toDomain(response);
    return token;
  }
}
