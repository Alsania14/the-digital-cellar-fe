import { injectable } from 'inversify';
import { TokenLocalRepository } from '../../domain/repository/token-local.repository';
import { TokenEntity } from '../../domain/entities/token.entity';
import { getItemLocalStorage, saveItemLocalStorage } from '@/src/core/lib/local-storage';
import appConstant from '@/src/constants/app-constant';

@injectable()
export class TokenLocalRepositoryImpl implements TokenLocalRepository {
  async get(): Promise<TokenEntity | undefined> {
    const token = getItemLocalStorage<TokenEntity>(appConstant.ACCESS_TOKEN_KEY);
    return token;
  }
  async set(token: TokenEntity): Promise<void> {
    saveItemLocalStorage(appConstant.ACCESS_TOKEN_KEY, token);
  }
}
