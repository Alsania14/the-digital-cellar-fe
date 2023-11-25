import axios, { AxiosResponse } from 'axios';
import { DefaultException } from '../exceptions/default.exception';

export interface BackendValidationResponse extends AxiosResponse {
  error: Record<string, string[]>;
  data: any;
}

export const remoteErrorHandler = async <T>(
  remoteFunc: () => Promise<T>,
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: any) => void,
  onFinalCallback?: () => void
) => {
  try {
    const result = await remoteFunc();
    onSuccessCallback?.();
    return result;
  } catch (error) {
    onErrorCallback?.(error);
    if (axios.isAxiosError(error)) {
      const isString = typeof error.response?.data?.error === 'string';
      if (isString) {
        throw new DefaultException(
          error.response?.data?.error ?? error.response?.data?.message ?? undefined
        );
      } else {
        const data = error.response?.data as BackendValidationResponse;
        const objResponseError = data?.error;
        const values =
          Object.keys(objResponseError || {})?.map((key) => objResponseError[key]) ?? [];
        const commaJoinedValues = values?.join(',\n');
        if (commaJoinedValues) throw new DefaultException(commaJoinedValues ?? undefined);
        throw new DefaultException();
      }
    }
    throw new DefaultException();
  } finally {
    onFinalCallback?.();
  }
};
