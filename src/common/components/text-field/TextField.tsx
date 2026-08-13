import './TextField.scss';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function TextField({ className, value, ...props }: TextFieldProps) {
  const inputClassName = `ct-input ${className || ''}`.trim();

  return (
    <input
      className={inputClassName}
      value={value}
      {...props}
    />
  );
}

export default TextField;
