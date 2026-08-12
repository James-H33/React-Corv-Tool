import { Dialog } from 'radix-ui';
import './NewCarDialog.scss';

interface NewCarDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: React.ReactNode;
  trigger?: React.ReactNode;
}

function NewCarDialog({
  isOpen,
  onClose,
  onOpen,
  trigger,
  children,
}: NewCarDialogProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        open ? onOpen() : onClose();
      }}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="ct-dialog-overlay" />
        <Dialog.Content className="ct-dialog-content">
          <div
            className="ct-dialog-close-button"
            onClick={onClose}
            role="button"
            tabIndex={0}
          >
            &times;
          </div>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default NewCarDialog;
