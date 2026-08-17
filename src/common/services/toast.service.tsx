import type { ToastControl } from '@common/types/toast-control.inteface';
import type { Toast } from '@common/types/toast.interface';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type Context = {
  activeToasts: ToastControl[];
  showToast: (toast: Toast) => void;
  dismiss: (id: number) => void;
  pauseDismissTimer: (id: number) => void;
  resumeDismissTimer: (id: number) => void;
};

const ToastContext = createContext<Context | null>(null);
const toastListeners = new Set<(toastOptions: Toast) => void>();

export const toastBridge = {
  subscribe(listener: (toastOptions: Toast) => void) {
    toastListeners.add(listener);
    return () => toastListeners.delete(listener);
  },
  showToast(toast: Toast) {
    toastListeners.forEach((listener) => listener(toast));
  },
};

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultDuration = 3000;
  const toasts = useRef<ToastControl[]>([]);
  const [activeToasts, setActiveToasts] = useState<ToastControl[]>([]);

  const dismiss = useCallback(
    (id: number): void => {
      setActiveToasts((prevActiveToasts) => {
        const toast = prevActiveToasts.find((t) => t.id === id);
        const remainingToasts = prevActiveToasts.filter((t) => t.id !== id);

        if (toast) {
          toast.dismiss();
        }

        if (toasts.current.length > 0) {
          const nextToast = toasts.current.shift()!;

          nextToast.start();

          return [...remainingToasts, nextToast];
        } else {
          return remainingToasts;
        }
      });
    },
    [toasts]
  );

  const createToastControl = useCallback((toast: Toast): ToastControl => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const id = Date.now();
    let remainingDurationWhenPaused = 0;

    const startTimeout = (duration?: number) => {
      timeoutId = setTimeout(
        () => {
          dismiss(id);
        },
        duration || toast.duration || defaultDuration
      );
    };

    const clearExistingTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    return {
      id,
      toast,
      start: startTimeout,
      dismiss: clearExistingTimeout,
      pause: () => {
        remainingDurationWhenPaused = timeoutId
          ? (toast?.duration || defaultDuration) - (Date.now() - id)
          : 0;

        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      },
      resume: () => {
        if (!timeoutId) {
          startTimeout(remainingDurationWhenPaused);
        }
      },
    };
  }, [dismiss, defaultDuration]);

  const showToast = useCallback((toast: Toast) => {
    const toastControl = createToastControl(toast!);
    toasts.current = [...toasts.current, toastControl];
    checkQueue();
  }, [createToastControl]);

  const checkQueue = useCallback((): void => {
    setActiveToasts((prevActiveToasts) => {
      const currentToasts = prevActiveToasts;
      const _toasts = [...toasts.current];

      console.log('Current Toasts:', currentToasts);
      console.log('Toasts:', toasts.current);

      if (currentToasts.length < 3) {
        const nextToast = _toasts.shift();

        if (nextToast) {
          nextToast.start();
          return [...currentToasts, nextToast];
        }
      }

      return currentToasts;
    });
  }, []);

  const pauseDismissTimer = useCallback((id: number): void => {}, []);
  const resumeDismissTimer = useCallback((id: number): void => {}, []);

  useEffect(() => {
    const unsubscribe = toastBridge.subscribe((externalToast: Toast) =>
      showToast(externalToast)
    );

    return () => {
      unsubscribe();
    };
  }, [showToast]);

  return (
    <ToastContext
      value={{
        activeToasts,
        showToast,
        dismiss,
        pauseDismissTimer,
        resumeDismissTimer,
      }}
    >
      {children}
    </ToastContext>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

export { ToastProvider, useToast };
