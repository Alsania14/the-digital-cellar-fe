import { Modal, ModalProps } from '@mantine/core';

export default function SignatureModal({ children, ...props }: ModalProps) {
  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 7,
      }}
      centered
      {...props}
    >
      {children}
    </Modal>
  );
}
