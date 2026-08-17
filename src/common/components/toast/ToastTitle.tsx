function ToastTitle({ type }: { type: 'success' | 'error' | 'info' }) {
  let title;

  if (type === 'success') {
    title = 'Success';
  } else if (type === 'error') {
    title = 'Error';
  } else {
    title = 'Info';
  }

  return <div className="ct-toast__title">{title}</div>;
}

export default ToastTitle;
