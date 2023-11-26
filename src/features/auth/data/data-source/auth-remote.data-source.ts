import { remoteErrorHandler } from '@/src/core/utils/remote-error-handler.util';
import { SignInModel } from '../models/sign-in.model';
import { client } from '@/src/core/lib/client';
import { SignInDataDto } from '../dto/sign-in.data.dto';

export const postSignIn = async (signInDto: SignInDataDto): Promise<SignInModel> =>
  remoteErrorHandler(async () => {
    const { data } = await client.post<SignInModel>('/api/v1/auth/sign-in', signInDto);
    return data;
  });

export const postSignOut = async (): Promise<SignInModel> =>
  remoteErrorHandler(async () => {
    const { data } = await client.post<SignInModel>('/api/v1/auth/sign-out');
    return data;
  });
