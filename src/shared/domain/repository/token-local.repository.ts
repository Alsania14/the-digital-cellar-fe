import { TokenEntity } from '../entities/token.entity';

export interface TokenLocalRepository {
  get(): Promise<TokenEntity | undefined>;
  set(token: TokenEntity): Promise<void>;
  delete(): Promise<void>;
}
