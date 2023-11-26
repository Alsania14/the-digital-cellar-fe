import { client } from '@/src/core/lib/client';
import { remoteErrorHandler } from '@/src/core/utils/remote-error-handler.util';
import { UsersModel } from '../models/users.model';

export const get = async (): Promise<UsersModel> =>
  remoteErrorHandler(async () => {
    const { data } = await client.get<UsersModel>('/api/v1/users');
    return data;
  });
