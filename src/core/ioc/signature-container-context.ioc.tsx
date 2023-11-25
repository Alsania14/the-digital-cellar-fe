import { Container, interfaces } from 'inversify';
import { createContext, ReactNode, useContext } from 'react';
import { DefaultException } from '../exceptions/default.exception';

const SignatureContainerContext = createContext<Container | null>(null);

type SignatureContainerContextProps = {
  container: Container;
  children: ReactNode;
};
export const SignatureContainerProvider = (props: SignatureContainerContextProps) => {
  const { children, container } = props;
  return (
    <SignatureContainerContext.Provider value={container}>
      {children}
    </SignatureContainerContext.Provider>
  );
};

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const container = useContext(SignatureContainerContext);
  if (!container) throw new DefaultException('Container has not been initiated');
  return container.get<T>(identifier);
}
