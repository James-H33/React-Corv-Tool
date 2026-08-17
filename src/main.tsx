import { ToastProvider } from '@common/services/toast.service';
import { store } from '@store/store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.scss';
import { router } from './routes';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </Provider>
);
