import axios, { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import Router from 'next/router';
import { getItemLocalStorage } from './local-storage';
import { TokenEntity } from '@/src/shared/domain/entities/token.entity';
import appConstant from '@/src/constants/app-constant';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACK_END!;

export const client = axios.create({
  timeoutErrorMessage: 'Server take too long to respond',
  baseURL: BASE_URL,
});
const authInterceptor = (req: any) => {
  const accessToken = getItemLocalStorage<TokenEntity>(appConstant.ACCESS_TOKEN_KEY);
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken?.accessToken}`;
  }
  return req;
};

client.interceptors.request.use(authInterceptor);

client.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error.response && error.response?.status === 401) {
    const authorizationHeader = error.config?.headers.Authorization?.toString();

    notifications.show({
      id: 'unauthorized-notification',
      title: 'Warning',
      message: authorizationHeader
        ? 'Your session has run out.Please re -login'
        : 'Please login first ',
      color: 'yellow',
      autoClose: 5000,
    });

    Router.replace('/');

    return Promise.reject(error);
  }
  return Promise.reject(error);
});
