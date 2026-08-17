import { useToast } from '@common/services/toast.service';
import ToastTitle from './ToastTitle';
import './Toast.scss';

function Toast() {
  const toast = useToast();
  const toasts = toast.activeToasts;

  console.log('Rendering Toast component. Active toasts:', toasts);

  const dismiss = (id: number): void => {
    toast.dismiss(id);
  };

  const pauseDismissTimer = (id: number): void => {
    toast.pauseDismissTimer(id);
  };

  const resumeDismissTimer = (id: number): void => {
    toast.resumeDismissTimer(id);
  };

  return (
    <div
      className="ct-toasts-container"
      style={
        {
          display: toasts.length > 0 ? 'flex' : 'none',
          '--ct-toast-count': toasts.length,
        } as React.CSSProperties
      }
    >
      {toasts.map(({ toast, id }) => (
        <div
          className={`ct-toast ${
            toast.type === 'success'
              ? 'ct-toast--success'
              : toast.type === 'error'
                ? 'ct-toast--error'
                : toast.type === 'info'
          }`}
          onMouseEnter={() => pauseDismissTimer(id)}
          onMouseLeave={() => resumeDismissTimer(id)}
          key={id}
        >
          <div className="ct-toast__title">
            <ToastTitle type={toast.type} />

            <div
              className="ct-toast__close"
              onClick={() => dismiss(id)}
              role="button"
              aria-label="Close"
              tabIndex={0}
            >
              &times;
            </div>
          </div>

          <div className="ct-toast__message">{toast.message}</div>
        </div>
      ))}
    </div>
  );
}

export default Toast;
