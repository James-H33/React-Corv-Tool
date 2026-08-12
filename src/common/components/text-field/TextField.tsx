interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
}

function TextField({ value, ...props }: TextFieldProps) {
  return (
    <input
      className="ct-input"
      value={value}
      {...props}
    />
  );
}

export default TextField;
