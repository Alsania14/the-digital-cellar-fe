import { client } from '@/src/core/lib/client';
import { remoteErrorHandler } from '@/src/core/utils/remote-error-handler.util';
import { UsersModel } from '../models/users.model';
import { UserRemoteDto } from '../dto/user-remote.dto';

export const get = async (): Promise<UsersModel> =>
  remoteErrorHandler(async () => {
    const { data } = await client.get<UsersModel>('/api/v1/users');
    return data;
  });

export const post = async (userRemoteDto: UserRemoteDto): Promise<void> =>
  remoteErrorHandler(async () => {
    await client.post<void>('/api/v1/users', userRemoteDto);
  });

export const patch = async (id: number, userRemoteDto: UserRemoteDto): Promise<void> =>
  remoteErrorHandler(async () => {
    await client.patch<void>(`/api/v1/users/${id}/user`, userRemoteDto);
  });

export const destroy = async (id: number): Promise<void> =>
  remoteErrorHandler(async () => {
    await client.delete<void>(`/api/v1/users/${id}/user`);
  });
